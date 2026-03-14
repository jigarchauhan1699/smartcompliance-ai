import { Search, Plus, Shield, AlertTriangle, Globe, Users, Download, RefreshCw, TrendingUp } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const watchlists = [
  { name: "OFAC SDN List", type: "Sanctions", entries: 8542, lastUpdate: "2 hours ago", matches: 3 },
  { name: "EU Sanctions List", type: "Sanctions", entries: 2134, lastUpdate: "5 hours ago", matches: 1 },
  { name: "UN Consolidated List", type: "Sanctions", entries: 1876, lastUpdate: "1 day ago", matches: 2 },
  { name: "PEP Database", type: "PEP", entries: 45231, lastUpdate: "12 hours ago", matches: 7 },
  { name: "Interpol Red Notices", type: "Law Enforcement", entries: 7654, lastUpdate: "6 hours ago", matches: 0 },
  { name: "World Bank Debarred", type: "Debarment", entries: 892, lastUpdate: "3 days ago", matches: 1 },
];

const matches = [
  {
    id: "MATCH-2024-0089",
    entity: "Global Tech Solutions Ltd",
    watchlist: "OFAC SDN List",
    matchScore: 95,
    status: "Under Review",
    matchType: "Exact",
    date: "Mar 14, 2024",
    risk: "High",
  },
  {
    id: "MATCH-2024-0088",
    entity: "Michael Chen",
    watchlist: "PEP Database",
    matchScore: 87,
    status: "False Positive",
    matchType: "Partial",
    date: "Mar 13, 2024",
    risk: "Medium",
  },
  {
    id: "MATCH-2024-0087",
    entity: "Eastern Trading Co",
    watchlist: "UN Consolidated List",
    matchScore: 92,
    status: "Confirmed Match",
    matchType: "Exact",
    date: "Mar 12, 2024",
    risk: "Critical",
  },
];

const matchTypeData = [
  { type: "Exact Match", count: 12, color: "#ef4444" },
  { type: "Partial Match", count: 34, color: "#f59e0b" },
  { type: "False Positive", count: 156, color: "#10b981" },
];

const watchlistCoverage = [
  { category: "Sanctions", count: 12552 },
  { category: "PEP", count: 45231 },
  { category: "Law Enforcement", count: 7654 },
  { category: "Debarment", count: 892 },
  { category: "Adverse Media", count: 3421 },
];

export function Watchlists() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Watchlist Management</h1>
          <p className="text-gray-600">Monitor and screen against global sanctions and watchlists</p>
        </div>
        <div className="flex gap-3">
          <button className="pill-button px-4 py-2 flex items-center gap-2 text-gray-700">
            <RefreshCw className="w-4 h-4" />
            Sync All
          </button>
          <button className="pill-button-primary px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Watchlist
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+2 today</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">14</div>
          <div className="text-gray-600 text-sm">Active Matches</div>
          <div className="text-gray-500 text-xs mt-1">Requires screening</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
          <div className="text-gray-600 text-sm">Active Watchlists</div>
          <div className="text-gray-500 text-xs mt-1">Global coverage</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">69.8K</div>
          <div className="text-gray-600 text-sm">Total Entries</div>
          <div className="text-gray-500 text-xs mt-1">Across all lists</div>
        </div>
        <div className="clean-card p-6 hover-lift bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100">
              <TrendingUp className="w-6 h-6 text-cyan-700" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">99.2%</div>
          <div className="text-gray-700 text-sm font-medium">Accuracy Rate</div>
          <div className="text-gray-600 text-xs mt-1">AI-powered matching</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Match Type Distribution */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Type Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={matchTypeData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={3}
                dataKey="count"
                label={({ type, count }) => `${type.split(' ')[0]}: ${count}`}
              >
                {matchTypeData.map((entry, index) => (
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

        {/* Watchlist Coverage */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Watchlist Coverage</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={watchlistCoverage}>
              <defs>
                <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="count" fill="url(#coverageGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Watchlists */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Watchlists</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlists.map((list, index) => (
            <div key={index} className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{list.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {list.type}
                  </span>
                </div>
                {list.matches > 0 && (
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                    {list.matches} matches
                  </span>
                )}
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Entries:</span>
                  <span className="font-semibold text-gray-900">{list.entries.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Last update:</span>
                  <span>{list.lastUpdate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Matches */}
      <div className="clean-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Matches</h3>
          <button className="pill-button px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Match ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Entity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Watchlist</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-mono text-blue-600">{match.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{match.entity}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{match.watchlist}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            match.matchScore >= 90 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                            match.matchScore >= 70 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                            'bg-gradient-to-r from-yellow-500 to-green-500'
                          }`}
                          style={{ width: `${match.matchScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{match.matchScore}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      match.matchType === 'Exact' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {match.matchType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`status-badge ${
                      match.status === 'Confirmed Match' ? 'status-critical' :
                      match.status === 'Under Review' ? 'status-high-risk' :
                      'status-low-risk'
                    }`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{match.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
