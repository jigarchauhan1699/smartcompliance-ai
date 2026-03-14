import { Search, Filter, Plus, Clock, CheckCircle, AlertCircle, Users, FileText, MessageSquare, Paperclip, TrendingUp } from "lucide-react";

const cases = [
  {
    id: "CASE-2024-0142",
    title: "Suspicious Transaction Pattern - Acme Corp",
    customer: "Acme Corp International",
    priority: "High",
    status: "In Progress",
    assignee: "Sarah Johnson",
    created: "Mar 12, 2024",
    updated: "2 hours ago",
    alerts: 5,
  },
  {
    id: "CASE-2024-0141",
    title: "Sanctions Match Investigation",
    customer: "Global Tech Solutions",
    priority: "Critical",
    status: "Escalated",
    assignee: "Michael Chen",
    created: "Mar 11, 2024",
    updated: "30 mins ago",
    alerts: 3,
  },
  {
    id: "CASE-2024-0140",
    title: "High-Value Transaction Review",
    customer: "FastPay Systems",
    priority: "Medium",
    status: "Pending Review",
    assignee: "Emily Davis",
    created: "Mar 10, 2024",
    updated: "5 hours ago",
    alerts: 2,
  },
  {
    id: "CASE-2024-0139",
    title: "PEP Verification Required",
    customer: "Digital Payments Inc",
    priority: "Medium",
    status: "In Progress",
    assignee: "David Martinez",
    created: "Mar 9, 2024",
    updated: "1 day ago",
    alerts: 1,
  },
];

const timeline = [
  {
    action: "Case created",
    user: "System",
    time: "Mar 12, 2024 09:30 AM",
    type: "system",
  },
  {
    action: "Assigned to Sarah Johnson",
    user: "Compliance Manager",
    time: "Mar 12, 2024 09:45 AM",
    type: "assignment",
  },
  {
    action: "Added transaction evidence",
    user: "Sarah Johnson",
    time: "Mar 12, 2024 10:15 AM",
    type: "evidence",
  },
  {
    action: "Comment added: 'Pattern matches structuring behavior'",
    user: "Sarah Johnson",
    time: "Mar 12, 2024 11:30 AM",
    type: "comment",
  },
  {
    action: "Requested additional documentation",
    user: "Sarah Johnson",
    time: "Mar 12, 2024 02:15 PM",
    type: "request",
  },
];

const linkedTransactions = [
  { id: "TXN-89234", amount: "$2,450,000", date: "Mar 11", risk: 8.5 },
  { id: "TXN-89210", amount: "$1,850,000", date: "Mar 11", risk: 7.8 },
  { id: "TXN-89187", amount: "$2,100,000", date: "Mar 10", risk: 8.2 },
];

export function CaseManagement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Management</h1>
          <p className="text-gray-600">Investigate and manage compliance cases</p>
        </div>
        <button className="pill-button-primary px-4 py-2 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Case
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clean-card p-5 hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-blue-50">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Active Cases</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">24</div>
          <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +3 this week
          </div>
        </div>
        <div className="clean-card p-5 hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-orange-50">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">High Priority</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">8</div>
          <div className="text-xs text-gray-500 mt-1">Requires attention</div>
        </div>
        <div className="clean-card p-5 hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-green-50">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Resolved (30d)</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">142</div>
          <div className="text-xs text-gray-500 mt-1">+12 from last month</div>
        </div>
        <div className="clean-card p-5 hover-lift bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
              <Users className="w-5 h-5 text-purple-700" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Avg Time (days)</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">3.5</div>
          <div className="text-xs text-gray-600 mt-1">15% improvement</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="clean-card p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cases by ID, customer, or description..."
              className="clean-input w-full pl-12 pr-4 py-3"
            />
          </div>
          <button className="pill-button px-6 py-3 flex items-center gap-2 text-gray-700 w-full md:w-auto">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-2 space-y-4">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="clean-card p-6 hover-lift transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{caseItem.title}</h3>
                    <span className={`status-badge ${
                      caseItem.priority === 'Critical' ? 'status-critical' :
                      caseItem.priority === 'High' ? 'status-high-risk' :
                      'status-medium-risk'
                    }`}>
                      {caseItem.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-mono text-blue-600">{caseItem.id}</span>
                    <span>•</span>
                    <span>{caseItem.customer}</span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  caseItem.status === 'Escalated' ? 'bg-red-100 text-red-700' :
                  caseItem.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {caseItem.status}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 rounded-lg bg-gray-50">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Assignee</div>
                  <div className="text-sm font-medium text-gray-900">{caseItem.assignee}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Created</div>
                  <div className="text-sm font-medium text-gray-900">{caseItem.created}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Last Update</div>
                  <div className="text-sm font-medium text-gray-900">{caseItem.updated}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Alerts</div>
                  <div className="text-sm font-medium text-gray-900">{caseItem.alerts} linked</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="pill-button px-4 py-2 text-sm text-gray-700">View Details</button>
                <button className="pill-button px-4 py-2 text-sm text-gray-700">Add Note</button>
                <button className="pill-button px-4 py-2 text-sm text-gray-700">Escalate</button>
              </div>
            </div>
          ))}
        </div>

        {/* Case Details Sidebar */}
        <div className="space-y-6">
          {/* Selected Case Details */}
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Details</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Case ID</div>
                <div className="font-mono text-blue-600 font-medium">CASE-2024-0142</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Risk Level</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="font-medium text-gray-900">8.5 / 10</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Alerts</div>
                <div className="font-medium text-gray-900">5 alerts</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Volume</div>
                <div className="font-medium text-gray-900">$6.4M</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    item.type === 'system' ? 'bg-blue-500' :
                    item.type === 'assignment' ? 'bg-purple-500' :
                    item.type === 'evidence' ? 'bg-green-500' :
                    item.type === 'comment' ? 'bg-yellow-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.action}</div>
                    <div className="text-xs text-gray-600">{item.user}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Transactions */}
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked Transactions</h3>
            <div className="space-y-2">
              {linkedTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-mono text-sm text-blue-600">{txn.id}</div>
                    <div className="text-xs text-gray-600">{txn.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm text-gray-900">{txn.amount}</div>
                    <div className="text-xs text-orange-600">Risk: {txn.risk}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="pill-button-primary w-full py-3 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Generate SAR Report
            </button>
            <button className="pill-button w-full py-3 flex items-center justify-center gap-2 text-gray-700">
              <CheckCircle className="w-4 h-4" />
              Close Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}