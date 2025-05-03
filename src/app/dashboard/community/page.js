'use client';
import { useState, useEffect } from 'react';
import { MOCK_COMMUNITY_POSTS } from '@/data/mockData';

export default function Community() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  
  useEffect(() => {
    // Get user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load mock data
    setPosts(MOCK_COMMUNITY_POSTS);
  }, []);
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    // Create new post
    const post = {
      id: Date.now().toString(),
      content: newPost,
      author: {
        id: user.username,
        name: user.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
        company: user.startup || user.affiliation || 'Free Ventures',
        role: user.role
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      liked: false
    };
    
    // Add to posts
    setPosts([post, ...posts]);
    
    // Clear input
    setNewPost('');
  };
  
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };
  
  const handleAddComment = (postId, comment) => {
    if (!comment.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now().toString(),
          content: comment,
          author: {
            id: user.username,
            name: user.name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
          },
          timestamp: new Date().toISOString()
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Feed</h1>
      
      {/* Create Post */}
      <div className="bg-slate-700 rounded-lg shadow-md p-4 mb-6">
        <form onSubmit={handlePostSubmit}>
          <textarea
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-white resize-none"
            rows="3"
            placeholder="Share insights, ask questions, or post updates..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              disabled={!newPost.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </div>
      
      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-700 rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              {/* Author Info */}
              <div className="flex items-start">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{post.author.name}</h3>
                    {post.author.role === 'founder' && (
                      <span className="ml-2 px-2 py-0.5 bg-purple-900 text-purple-200 text-xs rounded-full">
                        Founder
                      </span>
                    )}
                    {post.author.role === 'admin' && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-900 text-blue-200 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{post.author.company}</p>
                  <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="mt-3">
                <p className="text-white whitespace-pre-line">{post.content}</p>
              </div>
              
              {/* Actions */}
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <button
                  className={`flex items-center ${post.liked ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => handleLike(post.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill={post.liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.liked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {post.likes}
                </button>
                <button
                  className="flex items-center text-gray-400 hover:text-white"
                  onClick={() => document.getElementById(`comment-input-${post.id}`).focus()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {post.comments.length}
                </button>
              </div>
              
              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="mt-4 bg-slate-800 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Comments</h4>
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="text-xs font-medium">{comment.author.name}</p>
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(comment.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add Comment */}
              <div className="mt-3 flex">
                <input
                  id={`comment-input-${post.id}`}
                  type="text"
                  className="flex-1 px-3 py-1 bg-slate-800 border border-slate-600 rounded-l-md text-white text-sm"
                  placeholder="Add a comment..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment(post.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  className="px-3 py-1 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 text-sm"
                  onClick={(e) => {
                    const input = document.getElementById(`comment-input-${post.id}`);
                    handleAddComment(post.id, input.value);
                    input.value = '';
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}