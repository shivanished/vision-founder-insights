'use client';
import { useState, useEffect } from 'react';
import { MOCK_INSIGHTS, MOCK_RECENT_ACTIVITIES, MOCK_METRICS } from '@/data/mockData';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [insights, setInsights] = useState([]);
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState({});
  
  useEffect(() => {
    // Get user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load mock data
    setInsights(MOCK_INSIGHTS.slice(0, 3)); // Just show recent 3
    setActivities(MOCK_RECENT_ACTIVITIES.slice(0, 5)); // Just show recent 5
    setMetrics(MOCK_METRICS);
  }, []);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">Batch Founders</h3>
          <p className="text-2xl font-bold">{metrics.batchFounders}</p>
        </div>
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">Knowledge Posts</h3>
          <p className="text-2xl font-bold">{metrics.knowledgePosts}</p>
        </div>
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">Monthly Log Rate</h3>
          <p className="text-2xl font-bold">{metrics.logRate}%</p>
        </div>
        <div className="bg-slate-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-400 text-sm font-semibold">User NPS</h3>
          <p className="text-2xl font-bold">{metrics.userNPS}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Insights */}
        <div className="bg-slate-700 rounded-lg shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Insights</h2>
            <a href="/dashboard/library" className="text-purple-400 text-sm hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-slate-600 p-4 rounded">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-purple-300">{insight.category}</span>
                  <span className="text-xs text-gray-400">{insight.date}</span>
                </div>
                <h3 className="font-semibold mt-1">{insight.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{insight.summary}</p>
                <div className="flex items-center mt-2">
                  <img 
                    src={insight.authorAvatar} 
                    alt={insight.authorName} 
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-xs ml-2 text-gray-400">
                    {insight.authorName}, {insight.authorCompany}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-slate-700 rounded-lg shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <a href="/dashboard/community" className="text-purple-400 text-sm hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="border-b border-slate-600 pb-3 last:border-0">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src={activity.userAvatar} 
                      alt={activity.userName} 
                      className="h-8 w-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.userName}</span>
                      <span className="text-gray-400"> {activity.action} </span>
                      {activity.target && (
                        <span className="text-purple-300">{activity.target}</span>
                      )}
                    </p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your OKRs Section - Only visible to founders */}
      {user.role === 'founder' && (
        <div className="mt-8 bg-slate-700 rounded-lg shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your OKRs</h2>
            <a href="/dashboard/okr-log" className="text-purple-400 text-sm hover:underline">Manage OKRs</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-600">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Objective</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Key Results</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Launch beta product</td>
                  <td className="px-6 py-4 text-sm">
                    <ul className="list-disc pl-5">
                      <li>Onboard 50 beta users</li>
                      <li>Collect 25 feedback surveys</li>
                      <li>Resolve critical bugs</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Jun 15, 2025</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Secure seed funding</td>
                  <td className="px-6 py-4 text-sm">
                    <ul className="list-disc pl-5">
                      <li>Create investor pitch deck</li>
                      <li>Schedule 10 investor meetings</li>
                      <li>Close $500K funding round</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">On Track</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Jul 31, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}