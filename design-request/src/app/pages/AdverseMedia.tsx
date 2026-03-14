import { Search, ExternalLink, AlertTriangle, CheckCircle, TrendingUp, Newspaper, Globe } from "lucide-react";

const mediaResults = [
  {
    id: 1,
    title: "Global Tech Solutions Faces Regulatory Scrutiny Over Transaction Practices",
    source: "Financial Times",
    date: "March 10, 2024",
    relevance: 92,
    sentiment: "negative",
    credibility: "high",
    excerpt: "Regulatory authorities have opened an investigation into Global Tech Solutions following reports of unusual transaction patterns...",
    keywords: ["regulatory", "investigation", "transaction patterns", "compliance"],
  },
  {
    id: 2,
    title: "CEO of Global Tech Solutions Linked to Offshore Accounts Investigation",
    source: "Reuters",
    date: "March 8, 2024",
    relevance: 88,
    sentiment: "negative",
    credibility: "high",
    excerpt: "Sources close to the investigation reveal that the CEO of Global Tech Solutions has been questioned regarding offshore financial structures...",
    keywords: ["CEO", "offshore", "investigation", "financial"],
  },
  {
    id: 3,
    title: "Industry Leaders Discuss Money Laundering Prevention",
    source: "Bloomberg",
    date: "March 5, 2024",
    relevance: 45,
    sentiment: "neutral",
    credibility: "high",
    excerpt: "Global Tech Solutions among companies participating in industry roundtable on AML best practices...",
    keywords: ["money laundering", "prevention", "industry", "compliance"],
  },
  {
    id: 4,
    title: "Fintech Sector Sees Increased Compliance Requirements",
    source: "Wall Street Journal",
    date: "March 3, 2024",
    relevance: 38,
    sentiment: "neutral",
    credibility: "high",
    excerpt: "New regulatory frameworks are being introduced for fintech companies including enhanced monitoring requirements...",
    keywords: ["fintech", "compliance", "regulatory", "monitoring"],
  },
];

const monitoredEntities = [
  { name: "Michael Chen", type: "Individual", alerts: 2, lastUpdate: "2 hours ago", status: "active" },
  { name: "Global Tech Solutions Ltd", type: "Company", alerts: 5, lastUpdate: "30 mins ago", status: "critical" },
  { name: "Acme Corp International", type: "Company", alerts: 1, lastUpdate: "1 day ago", status: "active" },
  { name: "Sarah Johnson", type: "Individual", alerts: 0, lastUpdate: "3 days ago", status: "clear" },
];

export function AdverseMedia() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Adverse Media Screening</h1>
        <p className="text-gray-600">Real-time news and media monitoring for compliance risks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">127</div>
          <div className="text-gray-600 text-sm">Active Alerts</div>
          <div className="text-gray-500 text-xs mt-1">Requires review</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-red-50">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">23</div>
          <div className="text-gray-600 text-sm">High Relevance</div>
          <div className="text-gray-500 text-xs mt-1">Priority screening</div>
        </div>
        <div className="clean-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <Newspaper className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,420</div>
          <div className="text-gray-600 text-sm">Articles Screened</div>
          <div className="text-gray-500 text-xs mt-1">Last 24 hours</div>
        </div>
        <div className="clean-card p-6 hover-lift bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
              <Globe className="w-6 h-6 text-purple-700" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">45</div>
          <div className="text-gray-700 text-sm font-medium">Monitored Entities</div>
          <div className="text-gray-600 text-xs mt-1">Active monitoring</div>
        </div>
      </div>

      {/* Search */}
      <div className="clean-card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search entities, keywords, or sources..."
            className="clean-input w-full pl-12 pr-4 py-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Media Results */}
        <div className="lg:col-span-2 space-y-4">
          {mediaResults.map((article) => (
            <div key={article.id} className="clean-card p-6 hover-lift">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="font-medium">{article.source}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <a href="#" className="pill-button p-2 text-gray-700">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{article.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-600">Relevance:</div>
                    <div className="flex items-center gap-1">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            article.relevance >= 80 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                            article.relevance >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                            'bg-gradient-to-r from-green-500 to-blue-500'
                          }`}
                          style={{ width: `${article.relevance}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{article.relevance}%</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    article.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                    article.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {article.sentiment}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    article.credibility === 'high' ? 'bg-blue-100 text-blue-700' :
                    article.credibility === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {article.credibility} credibility
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {article.keywords.map((keyword, idx) => (
                  <span key={idx} className="tag-pill">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Monitored Entities Sidebar */}
        <div className="space-y-6">
          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitored Entities</h3>
            <div className="space-y-3">
              {monitoredEntities.map((entity, index) => (
                <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-900">{entity.name}</div>
                      <div className="text-xs text-gray-600">{entity.type}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      entity.status === 'critical' ? 'bg-red-500' :
                      entity.status === 'active' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                    <span className="font-medium">{entity.alerts} alerts</span>
                    <span>{entity.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="pill-button-primary w-full mt-4 py-2 text-sm">
              Add New Entity
            </button>
          </div>

          <div className="clean-card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-100">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">AI Monitoring Active</h4>
                <p className="text-sm text-gray-700">
                  Real-time screening across 150+ news sources and 25 languages with 99.8% accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="clean-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coverage Statistics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Global Coverage</span>
                  <span className="font-medium text-gray-900">150 sources</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Language Support</span>
                  <span className="font-medium text-gray-900">25 languages</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-gradient-to-r from-purple-500 to-pink-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Update Frequency</span>
                  <span className="font-medium text-gray-900">Real-time</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
