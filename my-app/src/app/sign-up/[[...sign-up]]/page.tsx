import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm normal-case'
          }
        }}
      />
    </div>
  );
}