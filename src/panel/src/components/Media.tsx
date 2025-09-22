import React, { useState, useRef } from 'react';

interface MediaItem {
  id: number;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadDate: string;
  alt?: string;
}

interface UploadedFile {
  file: File;
  preview: string;
  uploading: boolean;
  progress: number;
}

const Media: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for existing media
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      name: 'hero-banner.jpg',
      url: 'https://picsum.photos/800/600?random=1',
      type: 'image',
      size: 245760,
      uploadDate: '2025-09-20',
      alt: 'Hero banner image'
    },
    {
      id: 2,
      name: 'product-showcase.png',
      url: 'https://picsum.photos/800/600?random=2',
      type: 'image',
      size: 512000,
      uploadDate: '2025-09-19',
      alt: 'Product showcase'
    },
    {
      id: 3,
      name: 'tutorial-video.mp4',
      url: '#',
      type: 'video',
      size: 15728640,
      uploadDate: '2025-09-18',
      alt: 'Tutorial video'
    },
    {
      id: 4,
      name: 'user-guide.pdf',
      url: '#',
      type: 'document',
      size: 1048576,
      uploadDate: '2025-09-17',
      alt: 'User guide document'
    },
    {
      id: 5,
      name: 'gallery-image-1.jpg',
      url: 'https://picsum.photos/800/600?random=3',
      type: 'image',
      size: 327680,
      uploadDate: '2025-09-16',
      alt: 'Gallery image'
    },
    {
      id: 6,
      name: 'logo-variations.png',
      url: 'https://picsum.photos/800/600?random=4',
      type: 'image',
      size: 163840,
      uploadDate: '2025-09-15',
      alt: 'Logo variations'
    }
  ]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : '';
      const newFile: UploadedFile = {
        file,
        preview,
        uploading: true,
        progress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.file === file 
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        ));
      }, 200);

      // Complete upload after 2 seconds
      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f => 
          f.file === file 
            ? { ...f, uploading: false, progress: 100 }
            : f
        ));
      }, 2000);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex-1 bg-neutral-950 h-full overflow-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Media Library
            </h1>
            <p className="text-neutral-400 font-medium">
              Upload, organize, and manage your media files.
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                  : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                    Upload Media Files
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Choose Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Supports: Images, Videos, Documents (PDF, DOC, DOCX)
                </p>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-3">
                {uploadedFiles.map((uploadFile, index) => (
                  <div key={index} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      {uploadFile.preview ? (
                        <img src={uploadFile.preview} alt="" className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                          {getFileIcon('document')}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                          {uploadFile.file.name}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {formatFileSize(uploadFile.file.size)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {uploadFile.uploading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                                style={{ width: `${uploadFile.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {uploadFile.progress}%
                            </span>
                          </div>
                        ) : (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search media files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-neutral-900 dark:text-white"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Type Filter */}
              <div className="flex space-x-2">
                {(['all', 'image', 'video', 'document'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200 capitalize ${
                      selectedType === type
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="aspect-square relative">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center">
                      <div className="text-neutral-600 dark:text-neutral-400">
                        {getFileIcon(item.type)}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900 dark:text-white truncate text-sm">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {formatFileSize(item.size)}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {new Date(item.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-1">
                No media found
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Media Details
                </h2>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {selectedMedia.type === 'image' ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.alt}
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-lg flex items-center justify-center">
                    <div className="text-neutral-600 dark:text-neutral-400">
                      {getFileIcon(selectedMedia.type)}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      File Name
                    </label>
                    <p className="text-neutral-900 dark:text-white">{selectedMedia.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      File Size
                    </label>
                    <p className="text-neutral-900 dark:text-white">{formatFileSize(selectedMedia.size)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Type
                    </label>
                    <p className="text-neutral-900 dark:text-white capitalize">{selectedMedia.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Upload Date
                    </label>
                    <p className="text-neutral-900 dark:text-white">
                      {new Date(selectedMedia.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    Copy URL
                  </button>
                  <button className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200">
                    Download
                  </button>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors duration-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;