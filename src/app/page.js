'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded credentials for demo
    if (username === 'founder' && password === 'freev2025') {
      localStorage.setItem('user', JSON.stringify({ 
        username, 
        role: 'founder',
        name: 'Alex Chen',
        startup: 'EcoMetrics',
        batch: 'Fall 2024'
      }));
      router.push('/dashboard');
    } else if (username === 'admin' && password === 'freev2025') {
      localStorage.setItem('user', JSON.stringify({ 
        username, 
        role: 'admin',
        name: 'Sam Taylor',
        position: 'Program Director'
      }));
      router.push('/dashboard');
    } else if (username === 'berkeley' && password === 'freev2025') {
      localStorage.setItem('user', JSON.stringify({ 
        username, 
        role: 'community',
        name: 'Jordan Smith',
        affiliation: 'Berkeley Entrepreneurship Association'
      }));
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try founder/freev2025, admin/freev2025, or berkeley/freev2025');
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="mt-6 text-3xl font-bold text-white">Free Ventures</h2>
          <h1 className="mt-2 text-4xl font-extrabold text-purple-400">Founder Insights Hub</h1>
        </div>
        
        <div className="bg-slate-700 rounded-lg shadow-lg p-8">
          {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 
                  rounded-md shadow-sm placeholder-gray-400 bg-slate-800 text-white
                  focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 
                  rounded-md shadow-sm placeholder-gray-400 bg-slate-800 text-white
                  focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-sm text-gray-300 text-center">
            <p>Demo Credentials:</p>
            <p>founder / freev2025</p>
            <p>admin / freev2025</p>
            <p>berkeley / freev2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}