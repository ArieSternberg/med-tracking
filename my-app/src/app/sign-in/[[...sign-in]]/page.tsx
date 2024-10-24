import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm normal-case'
          }
        }}
      />
    </div>
  );
}