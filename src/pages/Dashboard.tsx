import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout';
import { StatsCard, RecentIncidents, LiveSOSFeed } from '@/components/dashboard';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useIncidents } from '@/hooks/useIncidents';
import { useSOS } from '@/hooks/useSOS';
import { 
  AlertTriangle, 
  Radio, 
  CheckCircle2, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats, isLoading: statsLoading } = useDashboardStats();
  const { incidents } = useIncidents();
  const { sosAlerts, acknowledgeAlert } = useSOS();

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Real-time overview of public safety operations"
    >
      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Incidents"
          value={stats.activeIncidents}
          icon={AlertTriangle}
          variant="warning"
          description="Requiring attention"
        />
        <StatsCard
          title="Active SOS"
          value={stats.activeSOS}
          icon={Radio}
          variant="destructive"
          description="Real-time emergencies"
        />
        <StatsCard
          title="Resolved Today"
          value={stats.resolvedToday}
          icon={CheckCircle2}
          variant="success"
          trend={{ value: 12, isPositive: true }}
          description="vs yesterday"
        />
        <StatsCard
          title="Avg Response Time"
          value={`${stats.averageResponseTime} min`}
          icon={Clock}
          variant="info"
          trend={{ value: 8, isPositive: true }}
          description="improvement"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live SOS Feed */}
        <LiveSOSFeed
          alerts={sosAlerts}
          onAcknowledge={(id) => acknowledgeAlert(id, 'admin-1')}
          onViewDetails={(id) => navigate(`/sos/${id}`)}
        />

        {/* Recent Incidents */}
        <RecentIncidents
          incidents={incidents}
          onViewAll={() => navigate('/incidents')}
          onViewIncident={(id) => navigate(`/incidents/${id}`)}
        />
      </div>
    </DashboardLayout>
  );
}
