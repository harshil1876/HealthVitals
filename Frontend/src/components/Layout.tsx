import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children, user, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} onLogout={onLogout} onMenuClick={() => setIsSidebarCollapsed((c) => !c)} />
      <div className="flex flex-1">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className="flex-1 px-4 py-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 