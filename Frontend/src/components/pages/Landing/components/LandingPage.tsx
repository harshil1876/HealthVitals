
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, MessageCircle, Shield, Globe, Mic } from "lucide-react";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/Images/logo.png";

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/overview", { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              HealthVitals-AI
            </h1>
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg object-contain bg-white" />
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-blue-200 hover:bg-blue-50"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI-Powered
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Health Companion</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the future of healthcare with our multi-modal AI system featuring symptom analysis, 
            lifestyle coaching, and personalized wellness insights—all in one intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3">
              Start Your Health Journey
            </Button>
            </SignUpButton>
            <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50 text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Three AI Modalities, One Unified Experience
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900">HealthVitals-AI</CardTitle>
              <CardDescription>Intelligent Symptom Analyzer</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• AI-powered symptom analysis</li>
                <li>• Disease prediction & classification</li>
                <li>• Medical recommendations</li>
                <li>• Doctor connectivity</li>
                <li>• Likert-scale assessments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900">Lifestyle Assistant</CardTitle>
              <CardDescription>ChatGPT-Style Wellness Coach</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Personalized wellness coaching</li>
                <li>• Personality development (OCEAN)</li>
                <li>• Stress & mood tracking</li>
                <li>• Habit formation guidance</li>
                <li>• Mental health support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900">PersonaAI</CardTitle>
              <CardDescription>Adaptive Q&A Engine</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Smart Likert-scale surveys</li>
                <li>• Interactive feedback system</li>
                <li>• Self-reflective learning</li>
                <li>• Coaching mode engagement</li>
                <li>• Emotional intelligence mapping</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Features */}
      <section className="bg-white/40 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Unified Features Across All Modalities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/60 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mic className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Voice Assistant</h4>
                <p className="text-sm text-gray-600">Real-time speech recognition</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/60 border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Multilingual Support</h4>
                <p className="text-sm text-gray-600">Real-time translation</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/60 border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">HIPAA Compliant</h4>
                <p className="text-sm text-gray-600">End-to-end encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">HealthVitals-AI</span>
            </div>
            <p className="text-gray-400 text-center max-w-2xl">
              Empowering individuals with AI-driven health insights, personalized wellness coaching, 
              and intelligent symptom analysis for a healthier tomorrow.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <span>© 2024 HealthVitals-AI</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
