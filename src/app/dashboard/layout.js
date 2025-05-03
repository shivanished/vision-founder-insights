'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-400">Founder Insights Hub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="block text-gray-400">Signed in as</span>
              <span className="block font-medium text-white">{user.name}</span>
              <span className="block text-xs text-gray-400">
                {user.role === 'founder' ? user.startup : 
                 user.role === 'admin' ? user.position : 
                 user.affiliation}
              </span>
              <span className="block text-xs text-purple-400">
                {user.role === 'founder' ? user.batch : ''}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 shadow-inner">
          <nav className="mt-5 px-2">
            <Link href="/dashboard" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-slate-700">
              Dashboard
            </Link>
            <Link href="/dashboard/okr-log" className="mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-slate-700">
              OKR Logs
            </Link>
            <Link href="/dashboard/library" className="mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-slate-700">
              Knowledge Library
            </Link>
            <Link href="/dashboard/community" className="mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-slate-700">
              Community Feed
            </Link>
            {user.role === 'admin' && (
              <Link href="/dashboard/admin" className="mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-slate-700">
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-800 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}