import { Save } from "lucide-react";

export function Profile() {
  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
        
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
            SJ
          </div>
          <div>
            <button className="pill-button px-4 py-2 text-sm text-gray-700 mb-2">Upload Photo</button>
            <p className="text-xs text-gray-600">JPG, PNG or GIF. Max size 2MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="Sarah"
              className="clean-input w-full py-2.5 px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Johnson"
              className="clean-input w-full py-2.5 px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="sarah.j@acme.com"
              className="clean-input w-full py-2.5 px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              defaultValue="Compliance Analyst"
              className="clean-input w-full py-2.5 px-4"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              defaultValue="Acme Financial Corp"
              className="clean-input w-full py-2.5 px-4"
            />
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="clean-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="clean-input w-full py-2.5 px-4">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="clean-input w-full py-2.5 px-4">
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (CET)</option>
              <option>UTC+8 (Singapore)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select className="clean-input w-full py-2.5 px-4">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="clean-input w-full py-2.5 px-4">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>SGD (S$)</option>
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
