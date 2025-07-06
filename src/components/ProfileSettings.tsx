
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Heart, 
  Brain, 
  Calendar,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = ({ user }) => {
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    gender: user?.gender || "",
    height: user?.height || "",
    weight: user?.weight || "",
    bloodType: user?.bloodType || "",
    allergies: user?.allergies || "",
    medications: user?.medications || "",
    medicalHistory: user?.medicalHistory || "",
    emergencyContact: user?.emergencyContact || "",
    preferredLanguage: user?.preferredLanguage || "English",
    timezone: user?.timezone || "UTC"
  });

  const [notifications, setNotifications] = useState({
    healthReminders: true,
    weeklyReports: true,
    emergencyAlerts: true,
    analysisResults: true,
    goalProgress: true,
    medication: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    personalizedAds: false,
    voiceRecording: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleProfileUpdate = () => {
    // Simulate profile update
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Notification Settings Updated",
      description: `${key} notifications ${notifications[key] ? 'disabled' : 'enabled'}.`,
    });
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Privacy Settings Updated",
      description: `${key} setting ${privacy[key] ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please contact support to complete account deletion.",
      variant: "destructive",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be emailed to you within 24 hours.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </CardTitle>
          <CardDescription>Update your personal details and health information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={profile.gender} onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}>
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
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={profile.bloodType} onValueChange={(value) => setProfile(prev => ({ ...prev, bloodType: value }))}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              placeholder="List any allergies you have..."
              value={profile.allergies}
              onChange={(e) => setProfile(prev => ({ ...prev, allergies: e.target.value }))}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              placeholder="List your current medications..."
              value={profile.medications}
              onChange={(e) => setProfile(prev => ({ ...prev, medications: e.target.value }))}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea
              id="medicalHistory"
              placeholder="Brief medical history (chronic conditions, surgeries, etc.)..."
              value={profile.medicalHistory}
              onChange={(e) => setProfile(prev => ({ ...prev, medicalHistory: e.target.value }))}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              placeholder="Name and phone number"
              value={profile.emergencyContact}
              onChange={(e) => setProfile(prev => ({ ...prev, emergencyContact: e.target.value }))}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <Button onClick={handleProfileUpdate} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            Update Profile
          </Button>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>App Preferences</span>
          </CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={profile.preferredLanguage} onValueChange={(value) => setProfile(prev => ({ ...prev, preferredLanguage: value }))}>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={profile.timezone} onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                  <SelectItem value="CET">Central European Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white/80 backdrop-blur-sm border-yellow-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Health Reminders</p>
                <p className="text-sm text-gray-600">Daily health check-ins and reminders</p>
              </div>
              <Switch 
                checked={notifications.healthReminders}
                onCheckedChange={() => handleNotificationToggle('healthReminders')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-600">Weekly health analysis reports</p>
              </div>
              <Switch 
                checked={notifications.weeklyReports}
                onCheckedChange={() => handleNotificationToggle('weeklyReports')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Emergency Alerts</p>
                <p className="text-sm text-gray-600">Critical health alerts and warnings</p>
              </div>
              <Switch 
                checked={notifications.emergencyAlerts}
                onCheckedChange={() => handleNotificationToggle('emergencyAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analysis Results</p>
                <p className="text-sm text-gray-600">AI analysis completion notifications</p>
              </div>
              <Switch 
                checked={notifications.analysisResults}
                onCheckedChange={() => handleNotificationToggle('analysisResults')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Goal Progress</p>
                <p className="text-sm text-gray-600">Updates on your health goals</p>
              </div>
              <Switch 
                checked={notifications.goalProgress}
                onCheckedChange={() => handleNotificationToggle('goalProgress')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Medication Reminders</p>
                <p className="text-sm text-gray-600">Reminders for medication schedules</p>
              </div>
              <Switch 
                checked={notifications.medication}
                onCheckedChange={() => handleNotificationToggle('medication')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Privacy & Security</span>
          </CardTitle>
          <CardDescription>Control your data privacy and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-sm text-gray-600">Share anonymized data for research</p>
              </div>
              <Switch 
                checked={privacy.dataSharing}
                onCheckedChange={() => handlePrivacyToggle('dataSharing')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-gray-600">Allow usage analytics collection</p>
              </div>
              <Switch 
                checked={privacy.analytics}
                onCheckedChange={() => handlePrivacyToggle('analytics')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Personalized Recommendations</p>
                <p className="text-sm text-gray-600">Use data for personalized content</p>
              </div>
              <Switch 
                checked={privacy.personalizedAds}
                onCheckedChange={() => handlePrivacyToggle('personalizedAds')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Voice Recording</p>
                <p className="text-sm text-gray-600">Allow voice data collection</p>
              </div>
              <Switch 
                checked={privacy.voiceRecording}
                onCheckedChange={() => handlePrivacyToggle('voiceRecording')}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Change Password</h4>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Current password"
                    className="border-purple-200 focus:border-purple-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <Input
                  type="password"
                  placeholder="New password"
                  className="border-purple-200 focus:border-purple-400"
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className="border-purple-200 focus:border-purple-400"
                />
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-white/80 backdrop-blur-sm border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Data Management</span>
          </CardTitle>
          <CardDescription>Manage your health data and account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Export Your Data</h4>
              <p className="text-sm text-blue-700 mb-3">Download all your health data and conversation history</p>
              <Button onClick={handleExportData} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Export Data
              </Button>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
              <p className="text-sm text-red-700 mb-3">Permanently delete your account and all associated data</p>
              <Button onClick={handleDeleteAccount} variant="destructive" className="bg-red-600 hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Model Preferences */}
      <Card className="bg-white/80 backdrop-blur-sm border-indigo-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>AI Model Preferences</span>
          </CardTitle>
          <CardDescription>Customize AI behavior and interaction style</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>AI Personality Style</Label>
              <Select defaultValue="professional">
                <SelectTrigger className="border-indigo-200 focus:border-indigo-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional & Clinical</SelectItem>
                  <SelectItem value="friendly">Friendly & Supportive</SelectItem>
                  <SelectItem value="empathetic">Empathetic & Caring</SelectItem>
                  <SelectItem value="direct">Direct & Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Response Detail Level</Label>
              <Select defaultValue="detailed">
                <SelectTrigger className="border-indigo-200 focus:border-indigo-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brief">Brief & Summary</SelectItem>
                  <SelectItem value="detailed">Detailed & Comprehensive</SelectItem>
                  <SelectItem value="technical">Technical & Medical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>AI Learning Preference</Label>
              <Select defaultValue="adaptive">
                <SelectTrigger className="border-indigo-200 focus:border-indigo-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adaptive">Adaptive Learning</SelectItem>
                  <SelectItem value="consistent">Consistent Responses</SelectItem>
                  <SelectItem value="progressive">Progressive Complexity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
