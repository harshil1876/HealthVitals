
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Activity, 
  Brain, 
  Heart, 
  BarChart3, 
  Target, 
  FileText, 
  Settings, 
  Menu,
  X,
  Home,
  TrendingUp
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "symptom", label: "HealthVitals", icon: Activity },
    { id: "lifestyle", label: "Lifestyle", icon: Heart },
    { id: "persona", label: "PersonaAI", icon: Brain },
    { id: "insights", label: "Insights", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "goals", label: "Goals", icon: Target },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Sidebar Header */}
      {/* No toggle button here; toggle is in header */}

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === `/${item.id}`;
            return (
              <li key={item.id}>
                <Link
                  to={`/${item.id}`}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  {!isCollapsed && (
                    <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
