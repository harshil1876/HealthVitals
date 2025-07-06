
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Send, Mic, MicOff, Calendar, Target, User, Bot, Zap, Apple } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LifestyleAssistant = ({ user, isVoiceEnabled, currentLanguage }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: `Hi ${user?.name}! I'm your Lifestyle & Wellness Assistant. I can help you with nutrition advice, exercise planning, sleep optimization, and building healthy habits. What would you like to work on today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
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
        setInputMessage("I want to improve my sleep schedule");
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
      const botResponse = generateLifestyleResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: botResponse.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (botResponse.recommendations) {
        setRecommendations(botResponse.recommendations);
      }
      
      setIsTyping(false);
    }, 2000);
  };

  const generateLifestyleResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("sleep") || lowerInput.includes("rest")) {
      return {
        message: "Great choice! Sleep is fundamental to your overall health. Let me provide you with personalized recommendations to optimize your sleep schedule and quality.",
        recommendations: {
          category: "Sleep Optimization",
          tips: [
            "Maintain a consistent sleep schedule - go to bed and wake up at the same time daily",
            "Create a relaxing bedtime routine 30-60 minutes before sleep",
            "Keep your bedroom cool (60-67°F), dark, and quiet",
            "Limit screen time 1 hour before bedtime",
            "Avoid caffeine after 2 PM"
          ],
          weeklyPlan: [
            { day: "Monday", activity: "Set consistent bedtime", duration: "8 hours" },
            { day: "Tuesday", activity: "Practice relaxation techniques", duration: "30 mins" },
            { day: "Wednesday", activity: "Optimize bedroom environment", duration: "ongoing" },
            { day: "Thursday", activity: "Digital detox before bed", duration: "1 hour" },
            { day: "Friday", activity: "Track sleep quality", duration: "ongoing" }
          ],
          goals: ["Achieve 7-9 hours of quality sleep", "Reduce time to fall asleep", "Wake up feeling refreshed"]
        }
      };
    } else if (lowerInput.includes("exercise") || lowerInput.includes("workout") || lowerInput.includes("fitness")) {
      return {
        message: "Excellent! Regular exercise is key to maintaining good health. I'll create a personalized fitness plan that fits your lifestyle and goals.",
        recommendations: {
          category: "Fitness & Exercise",
          tips: [
            "Start with 150 minutes of moderate exercise per week",
            "Include both cardio and strength training",
            "Find activities you enjoy to stay motivated",
            "Begin slowly and gradually increase intensity",
            "Listen to your body and rest when needed"
          ],
          weeklyPlan: [
            { day: "Monday", activity: "30-min brisk walk", duration: "30 mins" },
            { day: "Tuesday", activity: "Strength training (upper body)", duration: "45 mins" },
            { day: "Wednesday", activity: "Yoga or stretching", duration: "30 mins" },
            { day: "Thursday", activity: "Strength training (lower body)", duration: "45 mins" },
            { day: "Friday", activity: "Swimming or cycling", duration: "30 mins" }
          ],
          goals: ["Build cardiovascular endurance", "Increase muscle strength", "Improve flexibility"]
        }
      };
    } else {
      return {
        message: "I'm here to help with all aspects of your wellness journey! Please tell me more about what specific area you'd like to focus on - whether it's nutrition, exercise, sleep, stress management, or building healthy habits.",
        recommendations: null
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
        <Card className="h-[600px] flex flex-col bg-white/80 backdrop-blur-sm border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-gray-900">HealthVitals-AI</span>
                <p className="text-sm text-gray-600 font-normal">Lifestyle & Wellness Assistant</p>
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
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
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
            
            <div className="border-t border-green-100 p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about nutrition, exercise, sleep, or wellness..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-green-200 focus:border-green-400"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleVoiceRecord}
                  className={`border-green-200 hover:bg-green-50 ${isRecording ? 'bg-green-100 text-green-600' : ''}`}
                >
                  {isRecording ? <MicOff className="w-4 h-4 text-green-600" /> : <Mic className="w-4 h-4 text-green-600" />}
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Panel */}
      <div className="space-y-4">
        {recommendations ? (
          <Tabs defaultValue="tips" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/60">
              <TabsTrigger value="tips" className="text-xs">Tips</TabsTrigger>
              <TabsTrigger value="plan" className="text-xs">Plan</TabsTrigger>
              <TabsTrigger value="goals" className="text-xs">Goals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tips">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>{recommendations.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recommendations.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plan">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.weeklyPlan.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.day}</p>
                          <p className="text-sm text-gray-600">{item.activity}</p>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {item.duration}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="goals">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Your Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recommendations.goals.map((goal, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-green-100">
            <CardHeader>
              <CardTitle className="text-lg">Wellness Recommendations</CardTitle>
              <CardDescription>Get personalized lifestyle and wellness advice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Ask me about nutrition, exercise routines, sleep optimization, or building healthy habits!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-100">
          <CardHeader>
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Calendar className="w-3 h-3 mr-2" />
              Schedule Workout
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Apple className="w-3 h-3 mr-2" />
              Meal Planning
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifestyleAssistant;
