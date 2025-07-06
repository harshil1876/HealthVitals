
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, Mic, MicOff, FileText, AlertTriangle, User, Bot, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SymptomAnalyzer = ({ user, isVoiceEnabled, currentLanguage }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: `Hello ${user?.name}! I'm your AI Health Symptom Analyzer. I can help you understand your symptoms, provide medical insights, and recommend next steps. Please describe what you're experiencing.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice Recording Started",
        description: "Speak now to record your message",
      });
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        setInputMessage("I have a headache that started this morning");
        toast({
          title: "Voice Recording Complete",
          description: "Your message has been transcribed",
        });
      }, 3000);
    } else {
      toast({
        title: "Recording Stopped",
        description: "Voice recording has been cancelled",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const botResponse = generateSymptomResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: botResponse.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (botResponse.analysis) {
        setAnalysisResults(botResponse.analysis);
      }
      
      setIsTyping(false);
    }, 2000);
  };

  const generateSymptomResponse = (symptom) => {
    const lowerSymptom = symptom.toLowerCase();
    
    if (lowerSymptom.includes("headache") || lowerSymptom.includes("head")) {
      return {
        message: "I understand you're experiencing headaches. Based on your description, this could be related to several factors. Let me provide you with a comprehensive analysis.",
        analysis: {
          overview: "Headaches can range from tension headaches to migraines, and may be caused by various factors including stress, dehydration, or underlying conditions.",
          possibleCauses: [
            "Tension headache (most common)",
            "Migraine",
            "Dehydration",
            "Stress or anxiety",
            "Eye strain",
            "Sleep deprivation"
          ],
          recommendations: [
            "Stay hydrated - drink plenty of water",
            "Get adequate rest (7-9 hours of sleep)",
            "Manage stress through relaxation techniques",
            "Consider over-the-counter pain relief",
            "Apply cold or warm compress"
          ],
          riskLevel: "Low to Moderate",
          doctorRecommended: false
        }
      };
    } else if (lowerSymptom.includes("fever") || lowerSymptom.includes("temperature")) {
      return {
        message: "Fever can be a sign that your body is fighting an infection. Let me analyze this symptom for you.",
        analysis: {
          overview: "Fever is your body's natural response to infection and can indicate various conditions from mild viral infections to more serious bacterial infections.",
          possibleCauses: [
            "Viral infection (cold, flu)",
            "Bacterial infection",
            "Immune system response",
            "Heat exhaustion",
            "Medication side effects"
          ],
          recommendations: [
            "Rest and get plenty of sleep",
            "Stay hydrated with fluids",
            "Use fever-reducing medications if needed",
            "Monitor temperature regularly",
            "Seek medical attention if fever persists or rises above 103°F"
          ],
          riskLevel: "Moderate",
          doctorRecommended: true
        }
      };
    } else {
      return {
        message: "Thank you for sharing your symptoms. I'm analyzing the information you've provided. Could you please provide more specific details about when the symptoms started, their severity, and any other accompanying symptoms?",
        analysis: null
      };
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col bg-white/80 backdrop-blur-sm border-red-100">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-gray-900">HealthVitals-AI</span>
                <p className="text-sm text-gray-600 font-normal">Intelligent Symptom Analyzer</p>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {isVoiceEnabled ? "Voice Active" : "Text Mode"}
              </Badge>
              <Badge variant="outline">{currentLanguage}</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === "user"
                            ? "bg-blue-600"
                            : "bg-gradient-to-r from-red-500 to-pink-500"
                        }`}
                      >
                        {message.type === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="border-t border-red-100 p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Describe your symptoms..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-red-200 focus:border-red-400"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleVoiceRecord}
                  className={`border-red-200 hover:bg-red-50 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
                >
                  {isRecording ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4 text-red-600" />}
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Results */}
      <div className="space-y-4">
        {analysisResults ? (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/60">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="causes" className="text-xs">Causes</TabsTrigger>
              <TabsTrigger value="prevention" className="text-xs">Care</TabsTrigger>
              <TabsTrigger value="doctor" className="text-xs">Doctor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Analysis Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">{analysisResults.overview}</p>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Risk Level: {analysisResults.riskLevel}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="causes">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Possible Causes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.possibleCauses.map((cause, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prevention">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="doctor">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Medical Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResults.doctorRecommended ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 font-medium">
                          We recommend consulting with a healthcare professional for proper diagnosis and treatment.
                        </p>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Find Healthcare Providers
                      </Button>
                    </div>
                  ) : (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        Based on current symptoms, immediate medical attention may not be necessary. Monitor your condition and consult a doctor if symptoms worsen or persist.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-red-100">
            <CardHeader>
              <CardTitle className="text-lg">Symptom Analysis</CardTitle>
              <CardDescription>Share your symptoms to receive AI-powered insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Start describing your symptoms and I'll provide detailed analysis, possible causes, and recommendations.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-red-100">
          <CardHeader>
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <FileText className="w-3 h-3 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <ExternalLink className="w-3 h-3 mr-2" />
              Medical Resources
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomAnalyzer;
