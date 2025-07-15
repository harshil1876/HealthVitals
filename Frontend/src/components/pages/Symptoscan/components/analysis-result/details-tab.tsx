import { useState } from "react";
import { Badge } from "../../../../ui/badge";
import { Button } from "../../../../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../ui/accordion";
import type { AnalysisResult, Symptom } from "../../../../../types/symptom-types";
import {
  Pill,
  Stethoscope,
  Thermometer,
  ActivitySquare,
  Utensils,
  Dumbbell,
  Shield,
  FileSpreadsheet,
  ClipboardList,
  Leaf,
  FileDown,
} from "lucide-react";
import API_BASE_URL from "../../../../../lib/config";

interface DetailsTabProps {
  result: AnalysisResult;
  selectedSymptoms: Symptom[];
}

export default function DetailsTab({
  result,
}: // selectedSymptoms,
DetailsTabProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to get recommended actions specific to a condition
  const getConditionActions = (conditionName: string) => {
    if (
      result.conditionSpecificData &&
      result.conditionSpecificData[conditionName] &&
      result.conditionSpecificData[conditionName].recommendedActions
    ) {
      return result.conditionSpecificData[
        conditionName
      ].recommendedActions.slice(0, 3);
    }
    return result.followUpActions.slice(0, 3);
  };
  // Function to get preventive measures specific to a condition
  const getConditionPreventiveMeasures = (conditionName: string) => {
    if (
      result.conditionSpecificData &&
      result.conditionSpecificData[conditionName] &&
      result.conditionSpecificData[conditionName].preventiveMeasures
    ) {
      return result.conditionSpecificData[
        conditionName
      ].preventiveMeasures.slice(0, 3);
    }
    return result.preventiveMeasures.slice(0, 3);
  };
  // Display meal recommendations with diet note
  const displayMealRecommendations = () => {
    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-lg mb-2">Breakfast</h4>
          <ul className="list-disc pl-5 space-y-1">
            {result.mealRecommendations.breakfast
              .slice(0, 3)
              .map((meal, index) => (
                <li key={index} className="text-gray-700">
                  {meal}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-2">Lunch</h4>
          <ul className="list-disc pl-5 space-y-1">
            {result.mealRecommendations.lunch.slice(0, 3).map((meal, index) => (
              <li key={index} className="text-gray-700">
                {meal}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-2">Dinner</h4>
          <ul className="list-disc pl-5 space-y-1">
            {result.mealRecommendations.dinner
              .slice(0, 3)
              .map((meal, index) => (
                <li key={index} className="text-gray-700">
                  {meal}
                </li>
              ))}
          </ul>
        </div>
        {result.mealRecommendations.note && (
          <div className="mt-4 italic text-gray-600">
            {result.mealRecommendations.note}
          </div>
        )}
      </div>
    );
  };
  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/public/generate-details-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        }
      );
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/pdf")) {
        let errorMsg = "Failed to generate PDF";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "healthvitals-detailed-report.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF report. Please try again later.\n" + error.message);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {result.possibleConditions.slice(0, 3).map((condition, index) => (
          <Accordion
            key={index}
            type="single"
            collapsible
            className="border rounded-lg"
          >
            <AccordionItem value={`condition-${index}`} className="border-none">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  {condition.category === "respiratory" ? (
                    <Stethoscope className="h-4 w-4 text-primary" />
                  ) : condition.category === "digestive" ? (
                    <Pill className="h-4 w-4 text-primary" />
                  ) : (
                    <Thermometer className="h-4 w-4 text-primary" />
                  )}
                  <span>{condition.name}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {condition.probability}% Match
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {condition.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Related Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-3 border rounded-md">
                        <h5 className="text-xs font-semibold text-primary mb-2 flex items-center">
                          <ActivitySquare className="h-3 w-3 mr-1" />{" "}
                          Recommended Actions
                        </h5>
                        <ul className="space-y-1">
                          {getConditionActions(condition.name).map(
                            (action, i) => (
                              <li
                                key={i}
                                className="text-xs text-muted-foreground flex items-start gap-1"
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                                <span>{action}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h5 className="text-xs font-semibold text-primary mb-2 flex items-center">
                          <Shield className="h-3 w-3 mr-1" /> Preventive
                          Measures
                        </h5>
                        <ul className="space-y-1">
                          {getConditionPreventiveMeasures(condition.name).map(
                            (measure, i) => (
                              <li
                                key={i}
                                className="text-xs text-muted-foreground flex items-start gap-1"
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                                <span>{measure}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-3 flex items-center">
            <Utensils className="h-4 w-4 text-primary mr-2" />
            Diet Recommendations
          </h3>
          {result.mealRecommendations && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg mb-2">Breakfast</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.mealRecommendations.breakfast && result.mealRecommendations.breakfast.length > 0 ? (
                    result.mealRecommendations.breakfast.slice(0, 3).map((meal, index) => (
                      <li key={index} className="text-gray-700">{meal}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No recommendations available.</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2">Lunch</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.mealRecommendations.lunch && result.mealRecommendations.lunch.length > 0 ? (
                    result.mealRecommendations.lunch.slice(0, 3).map((meal, index) => (
                      <li key={index} className="text-gray-700">{meal}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No recommendations available.</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2">Dinner</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.mealRecommendations.dinner && result.mealRecommendations.dinner.length > 0 ? (
                    result.mealRecommendations.dinner.slice(0, 3).map((meal, index) => (
                      <li key={index} className="text-gray-700">{meal}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No recommendations available.</li>
                  )}
                </ul>
              </div>
              {result.mealRecommendations.note && (
                <div className="mt-4 italic text-gray-600">
                  {result.mealRecommendations.note}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-3 flex items-center">
            <Dumbbell className="h-4 w-4 text-primary mr-2" />
            Exercise Plan
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {result.exercisePlan && result.exercisePlan.length > 0 ? (
              result.exercisePlan.slice(0, 3).map((exercise, index) => (
                <li key={index} className="text-gray-700">{exercise}</li>
              ))
            ) : (
              <li className="text-gray-500 italic">No recommendations available.</li>
            )}
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-3 flex items-center">
            <Leaf className="h-4 w-4 text-primary mr-2" />
            Ayurvedic Recommendations
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {result.ayurvedicMedication?.recommendations && result.ayurvedicMedication.recommendations.length > 0 ? (
              result.ayurvedicMedication.recommendations.slice(0, 2).map((rec, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{rec.name}:</strong> {rec.description}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No recommendations available.</li>
            )}
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-3 flex items-center">
            <FileSpreadsheet className="h-4 w-4 text-primary mr-2" />
            Reports Required
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {result.reportsRequired && result.reportsRequired.length > 0 ? (
              result.reportsRequired.slice(0, 2).map((report, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{report.name}:</strong> {report.purpose}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No recommendations available.</li>
            )}
          </ul>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="mt-4"
          >
            {isDownloading ? (
              <FileDown className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <FileDown className="h-4 w-4 mr-2" />
            )}
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
} 