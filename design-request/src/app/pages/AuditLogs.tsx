import { Search, Filter, Download, User, FileText, Shield, Settings, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const auditLogs = [
  {
    id: "LOG-2024-89234",
    timestamp: "Mar 14, 2024 14:32:15",
    user: "sarah.johnson@company.com",
    action: "Case Created",
    resource: "CASE-2024-0142",
    details: "Created suspicious transaction case for Acme Corp",
    ip: "192.168.1.45",
    status: "Success",
    severity: "info",
  },
  {
    id: "LOG-2024-89233",
    timestamp: "Mar 14, 2024 14:28:42",
    user: "michael.chen@company.com",
    action: "Customer Screened",
    resource: "CUST-2024-5847",
    details: "Ran watchlist screening against OFAC, EU sanctions",
    ip: "192.168.1.67",
    status: "Success",
    severity: "info",
  },
  {
    id: "LOG-2024-89232",
    timestamp: "Mar 14, 2024 14:15:23",
    user: "admin@company.com",
    action: "Settings Modified",
    resource: "System Configuration",
    details: "Updated risk scoring thresholds",
    ip: "192.168.1.10",
    status: "Success",
    severity: "warning",
  },
  {
    id: "LOG-2024-89231",
    timestamp: "Mar 14, 2024 13:45:12",
    user: "api-key-prod",
    action: "API Call",
    resource: "/api/v1/screening/customer",
    details: "External API call - screening request",
    ip: "203.0.113.45",
    status: "Success",
    severity: "info",
  },
  {
    id: "LOG-2024-89230",
    timestamp: "Mar 14, 2024 13:22:08",
    user: "emily.davis@company.com",
    action: "Report Generated",
    resource: "SAR-2024-0042",
    details: "Generated SAR report for Global Tech Solutions",
    ip: "192.168.1.89",
    status: "Success",
    severity: "info",
  },
  {
    id: "LOG-2024-89229",
    timestamp: "Mar 14, 2024 12:58:34",
    user: "unknown@external.com",
    action: "Login Failed",
    resource: "Authentication System",
    details: "Failed login attempt - invalid credentials",
    ip: "198.51.100.23",
    status: "Failed",
    severity: "error",
  },
];

const activityTypeData = [
  { type: "Cases", count: 142, color: "#0ea5e9" },
  { type: "Screening", count: 234, color: "#8b5cf6" },
  { type: "Reports", count: 89, color: "#10b981" },
  { type: "Settings", count: 34, color: "#f59e0b" },
  { type: "API Calls", count: 567, color: "#ec4899" },
];

const activityTrend = [
  { hour: "08:00", count: 45 },
  { hour: "10:00", count: 78 },
  { hour: "12:00", count: 124 },
  { hour: "14:00", count: 156 },
  { hour: "16:00", count: 98 },
  { hour: "18:00", count: 56 },
];

const userActivity = [
  { user: "sarah.johnson", actions: 156 },
  { user: "michael.chen", actions: 142 },
  { user: "emily.davis", actions: 98 },
  { user: "david.martinez", actions: 87 },
  { user: "api-key-prod", actions: 234 },
];

export function AuditLogs() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Logs</h1>
          <p className="text-gray-600">Complete system activity trail and compliance logging</p>
        </div>
        <button className="pill-button px-4 py-2 flex items-center gap-2 text-gray-700">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+23%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12.4K</div>
          <div className="text-gray-600 text-sm">Events Today</div>
          <div className="text-gray-500 text-xs mt-1">89.2K this week</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">45</div>
          <div className="text-gray-600 text-sm">Active Users</div>
          <div className="text-gray-500 text-xs mt-1">Last 24 hours</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
          <div className="text-gray-600 text-sm">Security Events</div>
          <div className="text-gray-500 text-xs mt-1">Failed logins, etc.</div>
        </div>
        <div className="clean-card p-6 hover-lift bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100">
              <Shield className="w-6 h-6 text-cyan-700" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
          <div className="text-gray-700 text-sm font-medium">Uptime</div>
          <div className="text-gray-600 text-xs mt-1">Last 30 days</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Trend */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Trend (Today)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={activityTrend}>
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="count" stroke="url(#activityGradient)" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Type Distribution */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity by Type</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={activityTypeData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="count"
                label={({ type, count }) => `${type}: ${count}`}
              >
                {activityTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Users */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Users</h3>
        <div className="space-y-3">
          {userActivity.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {user.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.user}</div>
                  <div className="text-sm text-gray-600">{user.actions} actions</div>
                </div>
              </div>
              <div className="w-48">
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${(user.actions / 250) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="clean-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs by user, action, or resource..."
              className="clean-input w-full pl-12 pr-4 py-3"
            />
          </div>
          <button className="pill-button px-6 py-3 flex items-center gap-2 text-gray-700">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Resource</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-700 font-mono">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        log.severity === 'error' ? 'bg-red-500' :
                        log.severity === 'warning' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`} />
                      <span className="text-sm text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-700">{log.resource}</td>
                  <td className="py-3 px-4">
                    <span className={`status-badge ${
                      log.status === 'Success' ? 'status-low-risk' : 'status-high-risk'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="pill-button px-6 py-2 text-sm text-gray-700">
            Load More Logs
          </button>
        </div>
      </div>
    </div>
  );
}
