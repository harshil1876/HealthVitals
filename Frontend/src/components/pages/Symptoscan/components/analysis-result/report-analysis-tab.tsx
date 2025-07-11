import { useState } from "react";
import { Button } from "../../../../ui/button";
import {
  FileUp,
  Upload,
  Trash2,
  FileText,
  Image,
  FilePlus,
  Loader2,
  Search,
  HeartPulse,
  Utensils,
  Dumbbell,
  Shield,
  AlertTriangle,
  Check,
  X,
  Activity,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card";
import { Badge } from "../../../../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../../../../ui/alert";
import type { AnalysisResult, Symptom } from "../../../../../types/symptom-types";
import { Separator } from "../../../../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../ui/accordion";
import CircleProgress from "../circle-progress";
import API_BASE_URL from "../../../../../lib/config";

interface ReportAnalysisTabProps {
  result: AnalysisResult;
  selectedSymptoms: Symptom[];
}

export default function ReportAnalysisTab({
  result,
  selectedSymptoms,
}: ReportAnalysisTabProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [reportInsights, setReportInsights] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyzeReports = async () => {
    if (files.length === 0) {
      setErrorMessage("Please upload at least one report to analyze");
      return;
    }
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = files.filter((file) => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      setErrorMessage(
        `Some files exceed the 10MB limit: ${oversizedFiles
          .map((f) => f.name)
          .join(", ")}`
      );
      return;
    }
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(`reports`, file);
      });
      formData.append("analysisResult", JSON.stringify(result));
      formData.append("selectedSymptoms", JSON.stringify(selectedSymptoms));
      const response = await fetch(`${API_BASE_URL}/api/analyze-reports`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.error) {
          throw new Error(errorData.error);
        } else {
          throw new Error(
            `Server error (${response.status}): Failed to analyze reports`
          );
        }
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setReportInsights(data);
      setAnalysisComplete(true);
    } catch (error: unknown) {
      console.error("Error analyzing reports:", error);
      setErrorMessage(
        (error as Error).message ||
          "An error occurred while analyzing the reports. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getFileIcon = (file: File) => {
    const fileType = file.type.split("/")[0];
    if (fileType === "image") return <Image className="h-5 w-5 text-blue-500" />;
    if (file.type === "application/pdf")
      return <FileText className="h-5 w-5 text-red-500" />;
    return <FilePlus className="h-5 w-5 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Report Analysis</h3>
        <Badge className="bg-blue-100 text-blue-800">Enhanced Analysis</Badge>
      </div>
      {/* User Information Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Your Information Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Patient Profile */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Patient Profile</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span>{result.age || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span>{result.gender || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height:</span>
                  <span>{result.height || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span>{result.weight || "Not provided"}</span>
                </div>
              </div>
            </div>
            {/* Lifestyle Factors */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Lifestyle Factors</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exercise:</span>
                  <span>{result.exerciseFrequency || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sleep Quality:</span>
                  <span>{result.sleepQuality || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stress Level:</span>
                  <span>{result.stressLevel || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Diet Preference:</span>
                  <span>{result.dietPreference || "Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          {/* Reported Symptoms */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Reported Symptoms</h4>
            <div className="space-y-2">
              {selectedSymptoms.map((symptom, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{symptom.name}</span>
                  <Badge variant="outline">
                    Severity: {symptom.severity}/10 • Duration: {symptom.duration}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-4" />
          {/* Medical History */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Medical History</h4>
            {result.medicalHistory && result.medicalHistory.length > 0 ? (
              <ul className="space-y-1">
                {result.medicalHistory.map((condition, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">{condition}</span>
                  </li>
                ))}
              </ul>
            ) : result.medicalHistoryText ? (
              <p className="text-sm text-muted-foreground">
                {result.medicalHistoryText}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No medical history reported
              </p>
            )}
          </div>
          {result.recentLifeChanges && (
            <>
              <Separator className="my-4" />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Life Changes</h4>
                <p className="text-sm text-muted-foreground">
                  {result.recentLifeChanges}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {/* File Upload Section */}
      <div className="space-y-4">
        <h4 className="font-medium">Upload Medical Reports</h4>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 cursor-pointer border rounded-md px-4 py-2 bg-muted hover:bg-muted/80 transition">
            <FileUp className="h-5 w-5 text-primary" />
            <span>Upload Files</span>
            <input
              type="file"
              accept=".pdf,image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {files.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setFiles([])}
              className="ml-2"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear All
            </Button>
          )}
        </div>
        {files.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Selected Files</h5>
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  {getFileIcon(file)}
                  <span className="text-sm">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button
          onClick={handleAnalyzeReports}
          disabled={isAnalyzing || files.length === 0}
          className="mt-2"
        >
          {isAnalyzing ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Analyze Reports
        </Button>
        {errorMessage && (
          <Alert variant="destructive" className="mt-2">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </div>
      {/* Analysis Results */}
      {analysisComplete && reportInsights && (
        <div className="space-y-6">
          <h4 className="font-medium">Report Analysis Insights</h4>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-primary" />
                  <span className="font-medium">Health Score:</span>
                  <span>{reportInsights.healthScore ?? "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  <span className="font-medium">Diet Recommendations:</span>
                  <span>{reportInsights.dietRecommendations ?? "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  <span className="font-medium">Exercise Plan:</span>
                  <span>{reportInsights.exercisePlan ?? "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-medium">Preventive Measures:</span>
                  <span>{reportInsights.preventiveMeasures ?? "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Accordion type="single" collapsible className="border rounded-lg mt-4">
            <AccordionItem value="details" className="border-none">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span>Detailed Insights</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span className="font-medium">Ayurvedic Recommendations:</span>
                    <span>{reportInsights.ayurvedicRecommendations ?? "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Reports Required:</span>
                    <span>{reportInsights.reportsRequired ?? "N/A"}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
} 