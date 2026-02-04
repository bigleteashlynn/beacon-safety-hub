import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Users as UsersIcon, Shield, UserCog } from 'lucide-react';
import type { User } from '@/types';

// Mock users
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@beacon.gov',
    displayName: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    email: 'dispatcher@beacon.gov',
    displayName: 'Jane Dispatcher',
    role: 'dispatcher',
    createdAt: new Date('2024-02-15'),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '3',
    email: 'supervisor@beacon.gov',
    displayName: 'John Supervisor',
    role: 'supervisor',
    createdAt: new Date('2024-01-20'),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

const roleConfig = {
  admin: { label: 'Admin', icon: Shield, color: 'bg-destructive text-destructive-foreground' },
  supervisor: { label: 'Supervisor', icon: UserCog, color: 'bg-primary text-primary-foreground' },
  dispatcher: { label: 'Dispatcher', icon: UsersIcon, color: 'bg-info text-info-foreground' },
};

export default function Users() {
  return (
    <DashboardLayout
      title="Users"
      subtitle="Manage admin and dispatcher accounts"
    >
      {/* Search & Actions */}
      <Card className="mb-6">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => {
                const RoleIcon = roleConfig[user.role].icon;
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>
                            {user.displayName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.displayName}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={roleConfig[user.role].color}>
                        <RoleIcon className="mr-1 h-3 w-3" />
                        {roleConfig[user.role].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-success text-success">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastLoginAt?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
