import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  UserSearch, 
  Activity, 
  Shield, 
  FolderOpen, 
  Newspaper,
  AlertTriangle,
  FileText,
  Code,
  FileCheck,
  Settings as SettingsIcon,
  Bell,
  Search,
  User,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/acb187bf1666a83fcaec4c0c3b3f9953dd77af93.png";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Customer Screening", href: "/customer-screening", icon: UserSearch },
  { name: "Transaction Monitoring", href: "/transaction-monitoring", icon: Activity },
  { name: "Risk Scoring", href: "/risk-scoring", icon: Shield },
  { name: "Case Management", href: "/case-management", icon: FolderOpen },
  { name: "Adverse Media", href: "/adverse-media", icon: Newspaper },
  { name: "Watchlists", href: "/watchlists", icon: AlertTriangle },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Developer Portal", href: "/developer-portal", icon: Code },
  { name: "Audit Logs", href: "/audit-logs", icon: FileCheck },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
];

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 clean-sidebar z-50 transition-transform duration-300 custom-scrollbar overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="SmartCompliance AI" 
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
              />
              <div>
                <h1 className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-cyan-600">SmartCompliance</h1>
                <p className="text-xs text-cyan-600 font-medium">AI Platform</p>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="clean-header sticky top-0 z-30 bg-white">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Search */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers, transactions, cases..."
                    className="clean-input w-full pl-12 pr-4 py-3 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <button className="relative pill-button p-3 hover:bg-gray-50 transition-all">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>
              <button className="pill-button p-3 hover:bg-gray-50 transition-all">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
