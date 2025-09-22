import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft' | 'scheduled';
  author: string;
  publishDate: string;
  lastModified: string;
  tags: string[];
  featuredImage?: string;
  views: number;
  comments: number;
}

interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  status: 'published' | 'draft' | 'scheduled';
}

const Content: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft'
  });

  // Mock data for blog posts
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Getting Started with Moonglade CMS',
      slug: 'getting-started-moonglade-cms',
      excerpt: 'Learn how to set up and configure your new Moonglade CMS installation for optimal performance.',
      content: 'Full content of the getting started guide...',
      status: 'published',
      author: 'Admin',
      publishDate: '2025-09-20',
      lastModified: '2025-09-20T10:30:00Z',
      tags: ['tutorial', 'cms', 'getting-started'],
      featuredImage: 'https://picsum.photos/400/200?random=1',
      views: 1245,
      comments: 12
    },
    {
      id: 2,
      title: 'Advanced Customization Tips',
      slug: 'advanced-customization-tips',
      excerpt: 'Discover powerful customization options to make your CMS truly unique and tailored to your needs.',
      content: 'Full content about advanced customization...',
      status: 'published',
      author: 'Admin',
      publishDate: '2025-09-18',
      lastModified: '2025-09-19T14:15:00Z',
      tags: ['customization', 'advanced', 'tips'],
      featuredImage: 'https://picsum.photos/400/200?random=2',
      views: 856,
      comments: 8
    },
    {
      id: 3,
      title: 'Performance Optimization Guide',
      slug: 'performance-optimization-guide',
      excerpt: 'Boost your website performance with these proven optimization techniques and best practices.',
      content: 'Draft content about performance optimization...',
      status: 'draft',
      author: 'Admin',
      publishDate: '2025-09-25',
      lastModified: '2025-09-21T09:00:00Z',
      tags: ['performance', 'optimization', 'guide'],
      views: 0,
      comments: 0
    },
    {
      id: 4,
      title: 'Security Best Practices',
      slug: 'security-best-practices',
      excerpt: 'Essential security measures to protect your CMS and keep your content safe from threats.',
      content: 'Full content about security practices...',
      status: 'scheduled',
      author: 'Admin',
      publishDate: '2025-09-30',
      lastModified: '2025-09-21T16:45:00Z',
      tags: ['security', 'best-practices', 'protection'],
      views: 0,
      comments: 0
    },
    {
      id: 5,
      title: 'Content Management Strategies',
      slug: 'content-management-strategies',
      excerpt: 'Effective strategies for organizing and managing your content workflow efficiently.',
      content: 'Full content about content management...',
      status: 'published',
      author: 'Admin',
      publishDate: '2025-09-15',
      lastModified: '2025-09-15T11:20:00Z',
      tags: ['content', 'management', 'workflow'],
      featuredImage: 'https://picsum.photos/400/200?random=3',
      views: 2103,
      comments: 15
    }
  ]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? {
              ...post,
              title: formData.title,
              content: formData.content,
              excerpt: formData.excerpt,
              tags: formData.tags.split(',').map(tag => tag.trim()),
              status: formData.status,
              publishDate: new Date().toISOString().split('T')[0],
              lastModified: new Date().toISOString(),
              slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            }
          : post
      ));
      setEditingPost(null);
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Math.max(...posts.map(p => p.id)) + 1,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        excerpt: formData.excerpt,
        content: formData.content,
        status: formData.status,
        author: 'Admin',
        publishDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString(),
        tags: formData.tags.split(',').map(tag => tag.trim()),
        views: 0,
        comments: 0
      };
      setPosts([newPost, ...posts]);
      setShowNewPostForm(false);
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      tags: '',
      status: 'draft'
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(', '),
      status: post.status
    });
    setShowNewPostForm(true);
  };

  const handleDelete = (postId: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
      draft: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
      scheduled: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (showNewPostForm || editingPost) {
    return (
      <div className="flex-1 bg-neutral-950 h-full overflow-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                    {editingPost ? 'Edit Item' : 'Create New Item'}
                  </h1>
                  <p className="text-neutral-400 font-medium">
                    {editingPost ? 'Update your existing blog item' : 'Write and publish a new blog item'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowNewPostForm(false);
                    setEditingPost(null);
                    setFormData({
                      title: '',
                      content: '',
                      excerpt: '',
                      tags: '',
                      status: 'draft'
                    });
                  }}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  ← Back to Items
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                {/* Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-neutral-900 dark:text-white"
                    placeholder="Enter your item title"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-neutral-900 dark:text-white resize-none"
                    placeholder="Write a brief summary of your item"
                    required
                  />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-neutral-900 dark:text-white resize-none"
                    placeholder="Write your item content here..."
                    required
                  />
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-neutral-900 dark:text-white"
                    placeholder="Enter tags separated by commas (e.g., tutorial, cms, guide)"
                  />
                </div>

                {/* Status and Publish Date */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-neutral-900 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    * Required fields
                  </p>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewPostForm(false);
                        setEditingPost(null);
                      }}
                      className="px-6 py-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{editingPost ? 'Update Item' : 'Create Item'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-neutral-950 h-full overflow-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Content Management
                </h1>
                <p className="text-neutral-400 font-medium">
                  Create, edit, and manage your blog posts and articles.
                </p>
              </div>
              <button
                onClick={() => setShowNewPostForm(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Item</span>
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Items', value: posts.length, icon: '📝', color: 'bg-blue-500' },
              { label: 'Published', value: posts.filter(p => p.status === 'published').length, icon: '✅', color: 'bg-green-500' },
              { label: 'Drafts', value: posts.filter(p => p.status === 'draft').length, icon: '📄', color: 'bg-yellow-500' },
              { label: 'Scheduled', value: posts.filter(p => p.status === 'scheduled').length, icon: '⏰', color: 'bg-purple-500' }
            ].map((stat, index) => (
              <div key={index} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-neutral-900 dark:text-white"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex space-x-2">
                {(['all', 'published', 'draft', 'scheduled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200 capitalize ${
                      statusFilter === status
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
            {filteredPosts.length > 0 ? (
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200">
                    <div className="flex items-start space-x-4">
                      {/* Featured Image or Placeholder */}
                      <div className="w-20 h-20 flex-shrink-0">
                        {post.featuredImage ? (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Post Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white truncate pr-4">
                            {post.title}
                          </h3>
                          {getStatusBadge(post.status)}
                        </div>
                        
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                          <span>Published: {formatDate(post.publishDate)}</span>
                          <span>Modified: {formatDateTime(post.lastModified)}</span>
                          <span>{post.views} views</span>
                          <span>{post.comments} comments</span>
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200">
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-1">
                  No items found
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => setShowNewPostForm(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Create your first item
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;