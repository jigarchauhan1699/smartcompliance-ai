import { Save, Lock, Eye, EyeOff, Download, Trash2, Database, UserX } from "lucide-react";

export function Privacy() {
  return (
    <div className="space-y-6">
      {/* Data Privacy */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Data Privacy</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Profile Visibility</div>
              <div className="text-sm text-gray-600">Control who can see your profile information</div>
            </div>
            <select className="clean-input py-2 px-3 text-sm">
              <option>Everyone in Organization</option>
              <option>My Team Only</option>
              <option>Only Me</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Activity Status</div>
              <div className="text-sm text-gray-600">Show when you're online and active</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Last Seen</div>
              <div className="text-sm text-gray-600">Display your last active timestamp</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Email Discoverability</div>
              <div className="text-sm text-gray-600">Allow others to find you by your email address</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Analytics & Tracking */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-100">
            <Eye className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Analytics & Tracking</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Usage Analytics</div>
              <div className="text-sm text-gray-600">Help improve SmartCompliance by sharing anonymous usage data</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Performance Monitoring</div>
              <div className="text-sm text-gray-600">Allow performance data collection for platform optimization</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Personalized Recommendations</div>
              <div className="text-sm text-gray-600">Use my activity to provide personalized insights and recommendations</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Third-Party Analytics</div>
              <div className="text-sm text-gray-600">Share analytics with integrated third-party services</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-100">
            <EyeOff className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Communication Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Marketing Emails</div>
              <div className="text-sm text-gray-600">Receive emails about new features, updates, and tips</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Product Announcements</div>
              <div className="text-sm text-gray-600">Stay updated on major product releases and changes</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Research Participation</div>
              <div className="text-sm text-gray-600">Participate in user research and feedback surveys</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-100">
            <Database className="w-5 h-5 text-cyan-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Export Your Data</div>
                <div className="text-sm text-gray-600">Download a copy of your account data and activity</div>
              </div>
              <button className="pill-button px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Data Retention</div>
                <div className="text-sm text-gray-600">Configure how long your data is stored</div>
              </div>
              <select className="clean-input py-2 px-3 text-sm">
                <option>1 year</option>
                <option>2 years</option>
                <option>3 years</option>
                <option>5 years</option>
                <option>Indefinitely</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Clear Activity History</div>
                <div className="text-sm text-gray-600">Delete your browsing and activity history</div>
              </div>
              <button className="pill-button px-4 py-2 text-sm text-gray-700">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Apps & Services */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Lock className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Connected Apps & Services</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Slack Integration</div>
                <div className="text-sm text-gray-600 mb-2">Access to: Profile, Messages, Notifications</div>
                <div className="text-xs text-gray-500">Connected on March 10, 2026</div>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Revoke
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Microsoft Teams</div>
                <div className="text-sm text-gray-600 mb-2">Access to: Profile, Calendar, Notifications</div>
                <div className="text-xs text-gray-500">Connected on March 5, 2026</div>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Revoke
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Google Workspace</div>
                <div className="text-sm text-gray-600 mb-2">Access to: Profile, Email, Drive</div>
                <div className="text-xs text-gray-500">Connected on February 28, 2026</div>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="clean-card p-6 border-2 border-red-200 bg-red-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-200">
            <UserX className="w-5 h-5 text-red-700" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Danger Zone</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white border border-red-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Delete Account</div>
                <div className="text-sm text-gray-600">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
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
