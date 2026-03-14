import { Code, Key, BookOpen, Zap, CheckCircle, Copy, ExternalLink, Activity, TrendingUp, BarChart3 } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const apiEndpoints = [
  {
    method: "POST",
    path: "/api/v1/screening/customer",
    description: "Screen a customer against watchlists and sanctions",
    category: "Screening",
  },
  {
    method: "GET",
    path: "/api/v1/transaction/risk-score",
    description: "Calculate risk score for a transaction",
    category: "Risk Analysis",
  },
  {
    method: "POST",
    path: "/api/v1/case/create",
    description: "Create a new compliance case",
    category: "Case Management",
  },
  {
    method: "GET",
    path: "/api/v1/reports/generate",
    description: "Generate compliance reports",
    category: "Reporting",
  },
];

const apiKeys = [
  {
    name: "Production API Key",
    key: "sk_prod_*********************4f2a",
    created: "Jan 15, 2024",
    lastUsed: "2 hours ago",
    status: "Active",
  },
  {
    name: "Development API Key",
    key: "sk_dev_*********************8e3b",
    created: "Feb 1, 2024",
    lastUsed: "1 day ago",
    status: "Active",
  },
  {
    name: "Testing API Key",
    key: "sk_test_*********************9a1c",
    created: "Mar 1, 2024",
    lastUsed: "5 days ago",
    status: "Inactive",
  },
];

const usageData = [
  { date: "Mar 8", calls: 12450 },
  { date: "Mar 9", calls: 15230 },
  { date: "Mar 10", calls: 14890 },
  { date: "Mar 11", calls: 16340 },
  { date: "Mar 12", calls: 18920 },
  { date: "Mar 13", calls: 17560 },
  { date: "Mar 14", calls: 19230 },
];

const endpointUsage = [
  { endpoint: "Screening", calls: 45230, success: 44890 },
  { endpoint: "Risk Score", calls: 32140, success: 32050 },
  { endpoint: "Cases", calls: 12340, success: 12280 },
  { endpoint: "Reports", calls: 8920, success: 8905 },
];

export function DeveloperPortal() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Portal</h1>
        <p className="text-gray-600">API documentation, keys, and integration resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+15%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">19.2K</div>
          <div className="text-gray-600 text-sm">API Calls Today</div>
          <div className="text-gray-500 text-xs mt-1">124.5K this week</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-50">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">99.8%</div>
          <div className="text-gray-600 text-sm">Success Rate</div>
          <div className="text-gray-500 text-xs mt-1">Last 30 days</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">42ms</div>
          <div className="text-gray-600 text-sm">Avg Response</div>
          <div className="text-gray-500 text-xs mt-1">p95: 125ms</div>
        </div>
        <div className="clean-card p-6 hover-lift bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100">
              <Key className="w-6 h-6 text-cyan-700" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
          <div className="text-gray-700 text-sm font-medium">Active API Keys</div>
          <div className="text-gray-600 text-xs mt-1">2 production, 1 dev</div>
        </div>
      </div>

      {/* API Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Calls Over Time */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Calls (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="apiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="calls" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#apiGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Endpoint Usage */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint Performance</h3>
          <div className="space-y-4">
            {endpointUsage.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.endpoint}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600">{item.calls.toLocaleString()} calls</span>
                    <span className="text-xs font-medium text-green-600">
                      {((item.success / item.calls) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                    style={{ width: `${(item.success / item.calls) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="clean-card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start Guide</h3>
            <p className="text-gray-700 mb-4">
              Get started with our API in minutes. Follow our comprehensive documentation and code examples.
            </p>
            <div className="flex gap-3">
              <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                View Documentation
              </button>
              <button className="pill-button px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Code Examples
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Endpoints</h3>
        <div className="space-y-3">
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                    endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                    endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                </div>
                <button className="pill-button p-2 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-700 mb-2">{endpoint.description}</p>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                {endpoint.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="clean-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
          <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
            <Key className="w-4 h-4" />
            Generate New Key
          </button>
        </div>
        <div className="space-y-3">
          {apiKeys.map((key, index) => (
            <div key={index} className="p-5 rounded-xl bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{key.name}</h4>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      key.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {key.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-sm font-mono text-gray-600">{key.key}</code>
                    <button className="p-1 hover:bg-white rounded transition-colors">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div>
                  <span className="text-gray-500">Created:</span> {key.created}
                </div>
                <div>
                  <span className="text-gray-500">Last used:</span> {key.lastUsed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Request</h3>
        <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono">
            <code>{`curl -X POST https://api.smartcompliance.ai/v1/screening/customer \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_id": "CUST-2024-5847",
    "name": "John Doe",
    "country": "US",
    "watchlists": ["ofac", "eu_sanctions", "pep"]
  }'`}</code>
          </pre>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
          <div className="text-sm font-semibold text-green-900 mb-2">Response (200 OK)</div>
          <pre className="text-sm text-green-800 font-mono overflow-x-auto">
            <code>{`{
  "status": "success",
  "matches": [],
  "risk_score": 2.3,
  "screening_id": "SCR-2024-891234"
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
