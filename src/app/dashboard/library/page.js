'use client';
import { useState, useEffect } from 'react';
import { MOCK_INSIGHTS, COMPANY_SECTORS } from '@/data/mockData';

export default function Library() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSector, setFilterSector] = useState('all');
  const [filterTag, setFilterTag] = useState('');
  const [insights, setInsights] = useState([]);
  const [showTagSearch, setShowTagSearch] = useState(false);
  
  useEffect(() => {
    // Get user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load mock data
    setInsights(MOCK_INSIGHTS);
  }, []);
  
  // Extract unique categories
  const categories = ['all', ...new Set(insights.map(insight => insight.category))];
  
  // Extract unique tags for autocomplete
  const allTags = insights.reduce((acc, insight) => {
    if (insight.tags && Array.isArray(insight.tags)) {
      return [...acc, ...insight.tags];
    }
    return acc;
  }, []);
  const uniqueTags = [...new Set(allTags)];
  
  // Filter insights based on search, category, sector and tags
  const filteredInsights = insights.filter(insight => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filterCategory === 'all' || insight.category === filterCategory;
    
    // Sector filter
    const matchesSector = filterSector === 'all' || insight.sector === filterSector;
    
    // Tag filter
    const matchesTag = !filterTag || 
      (insight.tags && insight.tags.some(tag => 
        tag.toLowerCase().includes(filterTag.toLowerCase())));
    
    // Only show private content to founders and admins
    const visibleToUser = !insight.private || 
      (user && (user.role === 'founder' || user.role === 'admin'));
    
    return matchesSearch && matchesCategory && matchesSector && matchesTag && visibleToUser;
  });
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Knowledge Library</h1>
      
      {/* Search and Filter Controls */}
      <div className="bg-slate-700 rounded-lg p-5 mb-6">
        <div className="flex flex-col space-y-4">
          {/* Search bar */}
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search insights..."
                className="w-full px-4 py-2 pr-10 rounded-md bg-slate-800 border border-slate-600 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category filter */}
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category-filter"
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-white"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sector filter */}
            <div>
              <label htmlFor="sector-filter" className="block text-sm font-medium text-gray-300 mb-1">
                Sector
              </label>
              <select
                id="sector-filter"
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-white"
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
            
            {/* Tag search */}
            <div>
              <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-300 mb-1">
                Tags
              </label>
              <div className="relative">
                <input
                  id="tag-filter"
                  type="text"
                  placeholder="Search by tag..."
                  className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-white"
                  value={filterTag}
                  onChange={(e) => {
                    setFilterTag(e.target.value);
                    setShowTagSearch(e.target.value !== '');
                  }}
                  onFocus={() => setShowTagSearch(true)}
                  onBlur={() => setTimeout(() => setShowTagSearch(false), 200)}
                />
                
                {/* Tag suggestions */}
                {showTagSearch && filterTag && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-700 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-auto">
                    {uniqueTags
                      .filter(tag => tag.toLowerCase().includes(filterTag.toLowerCase()))
                      .map((tag, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 cursor-pointer hover:bg-slate-600"
                          onClick={() => {
                            setFilterTag(tag);
                            setShowTagSearch(false);
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    {uniqueTags.filter(tag => tag.toLowerCase().includes(filterTag.toLowerCase())).length === 0 && (
                      <div className="px-3 py-2 text-gray-400">No matching tags</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Active filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategory !== 'all' && (
              <div className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm flex items-center">
                Category: {filterCategory}
                <button 
                  className="ml-2 text-purple-200 hover:text-white"
                  onClick={() => setFilterCategory('all')}
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
            
            {filterTag && (
              <div className="bg-green-900 text-green-200 px-3 py-1 rounded-full text-sm flex items-center">
                Tag: {filterTag}
                <button 
                  className="ml-2 text-green-200 hover:text-white"
                  onClick={() => setFilterTag('')}
                >
                  ×
                </button>
              </div>
            )}
            
            {/* Clear all filters button */}
            {(filterCategory !== 'all' || filterSector !== 'all' || filterTag) && (
              <button 
                className="text-sm text-gray-400 hover:text-white underline"
                onClick={() => {
                  setFilterCategory('all');
                  setFilterSector('all');
                  setFilterTag('');
                  setSearchTerm('');
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Results Counter */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredInsights.length} of {insights.length} insights
      </div>
      
      {/* Content Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsights.map((insight) => (
          <div key={insight.id} className="bg-slate-700 rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-purple-900 text-purple-200 text-xs px-2 py-1 rounded-full">{insight.category}</span>
                <span className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-full">{insight.sector}</span>
                {insight.private && (
                  <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded-full">Private</span>
                )}
              </div>
              <div className="text-right text-xs text-gray-400 mb-2">{insight.date}</div>
              
              <h3 className="font-bold text-lg mt-2">{insight.title}</h3>
              <p className="text-sm text-gray-300 mt-2 line-clamp-3">{insight.summary}</p>
              
              {/* Tags */}
              {insight.tags && insight.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {insight.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-slate-800 text-gray-300 text-xs px-2 py-0.5 rounded hover:bg-slate-600 cursor-pointer"
                      onClick={() => setFilterTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Show full content or restricted based on user role */}
              {(user.role === 'founder' || user.role === 'admin' || !insight.private) && (
                <div className="mt-4 text-sm text-gray-300 border-t border-slate-600 pt-4">
                  <p className="line-clamp-3">{insight.content}</p>
                </div>
              )}
              
              {user.role === 'community' && insight.private && (
                <div className="mt-4 text-sm text-gray-500 border-t border-slate-600 pt-4">
                  <p className="italic">Full content available to batch founders only</p>
                </div>
              )}
              
              <div className="flex items-center mt-4">
                <img 
                  src={insight.authorAvatar} 
                  alt={insight.authorName} 
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm font-medium">{insight.authorName}</p>
                  <p className="text-xs text-gray-400">{insight.authorCompany}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 px-5 py-3 flex items-center justify-between">
              <div className="flex space-x-3">
                <button className="flex items-center text-sm text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {insight.upvotes}
                </button>
                <button className="flex items-center text-sm text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {insight.comments}
                </button>
              </div>
              <button className="text-sm text-purple-400 hover:text-purple-300">Read More</button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredInsights.length === 0 && (
        <div className="text-center py-8 bg-slate-700 rounded-lg">
          <p className="text-lg text-gray-400">No insights found matching your search criteria</p>
          <button 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
              setFilterSector('all');
              setFilterTag('');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}