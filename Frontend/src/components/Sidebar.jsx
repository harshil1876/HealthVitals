
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
    { id: "symptoscan", label: "Symptoscan", icon: Activity },
    { id: "symptom", label: "Symptoscan-Pro", icon: Activity },
    { id: "lifestyle", label: "Lifestyle", icon: Heart },
    { id: "persona", label: "PersonaAI", icon: Brain },
    { id: "history", label: "History", icon: FileText },
    { id: "insights", label: "Insights", icon: TrendingUp },
    { id: "goals", label: "Goals", icon: Target },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className={`bg-sidebar shadow-xl transition-all duration-300 rounded-tr-3xl rounded-br-3xl mt-4 ml-2 mb-4 flex flex-col border border-sidebar-border ${isCollapsed ? 'w-16' : 'w-64'} min-h-[calc(100vh-2rem)]`}> 
      {/* Sidebar Header */}
      {/* No toggle button here; toggle is in header */}
      {/* Navigation Items */}
      <nav className="flex-1 p-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === `/${item.id}`;
            return (
              <li key={item.id}>
                <Link
                  to={`/${item.id}`}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-semibold text-base tracking-tight group shadow-sm border border-transparent ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border-blue-500 shadow-md' 
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <IconComponent className={`w-6 h-6 transition-colors ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700'}`} />
                  {!isCollapsed && (
                    <span className={`transition-opacity duration-200 ${isActive ? 'text-blue-700' : 'text-gray-700 group-hover:text-blue-700'}`}>{item.label}</span>
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
