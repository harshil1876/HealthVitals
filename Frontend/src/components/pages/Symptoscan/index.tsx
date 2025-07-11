"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Stethoscope,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import type { Symptom, AnalysisResult } from "../../../types/symptom-types";
import { bodyAreas } from "../../../data/symptom-data";

import SymptomSelector from "./components/symptom-selector";
import PersonalInfo from "./components/personal-info";
import AdditionalInfo from "./components/additional-info";
import AnalysisResultComponent from "./components/analysis-result/analysis-result";
import LoadingAnalysis from "./components/loading-analysis";
import ConfettiEffect from "./components/confetti-effect";
import API_BASE_URL from "../../../lib/config";

export default function SymptomScanEnhanced({
  isPro = false,
}: {
  isPro?: boolean;
}) {
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
  const [hasUsedQuickAnalysis, setHasUsedQuickAnalysis] = useState(false);
  const navigate = useNavigate();

  const { isSignedIn, getToken } = useAuth();

  // Additional information states
  const [exerciseFrequency, setExerciseFrequency] = useState<string>("moderate");
  const [sleepQuality, setSleepQuality] = useState<string>("fair");
  const [stressLevel, setStressLevel] = useState<string>("moderate");
  const [dietPreference, setDietPreference] = useState<string>("balanced");
  const [recentLifeChanges, setRecentLifeChanges] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [currentMedications, setCurrentMedications] = useState<string>("");

  useEffect(() => {
    if (!isPro && !isSignedIn) {
      const hasUsedBefore = localStorage.getItem("hasUsedSymptomScan") === "true";
      setHasUsedQuickAnalysis(hasUsedBefore);
    }
  }, [isPro, isSignedIn]);

  useEffect(() => {
    if (!isPro && !isSignedIn && hasUsedQuickAnalysis) {
      navigate("/symptoscan-pro");
    }
  }, [isPro, isSignedIn, hasUsedQuickAnalysis, navigate]);

  useEffect(() => {
    const progressMap: { [key: number]: number } = {
      1: 25,
      2: 50,
      3: 75,
      4: 100,
    };
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
      const isQuickAnalysis = !isPro || step !== 3;
      let requestBody: any = {};
      if (isQuickAnalysis) {
        const symptomString = selectedSymptoms.map((s) => s.name).join(", ");
        requestBody = { symptoms: symptomString, age };
      } else {
        requestBody = {
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
      }
      const endpoint = isQuickAnalysis
        ? `${API_BASE_URL}/api/quick-analyze`
        : `${API_BASE_URL}/api/analyze-symptoms`;
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
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
        throw new Error(
          `Error ${response.status}: ${errorText || response.statusText}`
        );
      }
      const data = await response.json();
      if (isQuickAnalysis && !isSignedIn) {
        localStorage.setItem("hasUsedSymptomScan", "true");
        setHasUsedQuickAnalysis(true);
      }
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
    <Card className="w-full max-w-xl mx-auto mt-16 shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-bold mb-2 text-center">Introducing SymptomScan</CardTitle>
        <CardDescription className="text-lg text-muted-foreground mb-4 text-center">
          Our core technology that analyzes your symptoms and provides accurate health insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-left mb-8">
          <h2 className="text-xl font-semibold mb-4">How SymptomScan Works</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted"><span role="img" aria-label="AI">🤖</span></span>
              <div>
                <span className="font-semibold">AI-Powered Analysis</span>
                <div className="text-muted-foreground text-sm">Our advanced AI analyzes your symptoms using the latest medical knowledge</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted"><span role="img" aria-label="Check">✔️</span></span>
              <div>
                <span className="font-semibold">Accurate Results</span>
                <div className="text-muted-foreground text-sm">Get reliable insights based on medical databases and AI learning</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted"><span role="img" aria-label="Healthcare">🩺</span></span>
              <div>
                <span className="font-semibold">Healthcare Guidance</span>
                <div className="text-muted-foreground text-sm">Receive recommendations on next steps and potential treatments</div>
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 transition font-medium"
          onClick={() => navigate("/symptoscan/analyze")}
        >
          Try SymptomScan
        </Button>
      </CardFooter>
    </Card>
  );
} 