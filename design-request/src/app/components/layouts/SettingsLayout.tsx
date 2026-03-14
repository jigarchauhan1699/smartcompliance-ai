import { User, Bell, Shield, Lock, Palette, Globe } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

export function SettingsLayout() {
  const location = useLocation();
  
  const navItems = [
    { icon: User, label: "Profile", path: "/settings" },
    { icon: Bell, label: "Notifications", path: "/settings/notifications" },
    { icon: Shield, label: "Security", path: "/settings/security" },
    { icon: Lock, label: "Privacy", path: "/settings/privacy" },
    { icon: Palette, label: "Appearance", path: "/settings/appearance" },
    { icon: Globe, label: "Integrations", path: "/settings/integrations" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="clean-card p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className={isActive ? "font-medium" : ""}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
