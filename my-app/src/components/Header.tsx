import { SignInButton, SignedIn, SignedOut, UserButton, SignUpButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="p-4 flex justify-end space-x-2">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
            Sign up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  )
}
