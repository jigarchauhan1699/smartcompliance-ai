import { Shield, TrendingUp, AlertTriangle, Activity, Target, Sparkles } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";

const riskFactors = [
  { factor: "Transaction Velocity", value: 85 },
  { factor: "Geographic Risk", value: 72 },
  { factor: "Industry Type", value: 45 },
  { factor: "Transaction Patterns", value: 90 },
  { factor: "Customer Profile", value: 60 },
  { factor: "Historical Behavior", value: 35 },
];

const riskTimeline = [
  { date: "Mar 1", score: 4.2 },
  { date: "Mar 3", score: 5.1 },
  { date: "Mar 5", score: 5.8 },
  { date: "Mar 7", score: 6.5 },
  { date: "Mar 9", score: 7.2 },
  { date: "Mar 11", score: 7.8 },
  { date: "Mar 14", score: 8.4 },
];

const riskBreakdown = [
  { category: "Unusual Transaction Velocity", impact: 9.2, weight: "High" },
  { category: "High-Risk Geography", impact: 8.5, weight: "High" },
  { category: "Large Transaction Amounts", impact: 7.8, weight: "Medium" },
  { category: "Sanctions List Proximity", impact: 8.9, weight: "Critical" },
  { category: "Adverse Media Presence", impact: 6.5, weight: "Medium" },
];

export function RiskScoring() {
  const currentRiskScore = 8.4;
  const riskLevel = currentRiskScore >= 8 ? "Critical" : currentRiskScore >= 6 ? "High" : currentRiskScore >= 4 ? "Medium" : "Low";
  const riskColor = currentRiskScore >= 8 ? "text-red-600" : currentRiskScore >= 6 ? "text-orange-600" : currentRiskScore >= 4 ? "text-yellow-600" : "text-green-600";
  const progressPercentage = (currentRiskScore / 10) * 100;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Scoring Engine</h1>
        <p className="text-gray-600">AI-powered risk assessment and behavior analytics</p>
      </div>

      {/* Main Risk Score Card */}
      <div className="clean-card p-8 border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Meter */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#riskGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(currentRiskScore / 10) * 553} 553`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-5xl font-bold ${riskColor}`}>{currentRiskScore}</div>
                <div className="text-sm text-gray-600">Risk Score</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className={`status-badge ${
                riskLevel === 'Critical' ? 'status-critical' :
                riskLevel === 'High' ? 'status-high-risk' :
                riskLevel === 'Medium' ? 'status-medium-risk' :
                'status-low-risk'
              }`}>
                {riskLevel} Risk
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Tech Solutions Ltd</h2>
              <p className="text-gray-600">Customer ID: CUST-2024-5847 • Singapore</p>
            </div>

            <div className="clean-card p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 mb-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">AI Risk Assessment</div>
                  <p className="text-sm text-gray-700">
                    High risk due to unusual transaction velocity (15 transactions in 2 hours totaling $8.2M) 
                    and potential proximity to sanctioned entities. Transaction patterns suggest possible 
                    structuring behavior. Immediate investigation recommended.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="clean-card p-4 bg-blue-50 hover-lift">
                <Activity className="w-5 h-5 text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-xs text-gray-600">Transactions (2h)</div>
              </div>
              <div className="clean-card p-4 bg-purple-50 hover-lift">
                <TrendingUp className="w-5 h-5 text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">$8.2M</div>
                <div className="text-xs text-gray-600">Total Volume</div>
              </div>
              <div className="clean-card p-4 bg-orange-50 hover-lift">
                <AlertTriangle className="w-5 h-5 text-orange-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">7</div>
                <div className="text-xs text-gray-600">Active Alerts</div>
              </div>
              <div className="clean-card p-4 bg-cyan-50 hover-lift">
                <Shield className="w-5 h-5 text-cyan-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-xs text-gray-600">Confidence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors Radar */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factor Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskFactors}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="factor" stroke="#64748b" tick={{ fontSize: 12, fill: '#64748b' }} />
              <PolarRadiusAxis stroke="#cbd5e1" />
              <Radar name="Risk Level" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Timeline */}
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Score Evolution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTimeline}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="score" stroke="url(#lineGradient)" strokeWidth={3} dot={{ fill: '#ef4444', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Factor Breakdown */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Risk Factor Breakdown</h3>
        <div className="space-y-3">
          {riskBreakdown.map((item, index) => (
            <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Target className={`w-5 h-5 ${
                    item.impact >= 8.5 ? 'text-red-600' :
                    item.impact >= 7 ? 'text-orange-600' :
                    'text-yellow-600'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">{item.category}</div>
                    <div className="text-xs text-gray-600">Impact: {item.impact} / 10</div>
                  </div>
                </div>
                <span className={`status-badge ${
                  item.weight === 'Critical' ? 'status-critical' :
                  item.weight === 'High' ? 'status-high-risk' :
                  'status-medium-risk'
                }`}>
                  {item.weight}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    item.impact >= 8.5 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    item.impact >= 7 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  }`}
                  style={{ width: `${(item.impact / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button className="pill-button-primary px-6 py-3 flex-1">
          Create Investigation Case
        </button>
        <button className="pill-button px-6 py-3 flex-1 text-gray-700">
          Generate Risk Report
        </button>
        <button className="pill-button px-6 py-3 text-gray-700">
          View Full History
        </button>
      </div>
    </div>
  );
}