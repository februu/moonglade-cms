import React, { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language, title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-6">
      {title && (
        <div className="px-4 py-2 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-300">{title}</span>
          <span className="text-xs text-neutral-500 uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-neutral-300 font-mono leading-relaxed">
            {children}
          </code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors duration-200"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

const TableOfContents: React.FC<{ items: TOCItem[] }> = ({ items }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white tracking-tight mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Table of Contents
      </h2>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={`${item.level > 1 ? 'ml-4' : ''}`}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-left text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                {item.level > 1 && '• '}
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const Documentation: React.FC = () => {
  const tocItems: TOCItem[] = [
    { id: 'getting-started', title: 'Getting Started', level: 1 },
    { id: 'installation', title: 'Installation', level: 2 },
    { id: 'configuration', title: 'Configuration', level: 2 },
    { id: 'basic-usage', title: 'Basic Usage', level: 1 },
    { id: 'creating-posts', title: 'Creating Posts', level: 2 },
    { id: 'managing-media', title: 'Managing Media', level: 2 },
    { id: 'api-reference', title: 'API Reference', level: 1 },
    { id: 'authentication', title: 'Authentication', level: 2 },
    { id: 'endpoints', title: 'Endpoints', level: 2 },
    { id: 'troubleshooting', title: 'Troubleshooting', level: 1 },
    { id: 'common-issues', title: 'Common Issues', level: 2 },
    { id: 'support', title: 'Support', level: 2 }
  ];

  return (
    <div className="flex-1 bg-neutral-950 h-full overflow-auto">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
              📚 Moonglade CMS Documentation
            </h1>
            <p className="text-lg text-neutral-400 font-medium">
              Complete guide to using and customizing your Moonglade CMS installation.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20">
                Version 3.0.0
              </span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                Updated Sep 2025
              </span>
            </div>
          </div>

          {/* Table of Contents */}
          <TableOfContents items={tocItems} />

          {/* Getting Started Section */}
          <section id="getting-started" className="mb-12">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                🚀
              </span>
              Getting Started
            </h2>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-6">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                Welcome to Moonglade CMS! This documentation will help you get up and running quickly with your new content management system.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Moonglade is a modern, lightweight CMS built with performance and ease of use in mind. Whether you're a developer or content creator, this guide has everything you need.
              </p>
            </div>

            <div id="installation" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Installation</h3>
              
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-4">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  Follow these steps to install Moonglade CMS on your server:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li>Download the latest release from GitHub</li>
                  <li>Extract the files to your web server</li>
                  <li>Configure your database connection</li>
                  <li>Run the installation script</li>
                </ol>
              </div>

              <CodeBlock language="bash" title="Download and Extract">
{`# Download the latest release
wget https://github.com/februu/moonglade-cms/releases/latest/download/moonglade-cms.zip

# Extract to your web directory
unzip moonglade-cms.zip -d /var/www/html/

# Set proper permissions
chmod -R 755 /var/www/html/moonglade-cms/`}
              </CodeBlock>
            </div>

            <div id="configuration" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Configuration</h3>
              
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-4">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  Configure your CMS by editing the configuration file:
                </p>
              </div>

              <CodeBlock language="json" title="config.json">
{`{
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "moonglade_cms",
    "username": "your_username",
    "password": "your_password"
  },
  "site": {
    "title": "My Awesome Site",
    "description": "A modern CMS powered by Moonglade",
    "url": "https://yoursite.com"
  },
  "features": {
    "comments": true,
    "analytics": true,
    "caching": true
  }
}`}
              </CodeBlock>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="mb-12">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                ✏️
              </span>
              Basic Usage
            </h2>

            <div id="creating-posts" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Creating Posts</h3>
              
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-4">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  Creating content in Moonglade CMS is straightforward. You can use the built-in editor or work with markdown files directly.
                </p>
              </div>

              <CodeBlock language="javascript" title="Creating a Post via API">
{`// Create a new post
const createPost = async (postData) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${authToken}\`
    },
    body: JSON.stringify({
      title: postData.title,
      content: postData.content,
      slug: postData.slug,
      status: 'published',
      tags: postData.tags,
      publishedAt: new Date().toISOString()
    })
  });
  
  return response.json();
};`}
              </CodeBlock>
            </div>

            <div id="managing-media" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Managing Media</h3>
              
              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-6 mb-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Pro Tip</h4>
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      Always optimize your images before uploading to improve site performance. Recommended formats: WebP, JPEG, PNG.
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock language="typescript" title="Upload Media File">
{`interface MediaUpload {
  file: File;
  alt?: string;
  caption?: string;
}

const uploadMedia = async (upload: MediaUpload): Promise<MediaResponse> => {
  const formData = new FormData();
  formData.append('file', upload.file);
  formData.append('alt', upload.alt || '');
  formData.append('caption', upload.caption || '');

  const response = await fetch('/api/media/upload', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${getAuthToken()}\`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
};`}
              </CodeBlock>
            </div>
          </section>

          {/* API Reference Section */}
          <section id="api-reference" className="mb-12">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                🔧
              </span>
              API Reference
            </h2>

            <div id="authentication" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Authentication</h3>
              
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-4">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  All API requests require authentication using Bearer tokens. Include the token in the Authorization header.
                </p>
              </div>

              <CodeBlock language="http" title="Authentication Header">
{`POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your_password"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}`}
              </CodeBlock>
            </div>

            <div id="endpoints" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Endpoints</h3>
              
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Endpoint</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-600 dark:text-green-400">GET</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900 dark:text-neutral-100">/api/posts</td>
                        <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">Retrieve all posts</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600 dark:text-blue-400">POST</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900 dark:text-neutral-100">/api/posts</td>
                        <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">Create a new post</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-yellow-600 dark:text-yellow-400">PUT</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900 dark:text-neutral-100">/api/posts/:id</td>
                        <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">Update an existing post</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-red-600 dark:text-red-400">DELETE</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-900 dark:text-neutral-100">/api/posts/:id</td>
                        <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">Delete a post</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="mb-12">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                🔧
              </span>
              Troubleshooting
            </h2>

            <div id="common-issues" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Common Issues</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6">
                  <h4 className="font-semibold text-red-900 dark:text-red-300 mb-2">Database Connection Error</h4>
                  <p className="text-red-800 dark:text-red-300 text-sm mb-3">
                    If you're experiencing database connection issues, check your configuration and ensure the database server is running.
                  </p>
                  <CodeBlock language="bash" title="Check Database Status">
{`# Check if PostgreSQL is running
sudo systemctl status postgresql

# Restart PostgreSQL if needed
sudo systemctl restart postgresql

# Test connection
psql -h localhost -U your_username -d moonglade_cms`}
                  </CodeBlock>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl p-6">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Performance Issues</h4>
                  <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                    For slow loading times, enable caching and optimize your database queries.
                  </p>
                </div>
              </div>
            </div>

            <div id="support" className="mb-8">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">Support</h3>
              
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  Need help? Here are the best ways to get support:
                </p>
                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>GitHub Issues: Report bugs and feature requests</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Discord Community: Chat with other users</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Documentation: Check this guide first</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-neutral-800">
            <p className="text-neutral-500 text-sm">
              Made with ❤️ by februu • Last updated September 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;