import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Activity, 
  Shield,
  Sparkles,
  ArrowUpRight,
  DollarSign,
  Users,
  Clock
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

// Mini sparkline data for stat cards
const riskScoreTrend = [
  { value: 6.8 }, { value: 7.1 }, { value: 6.9 }, { value: 7.2 }, 
  { value: 7.5 }, { value: 7.3 }, { value: 7.2 }
];

const alertsTrend = [
  { value: 158 }, { value: 145 }, { value: 152 }, { value: 148 }, 
  { value: 139 }, { value: 145 }, { value: 142 }
];

const transactionsTrend = [
  { value: 1.05 }, { value: 1.08 }, { value: 1.15 }, { value: 1.18 }, 
  { value: 1.12 }, { value: 1.16 }, { value: 1.2 }
];

// Weekly activity data for bar chart
const weeklyActivityData = [
  { day: "Mon", count: 12450, highlighted: false },
  { day: "Tue", count: 15670, highlighted: false },
  { day: "Wed", count: 18920, highlighted: true },
  { day: "Thu", count: 14230, highlighted: false },
  { day: "Fri", count: 16540, highlighted: false },
  { day: "Sat", count: 11230, highlighted: false },
  { day: "Sun", count: 13450, highlighted: false },
];

// Compliance Score Breakdown (Semi-circle chart)
const complianceBreakdown = [
  { name: "Excellent", value: 45, color: "#10b981" },
  { name: "Good", value: 30, color: "#0ea5e9" },
  { name: "Review", value: 18, color: "#f59e0b" },
  { name: "Critical", value: 7, color: "#ef4444" },
];

// Compliance channels breakdown
const complianceChannels = [
  { 
    name: "Customer Screening", 
    count: 5762, 
    change: 1.8, 
    value: 1378975,
    segments: 12 
  },
  { 
    name: "Transaction Monitoring", 
    count: 6843, 
    change: -2.8, 
    value: 778975,
    segments: 14 
  },
  { 
    name: "Risk Assessment", 
    count: 2123, 
    change: -2.8, 
    value: 778975,
    segments: 8 
  },
];

// Risk trend over time
const riskTrendData = [
  { month: "Jan", score: 6.2, transactions: 890000, change: 2.3 },
  { month: "Feb", score: 6.8, transactions: 920000, change: 1.6 },
  { month: "Mar", score: 7.1, transactions: 980000, change: 3.5 },
  { month: "Apr", score: 6.9, transactions: 1020000, change: -1.5 },
  { month: "May", score: 7.3, transactions: 1100000, change: 4.2 },
  { month: "Jun", score: 7.0, transactions: 1150000, change: -4.2 },
];

// Recent high-priority alerts
const recentAlerts = [
  {
    customer: "Acme Corp International",
    type: "Unusual Pattern",
    amount: "$2,450,000",
    time: "2 mins ago",
    avatar: "AC"
  },
  {
    customer: "Global Tech Solutions",
    type: "Sanctions Match",
    amount: "$850,000",
    time: "8 mins ago",
    avatar: "GT"
  },
  {
    customer: "FastPay Systems",
    type: "Velocity Check",
    amount: "$125,000",
    time: "15 mins ago",
    avatar: "FS"
  },
  {
    customer: "Crypto Exchange Ltd",
    type: "High-Risk Geo",
    amount: "$3,200,000",
    time: "23 mins ago",
    avatar: "CE"
  },
  {
    customer: "Digital Payments Inc",
    type: "PEP Match",
    amount: "$1,890,000",
    time: "35 mins ago",
    avatar: "DP"
  },
];

// Custom label with circular background for bar chart
const CustomBarLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const displayValue = (value / 1000).toFixed(0);
  
  // Calculate center position
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  // Circle radius
  const radius = 20;
  
  return (
    <g>
      {/* White circle background */}
      <circle 
        cx={centerX} 
        cy={centerY} 
        r={radius} 
        fill="white" 
        opacity={0.95}
      />
      {/* Value text */}
      <text 
        x={centerX} 
        y={centerY} 
        fill="#1f2937" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={16}
        fontWeight="bold"
      >
        {displayValue}
      </text>
    </g>
  );
};

// Custom tooltip for bar chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
        <p className="text-sm font-semibold mb-1">{payload[0].payload.day}</p>
        <p className="text-xl font-bold">{payload[0].value.toLocaleString()}</p>
        <p className="text-xs text-gray-400 mt-1">transactions</p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for Risk Trend Analysis
const ElegantRiskTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-gray-700">
        <p className="text-xs text-gray-400 mb-2">{data.month}</p>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-400">Risk Score</p>
            <p className="text-2xl font-bold">{data.score}</p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
            <div className="flex-1">
              <p className="text-xs text-gray-400">Transactions</p>
              <p className="text-sm font-semibold">${(data.transactions / 1000).toFixed(0)}K</p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Change</p>
              <p className={`text-sm font-semibold ${data.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {data.change > 0 ? '+' : ''}{data.change}%
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const totalScore = complianceBreakdown.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600">Real-time Compliance Intelligence</p>
        </div>
        <button className="pill-button-primary px-5 py-2.5 text-sm font-medium">
          Generate Report
        </button>
      </div>

      {/* Top Stats Row with Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Risk Score Card with Sparkline */}
        <div className="clean-card p-5 hover-lift relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">Risk Score</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">7.2</span>
                <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +2.3%
                </span>
              </div>
            </div>
          </div>
          {/* Mini Sparkline */}
          <div className="h-12 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskScoreTrend}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Card with Sparkline */}
        <div className="clean-card p-5 hover-lift relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">Alerts</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">142</span>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  -12%
                </span>
              </div>
            </div>
          </div>
          {/* Mini Sparkline */}
          <div className="h-12 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertsTrend}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Card with Sparkline */}
        <div className="clean-card p-5 hover-lift relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Transactions</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">1.2M</span>
                <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.5%
                </span>
              </div>
            </div>
          </div>
          {/* Mini Sparkline */}
          <div className="h-12 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionsTrend}>
                <defs>
                  <linearGradient id="transGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  fill="url(#transGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upgrade CTA Card */}
        <div className="clean-card p-5 hover-lift relative overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 border-0">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Upgrade</span>
            </div>
            <p className="text-sm mb-4 text-purple-100">
              Get more insights and opportunities
            </p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-50 transition-colors w-full">
              Go Pro
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Bar Chart - Takes 2 columns */}
        <div className="lg:col-span-2 clean-card p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
              <Activity className="w-4 h-4" />
              <span>WEEKLY ACTIVITY</span>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-700 font-medium cursor-pointer">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <div className="relative">
                <AlertTriangle className="w-4 h-4 text-gray-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Today's Total Transactions :</span>
              <span className="text-sm font-bold text-gray-900">98,452 units</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyActivityData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <defs>
                {/* Diagonal stripe patterns for each bar using theme colors */}
                <pattern id="diagonalStripe1" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#0369a1" strokeWidth="6" />
                </pattern>
                <pattern id="diagonalStripe2" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#0284c7" strokeWidth="6" />
                </pattern>
                <pattern id="diagonalStripe3" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#0ea5e9" strokeWidth="6" />
                </pattern>
                <pattern id="diagonalStripe4" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#06b6d4" strokeWidth="6" />
                </pattern>
                <pattern id="diagonalStripe5" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#22d3ee" strokeWidth="6" />
                </pattern>
                <pattern id="diagonalStripe6" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#67e8f9" strokeWidth="6" />
                </pattern>
                <pattern id="diagonalStripe7" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#a5f3fc" strokeWidth="6" />
                </pattern>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="0" 
                stroke="#e5e7eb" 
                vertical={false}
                horizontalPoints={[0, 40, 80, 120, 160, 200]}
              />
              
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                dy={10}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                domain={[0, 20000]}
                ticks={[0, 5000, 10000, 15000, 20000]}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={false} />
              
              <Bar 
                dataKey="count" 
                radius={[8, 8, 0, 0]}
                maxBarSize={80}
                label={<CustomBarLabel />}
              >
                {weeklyActivityData.map((entry, index) => {
                  const patterns = [
                    'url(#diagonalStripe1)',
                    'url(#diagonalStripe2)', 
                    'url(#diagonalStripe3)',
                    'url(#diagonalStripe4)',
                    'url(#diagonalStripe5)',
                    'url(#diagonalStripe6)',
                    'url(#diagonalStripe7)'
                  ];
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={patterns[index % patterns.length]} 
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insight - Takes 1 column */}
        <div className="lg:col-span-1 clean-card p-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 border-2 border-cyan-200">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Insight</h3>
                <span className="status-badge status-high-risk text-xs mt-1 inline-block">
                  Attention Required
                </span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                Detected unusual patterns across <span className="font-semibold text-gray-900">4 accounts</span>. Total volume: <span className="font-semibold text-gray-900">$8.2M</span> suggests potential structuring activity.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Risk Level</span>
                  <span className="font-bold text-red-600">High</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Accounts Flagged</span>
                  <span className="font-bold text-gray-900">4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Volume</span>
                  <span className="font-bold text-gray-900">$8.2M</span>
                </div>
              </div>
              
              <button className="pill-button-primary px-5 py-2.5 text-sm font-medium w-full">
                Investigate Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Trend Chart */}
      <div className="clean-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Risk Trend Analysis</h3>
          <div className="flex items-center gap-3">
            <button className="pill-button px-4 py-2 text-sm text-gray-700">
              Last 12 Months
            </button>
          </div>
        </div>
        
        {/* Clean Chart with Elegant Tooltip */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={riskTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Gradient for area fill */}
              <linearGradient id="elegantBlueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#d1d5db', fontSize: 11 }}
              dy={10}
            />
            
            <Tooltip 
              content={<ElegantRiskTooltip />} 
              cursor={{
                stroke: '#3b82f6',
                strokeWidth: 2,
                strokeDasharray: '5 5'
              }}
            />
            
            {/* Main Area with smooth line */}
            <Area 
              type="natural" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={2.5}
              fill="url(#elegantBlueGradient)"
              dot={false}
              activeDot={{ 
                r: 5, 
                fill: '#3b82f6', 
                stroke: '#fff', 
                strokeWidth: 3 
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Alerts List - Full Width */}
      <div className="clean-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          <button className="pill-button px-4 py-2 text-sm text-gray-700">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {alert.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">
                    {alert.customer}
                  </div>
                  <div className="text-xs text-gray-600">{alert.type}</div>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="font-bold text-gray-900 text-sm whitespace-nowrap">
                  {alert.amount}
                </div>
                <div className="text-xs text-gray-500">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}