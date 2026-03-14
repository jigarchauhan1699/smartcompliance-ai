import { Save, Shield, Key, Smartphone, Clock, MapPin, AlertTriangle } from "lucide-react";

export function Security() {
  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100">
            <Key className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        </div>
        
        <div className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="clean-input w-full py-2.5 px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="clean-input w-full py-2.5 px-4"
            />
            <p className="text-xs text-gray-600 mt-1">
              Password must be at least 12 characters with uppercase, lowercase, numbers, and symbols
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="clean-input w-full py-2.5 px-4"
            />
          </div>

          <button className="pill-button-primary px-5 py-2.5 text-sm">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-100">
            <Smartphone className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">Authenticator App (TOTP)</div>
              <div className="text-sm text-gray-600">Use an authenticator app like Google Authenticator or Authy</div>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                Enabled
              </span>
            </div>
            <button className="pill-button px-4 py-2 text-sm text-gray-700">
              Configure
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">SMS Authentication</div>
              <div className="text-sm text-gray-600">Receive verification codes via SMS to +1 (555) 123-4567</div>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full font-medium">
                Not Enabled
              </span>
            </div>
            <button className="pill-button px-4 py-2 text-sm text-gray-700">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">Backup Codes</div>
              <div className="text-sm text-gray-600">Generate backup codes for account recovery</div>
            </div>
            <button className="pill-button px-4 py-2 text-sm text-gray-700">
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-100">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-medium text-gray-900">Current Session</div>
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
                    Active Now
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>San Francisco, CA, United States</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Browser:</span>
                    <span>Chrome on macOS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">IP:</span>
                    <span>192.168.1.100</span>
                  </div>
                  <div className="text-xs text-gray-500">Last active: Just now</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">Mobile Device</div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>San Francisco, CA, United States</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Browser:</span>
                    <span>Safari on iOS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">IP:</span>
                    <span>192.168.1.105</span>
                  </div>
                  <div className="text-xs text-gray-500">Last active: 2 hours ago</div>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Revoke
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">Work Desktop</div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>New York, NY, United States</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Browser:</span>
                    <span>Firefox on Windows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">IP:</span>
                    <span>203.0.113.45</span>
                  </div>
                  <div className="text-xs text-gray-500">Last active: 1 day ago</div>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Revoke
              </button>
            </div>
          </div>
        </div>

        <button className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium">
          Revoke All Other Sessions
        </button>
      </div>

      {/* Security Alerts */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-100">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Login Notifications</div>
              <div className="text-sm text-gray-600">Alert me about unusual login activity or new device logins</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Password Change Alerts</div>
              <div className="text-sm text-gray-600">Notify me when my password is changed</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">API Key Usage Alerts</div>
              <div className="text-sm text-gray-600">Alert on suspicious API key usage or unauthorized access attempts</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-100">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Advanced Security</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Session Timeout</div>
              <div className="text-sm text-gray-600">Automatically log out after period of inactivity</div>
            </div>
            <select className="clean-input py-2 px-3 text-sm">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>Never</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">IP Allowlist</div>
              <div className="text-sm text-gray-600">Restrict access to specific IP addresses only</div>
            </div>
            <button className="pill-button px-4 py-2 text-sm text-gray-700">
              Configure
            </button>
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
