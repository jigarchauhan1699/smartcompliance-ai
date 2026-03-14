import { Save, Globe, Check, Settings, ExternalLink, Plus, Zap } from "lucide-react";

export function Integrations() {
  return (
    <div className="space-y-6">
      {/* Active Integrations */}
      <div className="clean-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Active Integrations</h3>
          </div>
          <span className="text-sm text-gray-600">3 connected</span>
        </div>
        
        <div className="space-y-3">
          {/* Slack Integration */}
          <div className="p-4 rounded-xl border-2 border-green-200 bg-green-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">#</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">Slack</h4>
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
                    Connected
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Send compliance alerts and notifications directly to your Slack channels
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Workspace: <span className="font-medium text-gray-900">Acme Financial Corp</span></span>
                  <span>•</span>
                  <span>Channel: <span className="font-medium text-gray-900">#compliance-alerts</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="pill-button px-3 py-1.5 text-sm text-gray-700">
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          {/* Microsoft Teams Integration */}
          <div className="p-4 rounded-xl border-2 border-green-200 bg-green-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">Microsoft Teams</h4>
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
                    Connected
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Collaborate on compliance cases and receive real-time updates in Teams
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Team: <span className="font-medium text-gray-900">Compliance Department</span></span>
                  <span>•</span>
                  <span>Synced conversations: <span className="font-medium text-gray-900">245</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="pill-button px-3 py-1.5 text-sm text-gray-700">
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          {/* Google Workspace Integration */}
          <div className="p-4 rounded-xl border-2 border-green-200 bg-green-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">Google Workspace</h4>
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
                    Connected
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Access compliance documents, reports, and collaborate using Google Drive
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Drive folder: <span className="font-medium text-gray-900">SmartCompliance Reports</span></span>
                  <span>•</span>
                  <span>Files synced: <span className="font-medium text-gray-900">1,234</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="pill-button px-3 py-1.5 text-sm text-gray-700">
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Integrations */}
      <div className="clean-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Available Integrations</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Salesforce */}
          <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">SF</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Salesforce</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Sync customer data and compliance checks with Salesforce CRM
                </p>
                <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Jira */}
          <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Jira</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Create and track compliance issues directly in Jira
                </p>
                <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Zendesk */}
          <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Zendesk</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Link compliance cases with customer support tickets
                </p>
                <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Zapier */}
          <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Zapier</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Connect with 5,000+ apps using automated workflows
                </p>
                <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Tableau */}
          <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">TB</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Tableau</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Visualize compliance data with advanced analytics
                </p>
                <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Power BI */}
          <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">BI</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Power BI</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Create interactive compliance dashboards and reports
                </p>
                <button className="pill-button-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API & Webhooks */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-100">
            <Globe className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">API & Webhooks</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">API Keys</div>
                <div className="text-sm text-gray-600">Manage API keys for programmatic access</div>
              </div>
              <button className="pill-button px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Key
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Active keys: <span className="font-medium text-gray-900">2</span></span>
              <span>•</span>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View documentation
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Webhooks</div>
                <div className="text-sm text-gray-600">Configure webhooks for real-time event notifications</div>
              </div>
              <button className="pill-button px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Webhook
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Active webhooks: <span className="font-medium text-gray-900">5</span></span>
              <span>•</span>
              <span>Events: <span className="font-medium text-gray-900">Case Created, Alert Triggered, Report Generated</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Settings */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-100">
            <Settings className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Integration Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Auto-sync Data</div>
              <div className="text-sm text-gray-600">Automatically synchronize data across all connected integrations</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Real-time Notifications</div>
              <div className="text-sm text-gray-600">Send notifications to integrated platforms in real-time</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Error Notifications</div>
              <div className="text-sm text-gray-600">Alert me when integration errors occur</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
            <select className="clean-input w-full md:w-1/2 py-2.5 px-4">
              <option>Real-time</option>
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
              <option>Every hour</option>
              <option>Manual only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="pill-button-primary px-6 py-3 flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button className="pill-button px-6 py-3 text-gray-700">
          Cancel
        </button>
      </div>
    </div>
  );
}
