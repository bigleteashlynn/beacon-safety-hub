import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/config/constants';
import {
    LayoutDashboard,
    AlertTriangle,
    Radio,
    Map,
    Users,
    FileText,
    Settings,
    Shield,
    Activity,
    LogOut,
    Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const iconMap = {
    LayoutDashboard,
    AlertTriangle,
    Radio,
    Map,
    Users,
    FileText,
    Settings,
    Activity,
};

export function Sidebar() {
    const location = useLocation();

    return (
        <aside className="flex h-screen w-64 flex-col bg-[#0B1221] text-slate-300">
            {/* Logo/Brand */}
            <div className="flex h-16 items-center gap-3 px-6">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
                    <Shield className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-wider text-white">BEACON <span className="text-slate-400 font-light">OS</span></h1>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-0 py-4">
                <nav className="space-y-6">
                    {(NAV_ITEMS || []).map((group) => (
                        <div key={group.category || 'misc'} className="space-y-1">
                            {group.category && (
                                <h2 className="px-6 text-[10px] font-semibold tracking-[0.2em] text-slate-500 mb-2">
                                    {group.category}
                                </h2>
                            )}
                            <div className="space-y-[2px]">
                                {(group.items || []).map((item) => {
                                    const Icon = iconMap[item.icon] || Shield;
                                    const isActive = location.pathname === item.path;

                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={cn(
                                                'relative flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-all group',
                                                isActive
                                                    ? 'bg-blue-600/10 text-white'
                                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                            )}
                                        >
                                            {isActive && (
                                                <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-500" />
                                            )}
                                            {Icon && <Icon className={cn("h-4 w-4", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-400")} />}
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            {/* User Profile / Logout */}
            <div className="mt-auto p-4 border-t border-slate-800 bg-[#080E1A]">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-800 text-xs font-bold text-slate-300">
                        OP
                    </div>
                    <div className="flex-1 overflow-hidden text-xs">
                        <p className="font-bold text-slate-200">Operator 42</p>
                        <p className="text-slate-500">Shift A - Command</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

