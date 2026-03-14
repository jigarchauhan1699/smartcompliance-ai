import { Search, Filter, Download, TrendingUp, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const transactions = [
  {
    id: "TXN-2024-89234",
    customer: "Acme Corp International",
    amount: "$2,450,000",
    country: "Singapore",
    riskScore: 8.5,
    status: "Flagged",
    time: "2 mins ago",
  },
  {
    id: "TXN-2024-89233",
    customer: "Global Tech Solutions",
    amount: "$850,000",
    country: "United Kingdom",
    riskScore: 9.2,
    status: "Critical",
    time: "5 mins ago",
  },
  {
    id: "TXN-2024-89232",
    customer: "FastPay Systems",
    amount: "$125,000",
    country: "United States",
    riskScore: 4.5,
    status: "Normal",
    time: "12 mins ago",
  },
  {
    id: "TXN-2024-89231",
    customer: "Crypto Exchange Ltd",
    amount: "$3,200,000",
    country: "Switzerland",
    riskScore: 7.8,
    status: "Flagged",
    time: "18 mins ago",
  },
  {
    id: "TXN-2024-89230",
    customer: "Digital Payments Inc",
    amount: "$445,000",
    country: "Canada",
    riskScore: 3.2,
    status: "Normal",
    time: "25 mins ago",
  },
  {
    id: "TXN-2024-89229",
    customer: "FinanceHub Corporation",
    amount: "$1,890,000",
    country: "Germany",
    riskScore: 6.5,
    status: "Review",
    time: "32 mins ago",
  },
];

const volumeData = [
  { time: "00:00", volume: 1200000, flagged: 120 },
  { time: "04:00", volume: 800000, flagged: 80 },
  { time: "08:00", volume: 2500000, flagged: 250 },
  { time: "12:00", volume: 4200000, flagged: 420 },
  { time: "16:00", volume: 3500000, flagged: 350 },
  { time: "20:00", volume: 2000000, flagged: 200 },
];

const statusDistribution = [
  { name: "Normal", value: 8524, color: "#10b981" },
  { name: "Review", value: 1234, color: "#f59e0b" },
  { name: "Flagged", value: 456, color: "#ef4444" },
  { name: "Critical", value: 89, color: "#dc2626" },
];

const methodsData = [
  { method: "Wire Transfer", count: 4523, amount: 45230000 },
  { method: "ACH", count: 3421, amount: 12340000 },
  { method: "Card Payment", count: 2156, amount: 3450000 },
  { method: "Cryptocurrency", count: 876, amount: 15670000 },
  { method: "Check", count: 327, amount: 2340000 },
];

const alerts = [
  {
    title: "Unusual Transaction Velocity",
    description: "Acme Corp: 15 transactions in 2 hours",
    severity: "high",
    time: "5 mins ago",
  },
  {
    title: "High-Risk Geography",
    description: "Transaction from sanctioned region detected",
    severity: "critical",
    time: "12 mins ago",
  },
  {
    title: "Amount Threshold Exceeded",
    description: "Single transaction over $3M limit",
    severity: "medium",
    time: "28 mins ago",
  },
];

export function TransactionMonitoring() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Monitoring</h1>
          <p className="text-gray-600">Real-time transaction analysis and risk detection</p>
        </div>
        <button className="pill-button px-4 py-2 flex items-center gap-2 text-gray-700">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+8.5%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">10,303</div>
          <div className="text-gray-600 text-sm">Transactions Today</div>
          <div className="text-gray-500 text-xs mt-1">$79.2M total volume</div>
        </div>

        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-red-600">+12%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">545</div>
          <div className="text-gray-600 text-sm">Flagged Transactions</div>
          <div className="text-gray-500 text-xs mt-1">89 critical alerts</div>
        </div>

        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <Filter className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">Real-time</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">7.6</div>
          <div className="text-gray-600 text-sm">Avg Risk Score</div>
          <div className="text-gray-500 text-xs mt-1">↑ 0.4 from yesterday</div>
        </div>

        <div className="clean-card p-6 hover-lift bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100">
              <TrendingUp className="w-6 h-6 text-cyan-700" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">98.7%</div>
          <div className="text-gray-700 text-sm font-medium">Detection Rate</div>
          <div className="text-gray-600 text-xs mt-1">AI-powered monitoring</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="clean-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions by ID, customer, or amount..."
              className="clean-input w-full pl-12 pr-4 py-3"
            />
          </div>
          <button className="pill-button px-6 py-3 flex items-center gap-2 text-gray-700">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Volume */}
        <div className="clean-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transaction Volume & Flagged</h3>
            <select className="pill-button text-sm px-3 py-1.5 text-gray-700">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="flaggedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="volume" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#volumeGradient)" />
              <Area type="monotone" dataKey="flagged" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#flaggedGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution Donut */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
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
          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods Bar Chart */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Methods</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={methodsData} layout="vertical">
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.9}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis dataKey="method" type="category" stroke="#64748b" style={{ fontSize: '12px' }} width={120} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="count" fill="url(#barGradient)" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'critical' ? 'bg-red-100' :
                    alert.severity === 'high' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      alert.severity === 'critical' ? 'text-red-600' :
                      alert.severity === 'high' ? 'text-orange-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 mb-1">{alert.title}</div>
                    <div className="text-xs text-gray-600 mb-2">{alert.description}</div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Table */}
        <div className="clean-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Transaction Feed</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Risk</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-gray-700">{txn.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{txn.customer}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{txn.amount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          txn.riskScore >= 8 ? 'bg-red-500' :
                          txn.riskScore >= 6 ? 'bg-orange-500' :
                          txn.riskScore >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <span className="text-sm text-gray-700">{txn.riskScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`status-badge ${
                        txn.status === 'Critical' ? 'status-critical' :
                        txn.status === 'Flagged' ? 'status-high-risk' :
                        txn.status === 'Review' ? 'status-medium-risk' : 'status-low-risk'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{txn.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}