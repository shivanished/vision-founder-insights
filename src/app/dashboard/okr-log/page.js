'use client';
import { useState, useEffect } from 'react';
import { MOCK_OKRS, COMPANY_SECTORS } from '@/data/mockData';

export default function OKRLog() {
  const [user, setUser] = useState(null);
  const [okrs, setOkrs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterSector, setFilterSector] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newOkr, setNewOkr] = useState({
    objective: '',
    keyResults: [''],
    dueDate: '',
    status: 'Planning',
    sector: '',
    tags: ''
  });
  
  useEffect(() => {
    // Get user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load mock data
    setOkrs(MOCK_OKRS);
  }, []);
  
  const handleAddKeyResult = () => {
    setNewOkr({
      ...newOkr,
      keyResults: [...newOkr.keyResults, '']
    });
  };
  
  const handleKeyResultChange = (index, value) => {
    const updatedKeyResults = [...newOkr.keyResults];
    updatedKeyResults[index] = value;
    setNewOkr({
      ...newOkr,
      keyResults: updatedKeyResults
    });
  };
  
  const handleRemoveKeyResult = (index) => {
    const updatedKeyResults = newOkr.keyResults.filter((_, i) => i !== index);
    setNewOkr({
      ...newOkr,
      keyResults: updatedKeyResults
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert tags string to array
    const tagsArray = newOkr.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    // Create new OKR entry
    const newOkrEntry = {
      id: Date.now().toString(),
      objective: newOkr.objective,
      keyResults: newOkr.keyResults.filter(kr => kr.trim() !== ''),
      status: newOkr.status,
      dueDate: newOkr.dueDate,
      sector: newOkr.sector,
      tags: tagsArray,
      createdBy: user.name,
      createdAt: new Date().toISOString(),
      company: user.startup || 'Free Ventures',
      progress: 0,
      private: false
    };
    
    // Add to OKRs list
    setOkrs([newOkrEntry, ...okrs]);
    
    // Reset form
    setNewOkr({
      objective: '',
      keyResults: [''],
      dueDate: '',
      status: 'Planning',
      sector: '',
      tags: ''
    });
    
    // Hide form
    setShowForm(false);
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }

  // Only founders and admins can add OKRs
  const canAddOkrs = user.role === 'founder' || user.role === 'admin';
  
  // Filter OKRs
  const filteredOkrs = okrs.filter(okr => {
    // Community users can only see non-private OKRs
    const isVisible = user.role !== 'community' || !okr.private;
    
    // Search filter
    const matchesSearch = !searchTerm ||
      okr.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      okr.keyResults.some(kr => kr.toLowerCase().includes(searchTerm.toLowerCase())) ||
      okr.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Sector filter
    const matchesSector = filterSector === 'all' || okr.sector === filterSector;
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || okr.status === filterStatus;
    
    return isVisible && matchesSearch && matchesSector && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">OKR Logs</h1>
        {canAddOkrs && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            {showForm ? 'Cancel' : 'Add New OKR'}
          </button>
        )}
      </div>
      
      {/* New OKR Form */}
      {showForm && (
        <div className="bg-slate-700 rounded-lg shadow-md p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New OKR</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Objective
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                placeholder="What do you want to achieve?"
                value={newOkr.objective}
                onChange={(e) => setNewOkr({...newOkr, objective: e.target.value})}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Key Results
              </label>
              {newOkr.keyResults.map((kr, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                    placeholder="Measurable outcome"
                    value={kr}
                    onChange={(e) => handleKeyResultChange(index, e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyResult(index)}
                    className="ml-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    disabled={newOkr.keyResults.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddKeyResult}
                className="mt-2 px-3 py-1 bg-slate-600 text-white rounded-md hover:bg-slate-500 text-sm"
              >
                + Add Key Result
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                  value={newOkr.dueDate}
                  onChange={(e) => setNewOkr({...newOkr, dueDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                  value={newOkr.status}
                  onChange={(e) => setNewOkr({...newOkr, status: e.target.value})}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Track">On Track</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Sector
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                  value={newOkr.sector}
                  onChange={(e) => setNewOkr({...newOkr, sector: e.target.value})}
                  required
                >
                  <option value="" disabled>Select a sector</option>
                  {COMPANY_SECTORS.map(sector => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                  placeholder="e.g. funding, marketing, product"
                  value={newOkr.tags}
                  onChange={(e) => setNewOkr({...newOkr, tags: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-300 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save OKR
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-slate-700 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search OKRs..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
            >
              <option value="all">All Sectors</option>
              {COMPANY_SECTORS.map(sector => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        
        {/* Active filters */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {searchTerm && (
            <div className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm flex items-center">
              Search: {searchTerm}
              <button 
                className="ml-2 text-purple-200 hover:text-white"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            </div>
          )}
          
          {filterSector !== 'all' && (
            <div className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm flex items-center">
              Sector: {filterSector}
              <button 
                className="ml-2 text-blue-200 hover:text-white"
                onClick={() => setFilterSector('all')}
              >
                ×
              </button>
            </div>
          )}
          
          {filterStatus !== 'all' && (
            <div className="bg-green-900 text-green-200 px-3 py-1 rounded-full text-sm flex items-center">
              Status: {filterStatus}
              <button 
                className="ml-2 text-green-200 hover:text-white"
                onClick={() => setFilterStatus('all')}
              >
                ×
              </button>
            </div>
          )}
          
          {/* Clear all filters button */}
          {(searchTerm || filterSector !== 'all' || filterStatus !== 'all') && (
            <button 
              className="text-sm text-gray-400 hover:text-white underline"
              onClick={() => {
                setSearchTerm('');
                setFilterSector('all');
                setFilterStatus('all');
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
      
      {/* Results Counter */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredOkrs.length} of {okrs.length} OKRs
      </div>
      
      {/* OKRs List */}
      <div className="space-y-6">
        {filteredOkrs.map((okr) => (
          <div key={okr.id} className="bg-slate-700 rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg">{okr.objective}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${okr.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        okr.status === 'On Track' ? 'bg-blue-100 text-blue-800' :
                        okr.status === 'At Risk' ? 'bg-red-100 text-red-800' :
                        okr.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {okr.status}
                    </span>
                    {okr.sector && (
                      <span className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-full">
                        {okr.sector}
                      </span>
                    )}
                    {okr.private && (
                      <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded-full">
                        Private
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-600 rounded-full h-2.5 my-3">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${okr.progress}%` }}
                ></div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Key Results:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {okr.keyResults.map((kr, index) => (
                    <li key={index}>{kr}</li>
                  ))}
                </ul>
              </div>
              
              {/* Tags */}
              {okr.tags && okr.tags.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 mt-1">
                    {okr.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-slate-800 text-gray-300 text-xs px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                <div>
                  <span>Due: {okr.dueDate}</span>
                </div>
                <div>
                  <span>{okr.company}</span> • <span>Created by {okr.createdBy}</span>
                </div>
              </div>
            </div>
            
            {/* Actions Footer */}
            <div className="bg-slate-800 px-5 py-3 flex items-center justify-between">
              {(user.role === 'founder' && okr.createdBy === user.name) || user.role === 'admin' ? (
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Update Progress
                  </button>
                  <button className="px-3 py-1 bg-slate-600 text-white text-sm rounded hover:bg-slate-500">
                    Edit
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <button className="text-sm text-purple-400 hover:text-purple-300">Log Updates</button>
            </div>
          </div>
        ))}
        
        {filteredOkrs.length === 0 && (
          <div className="text-center py-8 bg-slate-700 rounded-lg">
            <p className="text-lg text-gray-400">No OKRs found matching your filters</p>
            <button 
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={() => {
                setSearchTerm('');
                setFilterSector('all');
                setFilterStatus('all');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}