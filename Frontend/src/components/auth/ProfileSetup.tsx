
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, User, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileSetup = ({ user, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    age: "",
    gender: "",
    location: "",
    medicalHistory: "",
    allergies: "",
    medications: "",
    emergencyContact: "",
    healthGoals: [],
    consentToTerms: false,
    consentToData: false
  });
  const { toast } = useToast();

  const healthGoalsOptions = [
    "Weight Management",
    "Stress Reduction",
    "Better Sleep",
    "Mental Health",
    "Chronic Disease Management",
    "Preventive Care",
    "Fitness Improvement",
    "Nutrition Optimization"
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal) => {
    setProfileData(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(goal)
        ? prev.healthGoals.filter(g => g !== goal)
        : [...prev.healthGoals, goal]
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (!profileData.consentToTerms || !profileData.consentToData) {
      toast({
        title: "Consent Required",
        description: "Please accept the terms and privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    onComplete(profileData);
    toast({
      title: "Profile Complete!",
      description: "Welcome to your personalized health journey.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-blue-100 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                HealthVitals-AI
              </h1>
            </div>
            <CardTitle className="text-2xl text-gray-900">Complete Your Profile</CardTitle>
            <CardDescription>
              Help us personalize your health experience (Step {currentStep} of 3)
            </CardDescription>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map(step => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
                  <User className="w-5 h-5" />
                  <span>Basic Information</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={profileData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Name and phone number"
                    value={profileData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
                  <Heart className="w-5 h-5" />
                  <span>Medical Information</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                    <Textarea
                      id="medicalHistory"
                      placeholder="Please list any chronic conditions, past surgeries, or significant medical events"
                      value={profileData.medicalHistory}
                      onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                      className="border-blue-200 focus:border-blue-400 min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies (Optional)</Label>
                    <Textarea
                      id="allergies"
                      placeholder="List any known allergies (medications, foods, environmental)"
                      value={profileData.allergies}
                      onChange={(e) => handleInputChange("allergies", e.target.value)}
                      className="border-blue-200 focus:border-blue-400 min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications (Optional)</Label>
                    <Textarea
                      id="medications"
                      placeholder="List any medications you're currently taking"
                      value={profileData.medications}
                      onChange={(e) => handleInputChange("medications", e.target.value)}
                      className="border-blue-200 focus:border-blue-400 min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
                  <Calendar className="w-5 h-5" />
                  <span>Health Goals & Consent</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">What are your primary health goals? (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      {healthGoalsOptions.map(goal => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal}
                            checked={profileData.healthGoals.includes(goal)}
                            onCheckedChange={() => handleGoalToggle(goal)}
                          />
                          <Label htmlFor={goal} className="text-sm">{goal}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consentTerms"
                        checked={profileData.consentToTerms}
                        onCheckedChange={(checked) => handleInputChange("consentToTerms", checked)}
                      />
                      <Label htmlFor="consentTerms" className="text-sm leading-relaxed">
                        I agree to the Terms of Service and understand that HealthVitals-AI provides health information for educational purposes only and should not replace professional medical advice.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consentData"
                        checked={profileData.consentToData}
                        onCheckedChange={(checked) => handleInputChange("consentToData", checked)}
                      />
                      <Label htmlFor="consentData" className="text-sm leading-relaxed">
                        I consent to the collection and processing of my health data as described in the Privacy Policy. All data is encrypted and HIPAA-compliant.
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack} className="border-blue-200 hover:bg-blue-50">
                  Previous
                </Button>
              )}
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
