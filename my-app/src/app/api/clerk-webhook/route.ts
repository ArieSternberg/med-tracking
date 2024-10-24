import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

// Define the expected payload structure
interface UserPayload {
  id: string;
  email_addresses: { email_address: string, created_at: number, updated_at: number }[];
  first_name?: string;
  last_name?: string;
  phone_numbers?: { phone_number: string }[];
}

// Add this type guard function
function isUserEvent(event: WebhookEvent): event is WebhookEvent & { data: UserJSON } {
  return event.type.startsWith('user.');
}

export async function POST(req: Request) {
  console.log("inside webhook");
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  console.log("WEBHOOK_SECRET :: ", WEBHOOK_SECRET);
  
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  console.log("inside webhook :: get payload");
  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log("inside webhook :: get payload :: ", body);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  if (isUserEvent(evt)) {
    console.log('event data : ', evt.data);
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', body);

    try {
      switch (eventType) {
        case 'user.created':
        case 'user.updated':
          const { email_addresses, first_name, last_name, phone_numbers, created_at, updated_at } = evt.data;
          const email_address = email_addresses[0]?.email_address;
          const phone_number = phone_numbers?.[0]?.phone_number;
          console.log('email_address:', email_address);
          
          if (eventType === 'user.created') {
            await handleUserCreated(id, email_address, created_at || undefined, updated_at || undefined, first_name || undefined, last_name || undefined, phone_number || undefined);
          } else {
            await handleUserUpdated(id, email_address, created_at || undefined, updated_at || undefined, first_name || undefined, last_name || undefined, phone_number || undefined);
          }
          break;
        case 'user.deleted':
          await handleUserDeleted(id);
          break;
        default:
          console.log(`Unhandled user event: ${eventType}`);
      }
      
      return new Response('', { status: 200 });
    } catch (error) {
      console.error(`Error handling ${eventType}:`, error);
      return new Response('Error occurred', { status: 500 });
    }
  } else {
    console.log(`Received non-user event: ${evt.type}`);
    return new Response('', { status: 200 });
  }
}

async function handleUserCreated(id: string, email_address?: string, created_at?: number, updated_at?: number, first_name?: string, last_name?: string, phone_number?: string) {
  console.log('handleUserCreated :: email_address:', email_address);
  const { data, error } = await supabase
    .from('Users')
    .insert(
      { id, email_address, created_at, updated_at, first_name, last_name, phone_number },
    );

  if (error) {
    console.error('Error inserting new user into Users table:', error);
    throw error;
  }

  console.log('Inserted new user:', data);
}

async function handleUserUpdated(id: string, email_address: string, created_at?: number, updated_at?: number, first_name?: string, last_name?: string, phone_number?: string) {
  console.log('handleUserUpdated :: email_address:', email_address);
  const { data, error } = await supabase
    .from('Users')
    .update({ email_address, created_at, updated_at, first_name, last_name, phone_number })
    .eq('id', id);

  if (error) {
    console.error('Error updating user in Users table:', error);
    throw error;
  }

  console.log('Updated user:', data);
}

async function handleUserDeleted(id: string) {
  const { data, error } = await supabase
    .from('Users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user from Users table:', error);
    throw error;
  }

  console.log('Deleted user:', data);
}
