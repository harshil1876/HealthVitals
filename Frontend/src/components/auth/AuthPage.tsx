import { SignIn, SignUp } from "@clerk/clerk-react";
import logo from "@/assets/Images/logo.png";

const AuthPage = ({ mode }) => (
  <div className="min-h-screen flex">
    {/* Left side: marketing/branding */}
    <div className="w-1/2 bg-gradient-to-br from-blue-600 to-green-400 flex flex-col justify-center items-center text-white p-12">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        <span className="text-2xl font-bold">HealthVitals-AI</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">Transform Your Wellness Journey</h1>
      <p className="mb-6 text-lg max-w-md text-white/90">
        Build healthier, goal-aligned routines through daily reflection, behavior tracking, and AI-powered insights with your personalized digital twin.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-lg">
        <li>Voice-first daily reflections</li>
        <li>AI-powered behavior analysis</li>
        <li>Personalized weekly insights</li>
      </ul>
      <div className="mt-auto text-xs text-white/70 pt-12">© 2024 HealthVitals-AI. All rights reserved.</div>
    </div>
    {/* Right side: Clerk Auth */}
    <div className="w-1/2 flex items-center justify-center bg-white">
      {mode === "sign-in" ? (
        <SignIn afterSignInUrl="/overview" />
      ) : (
        <SignUp afterSignUpUrl="/overview" />
      )}
    </div>
  </div>
);

export default AuthPage; 