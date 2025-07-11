import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import SymptomSelector from "./components/symptom-selector";
import PersonalInfo from "./components/personal-info";
import AdditionalInfo from "./components/additional-info";
import AnalysisResultComponent from "./components/analysis-result/analysis-result";
import LoadingAnalysis from "./components/loading-analysis";
import ConfettiEffect from "./components/confetti-effect";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { bodyAreas } from "../../../data/symptom-data";
import type { Symptom, AnalysisResult } from "../../../types/symptom-types";
import API_BASE_URL from "../../../lib/config";
import React from "react";

export default function SymptomScanProCard() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [medicalHistoryText, setMedicalHistoryText] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [exerciseFrequency, setExerciseFrequency] = useState<string>("moderate");
  const [sleepQuality, setSleepQuality] = useState<string>("fair");
  const [stressLevel, setStressLevel] = useState<string>("moderate");
  const [dietPreference, setDietPreference] = useState<string>("balanced");
  const [recentLifeChanges, setRecentLifeChanges] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [currentMedications, setCurrentMedications] = useState<string>("");
  const { isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();

  // Progress bar logic
  const progressMap: { [key: number]: number } = { 1: 25, 2: 50, 3: 75, 4: 100 };

  // Update progress on step change
  React.useEffect(() => {
    setProgress(progressMap[step] || 0);
  }, [step]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom");
      setIsLoading(false);
      return;
    }
    if (!age) {
      alert("Please enter your age");
      setIsLoading(false);
      return;
    }
    try {
      // --- REAL BACKEND CALL ---
      let requestBody: any = {
        symptoms: selectedSymptoms,
        age,
        gender,
        height,
        weight,
        medicalHistory,
        medicalHistoryText,
        exerciseFrequency,
        sleepQuality,
        stressLevel,
        dietPreference,
        recentLifeChanges,
        allergies,
        currentMedications,
      };
      const endpoint = `${API_BASE_URL}/api/analyze-symptoms`;
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (isSignedIn) {
        try {
          const token = await getToken();
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
            window.sessionStorage.setItem("clerk-auth-token", token);
          } else {
            throw new Error("Authentication token not available");
          }
        } catch (error) {
          throw new Error("Failed to get authentication token");
        }
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
      }
      const data = await response.json();
      const enrichedResult = {
        ...data,
        age,
        gender,
        height,
        weight,
        medicalHistory,
        medicalHistoryText,
        exerciseFrequency,
        sleepQuality,
        stressLevel,
        dietPreference,
        recentLifeChanges,
        allergies,
        currentMedications,
      };
      setResult(enrichedResult);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setStep(4);
      // --- END REAL BACKEND CALL ---
    } catch (error: any) {
      alert(error.message || "An error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetDemo = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setAge("");
    setGender("");
    setMedicalHistory([]);
    setMedicalHistoryText("");
    setHeight("");
    setWeight("");
    setResult(null);
    setShowConfetti(false);
    setExerciseFrequency("moderate");
    setSleepQuality("fair");
    setStressLevel("moderate");
    setDietPreference("balanced");
    setRecentLifeChanges("");
    setAllergies("");
    setCurrentMedications("");
  };

  const handleNextStep = () => {
    if (step === 1 && selectedSymptoms.length === 0) {
      alert("Please select at least one symptom");
      return;
    }
    if (step === 2 && !age) {
      alert("Please enter your age");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/10 mt-8">
      <CardHeader className="bg-primary/5 border-b rounded-t-2xl pt-6">
        <CardTitle className="text-primary text-2xl">SymptomScan Pro</CardTitle>
        <CardDescription>
          Our comprehensive AI-powered health analysis tool. Get detailed insights and personalized recommendations. Fill every input for more accurate results.
        </CardDescription>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground mt-1">Progress Step {step} of 4</div>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-2 pb-6">
                <SymptomSelector
                  bodyAreas={bodyAreas}
                  selectedSymptoms={selectedSymptoms}
                  setSelectedSymptoms={setSelectedSymptoms}
                />
              </CardContent>
              <CardFooter className="border-t bg-muted/20 flex justify-end">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={selectedSymptoms.length === 0}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-2 pb-6">
                <PersonalInfo
                  age={age}
                  setAge={setAge}
                  gender={gender}
                  setGender={setGender}
                  medicalHistory={medicalHistory}
                  setMedicalHistory={setMedicalHistory}
                  medicalHistoryText={medicalHistoryText}
                  setMedicalHistoryText={setMedicalHistoryText}
                  height={height}
                  setHeight={setHeight}
                  weight={weight}
                  setWeight={setWeight}
                />
              </CardContent>
              <CardFooter className="border-t bg-muted/20 flex justify-between">
                <Button type="button" onClick={handlePrevStep} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="button" onClick={handleNextStep}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-2 pb-6">
                <AdditionalInfo
                  exerciseFrequency={exerciseFrequency}
                  setExerciseFrequency={setExerciseFrequency}
                  sleepQuality={sleepQuality}
                  setSleepQuality={setSleepQuality}
                  stressLevel={stressLevel}
                  setStressLevel={setStressLevel}
                  dietPreference={dietPreference}
                  setDietPreference={setDietPreference}
                  recentLifeChanges={recentLifeChanges}
                  setRecentLifeChanges={setRecentLifeChanges}
                  allergies={allergies}
                  setAllergies={setAllergies}
                  currentMedications={currentMedications}
                  setCurrentMedications={setCurrentMedications}
                />
              </CardContent>
              <CardFooter className="border-t bg-muted/20 flex justify-between">
                <Button type="button" onClick={handlePrevStep} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    "Analyze Symptoms"
                  )}
                </Button>
              </CardFooter>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-2 pb-6">
                <AnalysisResultComponent
                  result={result}
                  selectedSymptoms={selectedSymptoms}
                />
                <ConfettiEffect trigger={showConfetti} />
              </CardContent>
              <CardFooter className="border-t bg-muted/20 flex justify-between">
                <Button onClick={resetDemo}>Start New Analysis</Button>
              </CardFooter>
            </motion.div>
          )}
          {isLoading && <LoadingAnalysis />}
        </AnimatePresence>
      </form>
    </Card>
  );
} 