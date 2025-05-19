import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Select from '../components/ui/Select';
import { ChevronUp, ChevronDown, DollarSign, Users, Calendar, Star, Activity } from 'lucide-react';

// Types for analytics data
interface AnalyticsSummary {
  revenue: {
    total: string;
    change: number;
    trend: 'up' | 'down';
  };
  patients: {
    total: number;
    change: number;
    trend: 'up' | 'down';
  };
  appointments: {
    total: number;
    change: number;
    trend: 'up' | 'down';
  };
  rating: {
    average: number;
    change: number;
    trend: 'up' | 'down';
  };
}

interface RevenueData {
  labels: string[];
  data: number[];
}

interface TopProvider {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  completedServices: number;
  revenue: string;
  rating: number;
}

interface ServiceAnalytics {
  name: string;
  requests: number;
  growth: number;
  revenue: string;
}

// Mock data
const summary: AnalyticsSummary = {
  revenue: {
    total: '$12,450',
    change: 12.5,
    trend: 'up'
  },
  patients: {
    total: 156,
    change: 8.2,
    trend: 'up'
  },
  appointments: {
    total: 237,
    change: 15.3,
    trend: 'up'
  },
  rating: {
    average: 4.8,
    change: 0.2,
    trend: 'up'
  }
};

const revenueData: RevenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [1200, 1900, 1500, 2100, 2400, 3200]
};

const topProviders: TopProvider[] = [
  {
    id: '1',
    name: 'Sara Ali',
    specialty: 'General Care',
    completedServices: 78,
    revenue: '$4,560',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Omar Khaled',
    specialty: 'Wound Care',
    completedServices: 65,
    revenue: '$3,850',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Layla Mohamed',
    specialty: 'Elderly Care',
    completedServices: 52,
    revenue: '$3,120',
    rating: 4.7
  }
];

const popularServices: ServiceAnalytics[] = [
  {
    name: 'Blood Pressure Monitoring',
    requests: 48,
    growth: 15,
    revenue: '$2,160'
  },
  {
    name: 'Medication Administration',
    requests: 42,
    growth: 10,
    revenue: '$2,520'
  },
  {
    name: 'Elderly Care',
    requests: 35,
    growth: 25,
    revenue: '$2,975'
  },
  {
    name: 'Wound Care',
    requests: 28,
    growth: 5,
    revenue: '$2,100'
  },
  {
    name: 'Physical Therapy',
    requests: 22,
    growth: 18,
    revenue: '$1,980'
  }
];

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('month');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('sidebar.analytics')}
        </h1>
        
        <div className="flex items-center space-x-3">
          <Select
            options={[
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'quarter', label: 'This Quarter' },
              { value: 'year', label: 'This Year' },
            ]}
            value={timeRange}
            onChange={setTimeRange}
          />
          
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Revenue"
          value={summary.revenue.total}
          change={summary.revenue.change}
          trend={summary.revenue.trend}
          icon={<DollarSign size={20} />}
          color="blue"
        />
        
        <SummaryCard
          title="Total Patients"
          value={summary.patients.total.toString()}
          change={summary.patients.change}
          trend={summary.patients.trend}
          icon={<Users size={20} />}
          color="teal"
        />
        
        <SummaryCard
          title="Total Appointments"
          value={summary.appointments.total.toString()}
          change={summary.appointments.change}
          trend={summary.appointments.trend}
          icon={<Calendar size={20} />}
          color="indigo"
        />
        
        <SummaryCard
          title="Average Rating"
          value={summary.rating.average.toString()}
          change={summary.rating.change}
          trend={summary.rating.trend}
          icon={<Star size={20} />}
          color="amber"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card>
          <Card.Header>
            <Card.Title>Revenue</Card.Title>
            <Card.Description>Monthly revenue overview</Card.Description>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="h-80 relative">
              {/* Simplified chart for visualization - in a real app, use a chart library */}
              <div className="absolute inset-0">
                <div className="flex h-full items-end">
                  {revenueData.data.map((value, index) => (
                    <div
                      key={index}
                      className="flex-1 mx-1 bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-t"
                      style={{
                        height: `${(value / Math.max(...revenueData.data)) * 85}%`,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="absolute bottom-0 w-full flex justify-between px-1">
                  {revenueData.labels.map((label, index) => (
                    <div key={index} className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
        
        {/* Service Distribution Chart */}
        <Card>
          <Card.Header>
            <Card.Title>Service Distribution</Card.Title>
            <Card.Description>Most requested services</Card.Description>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="space-y-6">
              {popularServices.map((service, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {service.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {service.requests} requests
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-2.5 bg-blue-600 dark:bg-blue-500 rounded-full" 
                      style={{ width: `${(service.requests / popularServices[0].requests) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center">
                      <span className={`text-xs ${service.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {service.growth > 0 ? '+' : ''}{service.growth}%
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {service.revenue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
      
      {/* Top Providers */}
      <Card className="mb-8">
        <Card.Header>
          <Card.Title>Top Healthcare Providers</Card.Title>
          <Card.Description>Based on completed appointments and ratings</Card.Description>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="text-left whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="text-left whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="text-left whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="text-left whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProviders.map((provider) => (
                  <tr 
                    key={provider.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                          {provider.avatar ? (
                            <img src={provider.avatar} alt={provider.name} className="h-10 w-10 rounded-full" />
                          ) : (
                            provider.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {provider.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {provider.specialty}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {provider.completedServices}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {provider.revenue}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm text-gray-900 dark:text-white">
                          {provider.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <div>
              <Card.Title>Recent Activity</Card.Title>
              <Card.Description>System events and user actions</Card.Description>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            <ActivityItem
              title="New User Registration"
              description="Nour Hassan registered as a patient."
              time="2 hours ago"
              icon={<Users size={16} />}
              iconColor="blue"
            />
            <ActivityItem
              title="Appointment Completed"
              description="Sara Ali completed an appointment with Ahmed Hassan."
              time="3 hours ago"
              icon={<Calendar size={16} />}
              iconColor="green"
            />
            <ActivityItem
              title="New Review"
              description="Fatima Omar left a 5-star review for Layla Mohamed."
              time="5 hours ago"
              icon={<Star size={16} />}
              iconColor="yellow"
            />
            <ActivityItem
              title="New Service Request"
              description="Ali Mahmoud requested Wound Care service."
              time="8 hours ago"
              icon={<Activity size={16} />}
              iconColor="purple"
            />
            <ActivityItem
              title="Payment Received"
              description="Payment of $75 received from Khaled Ibrahim."
              time="10 hours ago"
              icon={<DollarSign size={16} />}
              iconColor="emerald"
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'teal' | 'indigo' | 'amber';
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  color
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </h3>
          </div>
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend === 'up' ? <ChevronUp size={16} className="inline" /> : <ChevronDown size={16} className="inline" />}
            {change}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            from last period
          </span>
        </div>
      </div>
    </Card>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconColor: 'blue' | 'green' | 'yellow' | 'purple' | 'emerald';
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  time,
  icon,
  iconColor
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <div className="px-6 py-4 flex items-start">
      <div className={`p-2 rounded-full ${colorClasses[iconColor]} mr-4`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {description}
        </p>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
        {time}
      </div>
    </div>
  );
};

export default Analytics;