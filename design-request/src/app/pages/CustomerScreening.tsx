import { Search, CheckCircle, XCircle, AlertTriangle, User, MapPin, Calendar, Shield, FileText, Sparkles } from "lucide-react";

const customerData = {
  name: "Michael Chen",
  email: "m.chen@globaltech.com",
  company: "Global Tech Solutions Ltd",
  country: "Singapore",
  joined: "March 5, 2024",
  riskScore: 7.8,
  status: "Under Review",
};

const verificationResults = [
  {
    category: "Identity Verification",
    status: "verified",
    details: "Document verified, Face match 98.5%",
    icon: User,
  },
  {
    category: "Sanctions Screening",
    status: "warning",
    details: "Potential match found - requires manual review",
    icon: AlertTriangle,
  },
  {
    category: "PEP Detection",
    status: "clear",
    details: "No politically exposed person matches",
    icon: CheckCircle,
  },
  {
    category: "Adverse Media",
    status: "warning",
    details: "2 relevant articles found",
    icon: FileText,
  },
];

const documents = [
  { name: "Passport", status: "Verified", date: "Mar 5, 2024" },
  { name: "Proof of Address", status: "Verified", date: "Mar 5, 2024" },
  { name: "Business License", status: "Pending", date: "Mar 7, 2024" },
];

export function CustomerScreening() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Screening</h1>
        <p className="text-gray-600">KYC verification and compliance screening results</p>
      </div>

      {/* Search Bar */}
      <div className="clean-card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name, email, or ID..."
            className="clean-input w-full pl-12 pr-4 py-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="clean-card p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                  MC
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{customerData.name}</h2>
                  <p className="text-gray-600">{customerData.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {customerData.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {customerData.joined}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">{customerData.riskScore}</div>
                <div className="text-sm text-gray-600">Risk Score</div>
                <span className="inline-block mt-2 status-badge status-high-risk">
                  {customerData.status}
                </span>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">AI Analysis</div>
                  <p className="text-sm text-gray-700">
                    Customer shows elevated risk due to high transaction velocity ($2.5M in 30 days) 
                    and potential sanctions list match. Manual review recommended before account approval.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Results */}
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Screening Results</h3>
            <div className="space-y-4">
              {verificationResults.map((result, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      result.status === 'verified' ? 'bg-green-100' :
                      result.status === 'warning' ? 'bg-orange-100' :
                      'bg-blue-100'
                    }`}>
                      <result.icon className={`w-5 h-5 ${
                        result.status === 'verified' ? 'text-green-600' :
                        result.status === 'warning' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{result.category}</h4>
                        {result.status === 'verified' && (
                          <span className="status-badge status-low-risk">Verified</span>
                        )}
                        {result.status === 'warning' && (
                          <span className="status-badge status-high-risk">Review Required</span>
                        )}
                        {result.status === 'clear' && (
                          <span className="status-badge status-low-risk">Clear</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{result.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="pill-button-primary px-6 py-3 flex-1">
              Approve Customer
            </button>
            <button className="pill-button px-6 py-3 flex-1 text-gray-700">
              Request More Info
            </button>
            <button className="pill-button px-6 py-3 flex-1 border-2 border-red-200 text-red-600 hover:bg-red-50">
              Reject
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Documents */}
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <div className="font-medium text-sm text-gray-900">{doc.name}</div>
                    <div className="text-xs text-gray-600">{doc.date}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">High Transaction Volume</span>
                <span className="text-sm font-semibold text-orange-600">8.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Sanctions Match</span>
                <span className="text-sm font-semibold text-red-600">9.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Geographic Risk</span>
                <span className="text-sm font-semibold text-yellow-600">6.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Business Type</span>
                <span className="text-sm font-semibold text-green-600">3.2</span>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Screening initiated</div>
                  <div className="text-xs text-gray-600">2 hours ago</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Identity verified</div>
                  <div className="text-xs text-gray-600">1 hour ago</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Sanctions match detected</div>
                  <div className="text-xs text-gray-600">30 mins ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}