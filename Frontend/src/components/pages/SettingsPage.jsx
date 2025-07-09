
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Download,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Heart,
  Brain,
  Activity,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = ({ user }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    age: "28",
    height: "5'10\"",
    weight: "170 lbs",
    timezone: "Pacific Standard Time",
    language: "English"
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    goalReminders: true,
    healthInsights: true,
    socialUpdates: false,
    marketingEmails: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analyticsTracking: true,
    personalizedAds: false,
    profileVisibility: "private",
    healthDataSharing: false
  });

  // App settings
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    voiceAssistant: true,
    biometricAuth: false,
    autoBackup: true,
    highContrast: false,
    reducedMotion: false
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be ready for download within 24 hours.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please check your email for confirmation instructions.",
      variant: "destructive"
    });
  };

  const notificationTypes = [
    {
      key: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Receive notifications on your device',
      icon: Smartphone
    },
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: Mail
    },
    {
      key: 'smsNotifications',
      title: 'SMS Notifications',
      description: 'Receive notifications via text message',
      icon: Smartphone
    },
    {
      key: 'weeklyReports',
      title: 'Weekly Reports',
      description: 'Get weekly wellness summary reports',
      icon: Activity
    },
    {
      key: 'goalReminders',
      title: 'Goal Reminders',
      description: 'Reminders for your wellness goals',
      icon: Bell
    },
    {
      key: 'healthInsights',
      title: 'Health Insights',
      description: 'AI-powered health insights and tips',
      icon: Brain
    }
  ];

  const privacyOptions = [
    {
      key: 'dataSharing',
      title: 'Data Sharing',
      description: 'Share anonymized data for research',
      icon: Globe
    },
    {
      key: 'analyticsTracking',
      title: 'Analytics Tracking',
      description: 'Help improve our services with usage analytics',
      icon: Eye
    },
    {
      key: 'personalizedAds',
      title: 'Personalized Ads',
      description: 'Show relevant ads based on your interests',
      icon: Eye
    },
    {
      key: 'healthDataSharing',
      title: 'Health Data Sharing',
      description: 'Share health data with healthcare providers',
      icon: Heart
    }
  ];

  const appPreferences = [
    {
      key: 'darkMode',
      title: 'Dark Mode',
      description: 'Use dark theme for better viewing in low light',
      icon: Moon
    },
    {
      key: 'voiceAssistant',
      title: 'Voice Assistant',
      description: 'Enable voice commands and responses',
      icon: Bell
    },
    {
      key: 'biometricAuth',
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition to log in',
      icon: Lock
    },
    {
      key: 'autoBackup',
      title: 'Auto Backup',
      description: 'Automatically backup your data to the cloud',
      icon: Download
    },
    {
      key: 'highContrast',
      title: 'High Contrast',
      description: 'Improve readability with high contrast colors',
      icon: Palette
    },
    {
      key: 'reducedMotion',
      title: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-10">
      <div className="container mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">Settings</h1>
          <p className="text-lg text-gray-500 font-medium">Manage your profile, preferences, and privacy</p>
        </div>
        {/* Settings Tabs and Cards */}
        <Card className="hover:shadow-2xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Profile Settings</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={profileData.age}
                  onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  value={profileData.height}
                  onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={profileData.weight}
                  onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleSaveProfile} className="w-full md:w-auto">
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-2xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {notificationTypes.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div key={notification.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications[notification.key]}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, [notification.key]: checked})
                    }
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card className="hover:shadow-2xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Privacy & Security</CardTitle>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {privacyOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{option.title}</h4>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy[option.key]}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, [option.key]: checked})
                    }
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card className="hover:shadow-2xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">App Preferences</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {appPreferences.map((preference) => {
              const IconComponent = preference.icon;
              return (
                <div key={preference.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{preference.title}</h4>
                      <p className="text-sm text-gray-500">{preference.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={appSettings[preference.key]}
                    onCheckedChange={(checked) => 
                      setAppSettings({...appSettings, [preference.key]: checked})
                    }
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
