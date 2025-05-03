'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalFounders: 42,
    totalStartups: 38,
    activeFounders: 28,
    activeStartups: 24,
    okrCompletionRate: 62,
    averageNps: 8.7,
    monthlyLogRate: 76
  });
  const [users, setUsers] = useState([
    { id: '1', name: 'Alex Chen', role: 'founder', startup: 'EcoMetrics', batch: 'Fall 2024', lastActive: '2025-05-02', status: 'active' },
    { id: '2', name: 'Maya Patel', role: 'founder', startup: 'HealthSync', batch: 'Fall 2024', lastActive: '2025-05-01', status: 'active' },
    { id: '3', name: 'Jordan Smith', role: 'community', affiliation: 'Berkeley Entrepreneurship Association', lastActive: '2025-04-28', status: 'active' },
    { id: '4', name: 'Taylor Wong', role: 'founder', startup: 'DataViz', batch: 'Spring 2024', lastActive: '2025-04-15', status: 'inactive' },
    { id: '5', name: 'Sam Khan', role: 'admin', position: 'Program Manager', lastActive: '2025-05-03', status: 'active' },
  ]);
  const router = useRouter();
  
  useEffect(() => {
    // Check user is admin
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    
    setLoading(false);
  }, [router]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">Total Founders</h3>
          <p className="text-2xl font-bold">{metrics.totalFounders}</p>
          <p className="text-sm text-gray-400">{metrics.activeFounders} active</p>
        </div>
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">Total Startups</h3>
          <p className="text-2xl font-bold">{metrics.totalStartups}</p>
          <p className="text-sm text-gray-400">{metrics.activeStartups} active</p>
        </div>
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">Monthly Log Rate</h3>
          <p className="text-2xl font-bold">{metrics.monthlyLogRate}%</p>
          <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
            <div 
              className="bg-purple-600 h-1.5 rounded-full" 
              style={{ width: `${metrics.monthlyLogRate}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">Average NPS</h3>
          <p className="text-2xl font-bold">{metrics.averageNps}</p>
          <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
            <div 
              className="bg-purple-600 h-1.5 rounded-full" 
              style={{ width: `${(metrics.averageNps / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* User Management */}
      <div className="bg-slate-700 rounded-lg shadow-md p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700">
            Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-600">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Startup/Affiliation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-600">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-blue-900 text-blue-200' :
                      user.role === 'founder' ? 'bg-purple-900 text-purple-200' :
                      'bg-green-900 text-green-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.startup || user.affiliation || user.position || '-'}
                    {user.batch && <div className="text-xs text-gray-400">{user.batch}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-400 hover:text-purple-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* System Settings */}
      <div className="bg-slate-700 rounded-lg shadow-md p-5 mb-8">
        <h2 className="text-xl font-semibold mb-4">System Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Community Access Level
              </label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white">
                <option value="restricted">Restricted (Anonymized Data Only)</option>
                <option value="limited">Limited (General Insights)</option>
                <option value="full">Full (All Non-Private Data)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                OKR Logging Frequency
              </label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white">
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Notification Settings
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notification-okr"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  defaultChecked
                />
                <label htmlFor="notification-okr" className="ml-2 block text-sm text-gray-300">
                  Send OKR update reminders
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notification-comments"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  defaultChecked
                />
                <label htmlFor="notification-comments" className="ml-2 block text-sm text-gray-300">
                  Notify on comments and mentions
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notification-insights"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  defaultChecked
                />
                <label htmlFor="notification-insights" className="ml-2 block text-sm text-gray-300">
                  Weekly insights digest
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* Analytics */}
      <div className="bg-slate-700 rounded-lg shadow-md p-5">
        <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-300 mb-2">Monthly OKR Logging Rate</h3>
            <div className="h-48 bg-slate-800 rounded-lg p-4 flex items-end space-x-2">
              {/* Simplified bar chart - in a real app, use a charting library */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-purple-600 w-full" style={{ height: '30%' }}></div>
                <span className="text-xs mt-1">Jan</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-purple-600 w-full" style={{ height: '45%' }}></div>
                <span className="text-xs mt-1">Feb</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-purple-600 w-full" style={{ height: '55%' }}></div>
                <span className="text-xs mt-1">Mar</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-purple-600 w-full" style={{ height: '65%' }}></div>
                <span className="text-xs mt-1">Apr</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-purple-600 w-full" style={{ height: '76%' }}></div>
                <span className="text-xs mt-1">May</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-300 mb-2">User Activity</h3>
            <div className="h-48 bg-slate-800 rounded-lg p-4 flex items-end space-x-2">
              {/* Simplified line chart - in a real app, use a charting library */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-blue-500 w-full" style={{ height: '40%' }}></div>
                <span className="text-xs mt-1">Jan</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-blue-500 w-full" style={{ height: '50%' }}></div>
                <span className="text-xs mt-1">Feb</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-blue-500 w-full" style={{ height: '45%' }}></div>
                <span className="text-xs mt-1">Mar</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-blue-500 w-full" style={{ height: '60%' }}></div>
                <span className="text-xs mt-1">Apr</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-blue-500 w-full" style={{ height: '70%' }}></div>
                <span className="text-xs mt-1">May</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-500">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}