import { Save, Mail, Bell, Smartphone, MessageSquare } from "lucide-react";

export function Notifications() {
  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">High-Risk Alerts</div>
              <div className="text-sm text-gray-600">Receive notifications for critical alerts requiring immediate attention</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Case Assignments</div>
              <div className="text-sm text-gray-600">Notify when compliance cases are assigned to you</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Daily Summary</div>
              <div className="text-sm text-gray-600">Receive daily compliance summary email at 9:00 AM</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Watchlist Updates</div>
              <div className="text-sm text-gray-600">Notify when watchlists are updated with new entries</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Weekly Reports</div>
              <div className="text-sm text-gray-600">Get comprehensive weekly compliance reports every Monday</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-100">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Browser Notifications</div>
              <div className="text-sm text-gray-600">Show desktop notifications for important events</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Real-time Alerts</div>
              <div className="text-sm text-gray-600">Instant notifications for high-priority compliance events</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Audit Log Changes</div>
              <div className="text-sm text-gray-600">Notify about changes in audit logs and system activities</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Mobile Notifications */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-100">
            <Smartphone className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Mobile Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">SMS Alerts</div>
              <div className="text-sm text-gray-600">Receive critical alerts via SMS to your registered number</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Mobile App Push</div>
              <div className="text-sm text-gray-600">Push notifications through the SmartCompliance mobile app</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-100">
            <MessageSquare className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Digest Frequency</label>
            <select className="clean-input w-full md:w-1/2 py-2.5 px-4">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Never</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours</label>
            <div className="grid grid-cols-2 gap-4 md:w-1/2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">From</label>
                <input type="time" defaultValue="22:00" className="clean-input w-full py-2.5 px-4" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">To</label>
                <input type="time" defaultValue="08:00" className="clean-input w-full py-2.5 px-4" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">No non-critical notifications during these hours</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Sound</label>
            <select className="clean-input w-full md:w-1/2 py-2.5 px-4">
              <option>Default</option>
              <option>Chime</option>
              <option>Bell</option>
              <option>Notification</option>
              <option>Silent</option>
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
