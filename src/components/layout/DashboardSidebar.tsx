
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

const SidebarLink = ({ href, icon, children, isActive }: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-dye-secondary text-dye-dark"
          : "text-gray-600 hover:bg-dye-secondary/20 hover:text-dye-primary"
      )}
    >
      <span className={cn(isActive ? "text-dye-primary" : "text-gray-400")}>
        {icon}
      </span>
      {children}
    </Link>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 border-r bg-white/50 h-[calc(100vh-65px)] p-4">
      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold pl-4 mb-2">
          Optimization
        </h2>
        <SidebarLink
          href="/dashboard"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
              <rect width="7" height="9" x="3" y="3" rx="1"/>
              <rect width="7" height="5" x="14" y="3" rx="1"/>
              <rect width="7" height="9" x="14" y="12" rx="1"/>
              <rect width="7" height="5" x="3" y="16" rx="1"/>
            </svg>
          }
          isActive={isActive("/dashboard")}
        >
          Dashboard
        </SidebarLink>
        <SidebarLink
          href="/history"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M12 7v5l4 2"/>
            </svg>
          }
          isActive={isActive("/history")}
        >
          History
        </SidebarLink>
       
      </div>
    </aside>
  );
};

export default DashboardSidebar;
