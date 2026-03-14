import { Save, Palette, Monitor, Moon, Sun, Layout, Type, Zap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export function Appearance() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
            <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Theme</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Light Theme */}
          <div className="relative">
            <input
              type="radio"
              name="theme"
              id="theme-light"
              checked={theme === "light"}
              onChange={() => setTheme("light")}
              className="peer sr-only"
            />
            <label
              htmlFor="theme-light"
              className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950"
            >
              <div className="w-16 h-16 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center mb-3">
                <Sun className="w-8 h-8 text-amber-500" />
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Light</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center">Clean and bright interface</div>
            </label>
          </div>

          {/* Dark Theme */}
          <div className="relative">
            <input
              type="radio"
              name="theme"
              id="theme-dark"
              checked={theme === "dark"}
              onChange={() => setTheme("dark")}
              className="peer sr-only"
            />
            <label
              htmlFor="theme-dark"
              className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950"
            >
              <div className="w-16 h-16 rounded-lg bg-gray-900 border-2 border-gray-700 flex items-center justify-center mb-3">
                <Moon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Dark</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center">Easy on the eyes</div>
            </label>
          </div>

          {/* Auto Theme */}
          <div className="relative">
            <input
              type="radio"
              name="theme"
              id="theme-auto"
              checked={theme === "auto"}
              onChange={() => setTheme("auto")}
              className="peer sr-only"
            />
            <label
              htmlFor="theme-auto"
              className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950"
            >
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-white to-gray-900 border-2 border-gray-300 flex items-center justify-center mb-3">
                <Monitor className="w-8 h-8 text-gray-600" />
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Auto</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center">Matches system settings</div>
            </label>
          </div>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-100">
            <Palette className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Accent Color</h3>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {/* Blue (Default) */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-blue"
              defaultChecked
              className="peer sr-only"
            />
            <label
              htmlFor="accent-blue"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-blue-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Blue</div>
            </label>
          </div>

          {/* Cyan */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-cyan"
              className="peer sr-only"
            />
            <label
              htmlFor="accent-cyan"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-cyan-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Cyan</div>
            </label>
          </div>

          {/* Purple */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-purple"
              className="peer sr-only"
            />
            <label
              htmlFor="accent-purple"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-600 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-purple-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Purple</div>
            </label>
          </div>

          {/* Pink */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-pink"
              className="peer sr-only"
            />
            <label
              htmlFor="accent-pink"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-pink-600 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-pink-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Pink</div>
            </label>
          </div>

          {/* Green */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-green"
              className="peer sr-only"
            />
            <label
              htmlFor="accent-green"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-green-600 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-green-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Green</div>
            </label>
          </div>

          {/* Amber */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-amber"
              className="peer sr-only"
            />
            <label
              htmlFor="accent-amber"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-amber-600 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-amber-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Amber</div>
            </label>
          </div>

          {/* Red */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-red"
              className="peer sr-only"
            />
            <label
              htmlFor="accent-red"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-red-600 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-red-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Red</div>
            </label>
          </div>

          {/* Slate */}
          <div className="relative">
            <input
              type="radio"
              name="accent"
              id="accent-slate"
              className="peer sr-only"
            />
            <label
              htmlFor="accent-slate"
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-700 hover:scale-110 transition-transform peer-checked:ring-4 peer-checked:ring-slate-300"></div>
              <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-900">Slate</div>
            </label>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-100">
            <Layout className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Display</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Density</label>
            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <input
                  type="radio"
                  name="density"
                  id="density-compact"
                  className="peer sr-only"
                />
                <label
                  htmlFor="density-compact"
                  className="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50"
                >
                  <div className="font-medium text-gray-900 text-sm">Compact</div>
                  <div className="text-xs text-gray-600">More content</div>
                </label>
              </div>

              <div className="relative">
                <input
                  type="radio"
                  name="density"
                  id="density-comfortable"
                  defaultChecked
                  className="peer sr-only"
                />
                <label
                  htmlFor="density-comfortable"
                  className="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50"
                >
                  <div className="font-medium text-gray-900 text-sm">Comfortable</div>
                  <div className="text-xs text-gray-600">Balanced</div>
                </label>
              </div>

              <div className="relative">
                <input
                  type="radio"
                  name="density"
                  id="density-spacious"
                  className="peer sr-only"
                />
                <label
                  htmlFor="density-spacious"
                  className="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50"
                >
                  <div className="font-medium text-gray-900 text-sm">Spacious</div>
                  <div className="text-xs text-gray-600">More space</div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Compact Sidebar</div>
              <div className="text-sm text-gray-600">Reduce sidebar width for more screen space</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Show Breadcrumbs</div>
              <div className="text-sm text-gray-600">Display navigation breadcrumbs at the top</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Type className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Typography</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select className="clean-input w-full md:w-1/2 py-2.5 px-4">
              <option>System Default</option>
              <option>Inter</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Lato</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Font Size</label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Small</span>
              <input
                type="range"
                min="12"
                max="18"
                defaultValue="14"
                className="flex-1 max-w-md"
              />
              <span className="text-sm text-gray-600">Large</span>
              <span className="text-sm font-medium text-gray-900 w-12 text-right">14px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <div className="clean-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-100">
            <Zap className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Animations</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Enable Animations</div>
              <div className="text-sm text-gray-600">Smooth transitions and motion effects</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <div className="font-medium text-gray-900 mb-1">Reduce Motion</div>
              <div className="text-sm text-gray-600">Minimize animations for accessibility</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Animation Speed</label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Slow</span>
              <input
                type="range"
                min="1"
                max="3"
                defaultValue="2"
                className="flex-1 max-w-md"
              />
              <span className="text-sm text-gray-600">Fast</span>
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
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}