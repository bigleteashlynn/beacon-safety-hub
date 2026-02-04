import { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout';
import { ActiveSOSAlert, ActiveIncidentsList, IncidentDetailPanel } from '@/components/dashboard';
import { useIncidents } from '@/hooks/useIncidents';
import { useSOS } from '@/hooks/useSOS';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
    const { incidents = [] } = useIncidents();
    const { activeAlerts = [], acknowledgeAlert } = useSOS();
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [sosClosed, setSosClosed] = useState(false);

    // Transform incidents for the list
    const transformedIncidents = useMemo(() => {
        if (!Array.isArray(incidents)) return [];
        return incidents.map(inc => {
            try {
                const date = inc.createdAt ? new Date(inc.createdAt) : new Date();
                return {
                    ...inc,
                    timeAgo: formatDistanceToNow(date, { addSuffix: true }).replace('about ', ''),
                    categoryLabel: inc.title?.split(' - ')[1] || inc.title || 'Incident',
                    address: inc.location?.address || 'Location unavailable',
                    statusLabel: (inc.status || 'pending').charAt(0).toUpperCase() + (inc.status || 'pending').slice(1).replace('_', ' '),
                };
            } catch (err) {
                console.error('Error transforming incident:', inc, err);
                return {
                    ...inc,
                    timeAgo: 'recently',
                    categoryLabel: inc.title || 'Incident',
                    address: 'Location unavailable',
                    statusLabel: 'Pending'
                };
            }
        });
    }, [incidents]);

    // Handle initial selection in a useEffect, not useMemo
    useEffect(() => {
        if (!selectedIncident && transformedIncidents.length > 0) {
            setSelectedIncident(transformedIncidents[0]);
        }
    }, [transformedIncidents, selectedIncident]);

    const activeSOS = activeAlerts.length > 0 ? activeAlerts[0] : null;

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full w-full overflow-hidden">
                {/* Active SOS Alert Bar */}
                {activeSOS && !sosClosed && (
                    <ActiveSOSAlert
                        alert={{
                            ...activeSOS,
                            timestamp: activeSOS.timestamp ? formatDistanceToNow(new Date(activeSOS.timestamp), { addSuffix: true }).replace('about ', '') : '2m ago',
                            description: activeSOS.message || 'SOS Alert'
                        }}
                        onAcknowledge={(id) => acknowledgeAlert(id, 'admin-1')}
                        onDispatch={(id) => console.log('Dispatch SOS', id)}
                        onClose={() => setSosClosed(true)}
                    />
                )}

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden min-h-0">
                    {/* Left: Incidents List */}
                    <div className="w-[45%] lg:w-[40%] xl:w-[35%] h-full border-r overflow-hidden flex flex-col">
                        <ActiveIncidentsList
                            incidents={transformedIncidents}
                            selectedId={selectedIncident?.id}
                            onSelect={setSelectedIncident}
                        />
                    </div>

                    {/* Right: Incident Details */}
                    <div className="flex-1 h-full bg-slate-50/30 overflow-hidden flex flex-col">
                        <IncidentDetailPanel
                            incident={selectedIncident ? {
                                ...selectedIncident,
                                categoryLabel: selectedIncident.categoryLabel,
                                reportedBy: 'John Doe',
                                assignedUnit: 'Amb-01'
                            } : null}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}


