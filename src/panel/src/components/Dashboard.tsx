import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  gradient 
}) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 ${gradient} rounded-lg flex items-center justify-center shadow-sm`}>
              {icon}
            </div>
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-tight">
              {title}
            </h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {value}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              {subtitle}
            </p>
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${
            trend.isPositive 
              ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
          }`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={trend.isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
            </svg>
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dashboardData = [
    {
      title: 'Page Views',
      value: '24,531',
      subtitle: 'Total views this month',
      trend: { value: '+12.5%', isPositive: true },
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: 'Storage Usage',
      value: '2.4 GB',
      subtitle: 'of 10 GB available',
      trend: { value: '+256 MB', isPositive: false },
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'CMS Version',
      value: '3.0.0',
      subtitle: 'Latest version available',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex-1 bg-neutral-950 h-full overflow-auto">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Dashboard
            </h1>
            <p className="text-neutral-400 font-medium">
              Welcome back! Here's an overview of your CMS performance.
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {dashboardData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
              trend={card.trend}
              gradient={card.gradient}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white tracking-tight mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                label: 'New Post', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                ),
                color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-500/20'
              },
              { 
                label: 'Media Library', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-500/20'
              },
              { 
                label: 'Analytics', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
              },
              { 
                label: 'Backup', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                ),
                color: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-500/20'
              }
            ].map((action, index) => (
              <button
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${action.color}`}
              >
                {action.icon}
                <span className="font-medium text-sm tracking-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;