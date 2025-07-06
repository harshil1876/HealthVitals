
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, Mic, MicOff, Lightbulb, Star, User, Bot, Sparkles, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PersonaAI = ({ user, isVoiceEnabled, currentLanguage }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: `Hello ${user?.name}! I'm your PersonaAI - your intelligent health companion. I learn from our conversations to provide increasingly personalized insights and support. What's on your mind today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [personalizedInsights, setPersonalizedInsights] = useState(null);
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
        setInputMessage("I've been feeling stressed lately and need some personalized advice");
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
      const botResponse = generatePersonalizedResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: botResponse.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (botResponse.insights) {
        setPersonalizedInsights(botResponse.insights);
      }
      
      setIsTyping(false);
    }, 2500);
  };

  const generatePersonalizedResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("stress") || lowerInput.includes("anxious") || lowerInput.includes("worried")) {
      return {
        message: `I understand you're experiencing stress, ${user?.name}. Based on our previous conversations and your personal patterns, I've tailored some specific strategies that should work well for you. Let me share some personalized insights.`,
        insights: {
          category: "Personalized Stress Management",
          yourPattern: "Based on your conversation history, stress tends to peak during work transitions and improves with structured activities.",
          recommendations: [
            "Try the 4-7-8 breathing technique you mentioned worked before",
            "Schedule your preferred morning walks during stressful periods",
            "Use the meditation app you found helpful last month",
            "Implement the work-life boundary strategies we discussed"
          ],
          personalizedTips: [
            { insight: "Your stress levels drop 40% after physical activity", action: "Schedule 15-min walks" },
            { insight: "You respond well to structured routines", action: "Create a daily stress-check ritual" },
            { insight: "Social connection helps your mood significantly", action: "Plan regular friend check-ins" }
          ],
          aiObservations: [
            "You tend to be self-aware about your stress triggers",
            "Physical activity is consistently your most effective stress reliever",
            "You prefer practical solutions over abstract concepts"
          ]
        }
      };
    } else if (lowerInput.includes("health") || lowerInput.includes("wellness") || lowerInput.includes("feeling")) {
      return {
        message: `I've been learning about your health patterns, ${user?.name}. Your personalized health profile shows some interesting trends. Let me share what I've observed and some tailored recommendations.`,
        insights: {
          category: "Your Personal Health Journey",
          yourPattern: "Your health conversations show a focus on preventive care and gradual lifestyle improvements.",
          recommendations: [
            "Continue your consistent sleep schedule - it's showing great results",
            "Your nutrition awareness has improved 60% over our conversations",
            "The mindfulness practices you've adopted are clearly benefiting you",
            "Consider tracking the positive changes you've been making"
          ],
          personalizedTips: [
            { insight: "Your energy levels correlate strongly with sleep quality", action: "Maintain 10 PM bedtime" },
            { insight: "You're motivated by incremental progress", action: "Set smaller, weekly health goals" },
            { insight: "Social accountability works well for you", action: "Share goals with close friends" }
          ],
          aiObservations: [
            "You're highly motivated by understanding the 'why' behind recommendations",
            "Gradual changes work better for you than dramatic shifts",
            "You appreciate evidence-based health information"
          ]
        }
      };
    } else {
      return {
        message: `I'm continuously learning about you, ${user?.name}. Every conversation helps me understand your unique health journey better. What specific aspect of your wellbeing would you like to explore today?`,
        insights: null
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
        <Card className="h-[600px] flex flex-col bg-white/80 backdrop-blur-sm border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-gray-900">PersonaAI</span>
                <p className="text-sm text-gray-600 font-normal">Your Intelligent Health Companion</p>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {isVoiceEnabled ? "Voice Active" : "Text Mode"}
              </Badge>
              <Badge variant="outline">{currentLanguage}</Badge>
              <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700">
                Learning Mode
              </Badge>
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
                            : "bg-gradient-to-r from-purple-500 to-indigo-500"
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
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
            
            <div className="border-t border-purple-100 p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Share your thoughts and feelings..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-purple-200 focus:border-purple-400"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleVoiceRecord}
                  className={`border-purple-200 hover:bg-purple-50 ${isRecording ? 'bg-purple-100 text-purple-600' : ''}`}
                >
                  {isRecording ? <MicOff className="w-4 h-4 text-purple-600" /> : <Mic className="w-4 h-4 text-purple-600" />}
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Insights Panel */}
      <div className="space-y-4">
        {personalizedInsights ? (
          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/60">
              <TabsTrigger value="recommendations" className="text-xs">For You</TabsTrigger>
              <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
              <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>{personalizedInsights.category}</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {personalizedInsights.yourPattern}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {personalizedInsights.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Personal Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {personalizedInsights.personalizedTips.map((tip, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-900 mb-1">{tip.insight}</p>
                        <p className="text-xs text-purple-700">Recommendation: {tip.action}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patterns">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">AI Observations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {personalizedInsights.aiObservations.map((observation, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{observation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg">Personalized Intelligence</CardTitle>
              <CardDescription>AI that learns and adapts to your unique needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Share your thoughts, feelings, and experiences. I'll provide increasingly personalized insights as we talk more.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <CardTitle className="text-sm">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Conversations</span>
              <span className="text-xs font-medium">127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Insights Generated</span>
              <span className="text-xs font-medium">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Personalization Level</span>
              <Badge variant="outline" className="text-xs">Advanced</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonaAI;
