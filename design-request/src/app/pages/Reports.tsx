import { FileText, Download, Send, Calendar, CheckCircle, Clock, AlertCircle, BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const reports = [
  {
    id: "SAR-2024-0042",
    type: "SAR Report",
    title: "Suspicious Activity Report - Acme Corp",
    customer: "Acme Corp International",
    status: "Submitted",
    created: "Mar 12, 2024",
    submitted: "Mar 13, 2024",
    priority: "High",
  },
  {
    id: "CTR-2024-0156",
    type: "CTR Report",
    title: "Currency Transaction Report - March Week 2",
    customer: "Multiple",
    status: "Pending Review",
    created: "Mar 11, 2024",
    submitted: null,
    priority: "Normal",
  },
  {
    id: "SAR-2024-0041",
    type: "SAR Report",
    title: "Suspicious Activity Report - Global Tech",
    customer: "Global Tech Solutions",
    status: "Draft",
    created: "Mar 10, 2024",
    submitted: null,
    priority: "Critical",
  },
  {
    id: "SAR-2024-0040",
    type: "SAR Report",
    title: "Suspicious Activity Report - FastPay Systems",
    customer: "FastPay Systems",
    status: "Submitted",
    created: "Mar 8, 2024",
    submitted: "Mar 9, 2024",
    priority: "Medium",
  },
];

const templates = [
  { name: "SAR Report Template", description: "Suspicious Activity Report", usage: 142 },
  { name: "CTR Report Template", description: "Currency Transaction Report", usage: 89 },
  { name: "Monthly Summary", description: "Compliance monthly overview", usage: 45 },
  { name: "Risk Assessment", description: "Customer risk assessment", usage: 67 },
];

const reportTypeData = [
  { type: "SAR", count: 45, color: "#ef4444" },
  { type: "CTR", count: 89, color: "#f59e0b" },
  { type: "Risk", count: 67, color: "#8b5cf6" },
  { type: "Monthly", count: 46, color: "#0ea5e9" },
];

const submissionTrend = [
  { month: "Sep", count: 18 },
  { month: "Oct", count: 24 },
  { month: "Nov", count: 29 },
  { month: "Dec", count: 31 },
  { month: "Jan", count: 28 },
  { month: "Feb", count: 33 },
  { month: "Mar", count: 34 },
];

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulatory Reports</h1>
          <p className="text-gray-600">Generate and submit compliance reports</p>
        </div>
        <button className="pill-button-primary px-4 py-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          New Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+12%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">247</div>
          <div className="text-gray-600 text-sm">Total Reports</div>
          <div className="text-gray-500 text-xs mt-1">All time</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-orange-600">Action needed</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
          <div className="text-gray-600 text-sm">Pending Review</div>
          <div className="text-gray-500 text-xs mt-1">Awaiting approval</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-50">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">This month</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">34</div>
          <div className="text-gray-600 text-sm">Submitted (30d)</div>
          <div className="text-gray-500 text-xs mt-1">+3 from last month</div>
        </div>
        <div className="clean-card p-6 hover-lift bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100">
              <TrendingUp className="w-6 h-6 text-cyan-700" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">98.5%</div>
          <div className="text-gray-700 text-sm font-medium">On-Time Rate</div>
          <div className="text-gray-600 text-xs mt-1">Submission compliance</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Type Distribution */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Type Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={reportTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="count"
                label={({ type, count }) => `${type}: ${count}`}
              >
                {reportTypeData.map((entry, index) => (
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

        {/* Submission Trend */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Trend (6 months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={submissionTrend}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="count" stroke="url(#trendGradient)" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Templates */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template, index) => (
            <div key={index} className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-white group-hover:bg-blue-50 transition-colors">
                  <FileText className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="text-xs text-gray-500">{template.usage} uses</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="clean-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          <button className="pill-button px-4 py-2 text-sm text-gray-700">View All</button>
        </div>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{report.title}</h4>
                    <span className={`status-badge ${
                      report.priority === 'Critical' ? 'status-critical' :
                      report.priority === 'High' ? 'status-high-risk' :
                      report.priority === 'Medium' ? 'status-medium-risk' :
                      'status-low-risk'
                    }`}>
                      {report.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-mono text-blue-600">{report.id}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.customer}</span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  report.status === 'Submitted' ? 'bg-green-100 text-green-700' :
                  report.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {report.status}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-6 text-sm text-gray-600">
                  <div>
                    <span className="text-gray-500">Created:</span> {report.created}
                  </div>
                  {report.submitted && (
                    <div>
                      <span className="text-gray-500">Submitted:</span> {report.submitted}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="pill-button px-3 py-1.5 text-sm text-gray-700">
                    <Download className="w-3 h-3" />
                  </button>
                  <button className="pill-button px-3 py-1.5 text-sm text-gray-700">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
