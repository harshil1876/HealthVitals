import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children, user, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header user={user} onLogout={onLogout} onMenuClick={() => setIsSidebarCollapsed((c) => !c)} />
      <div className="flex flex-1 bg-background">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10 bg-background min-h-[calc(100vh-64px)] rounded-tl-3xl shadow-inner">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 