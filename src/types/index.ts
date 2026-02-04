// Core domain types for Beacon Public Safety System

// ============ User & Authentication ============
export type UserRole = 'admin' | 'dispatcher' | 'supervisor';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============ Incident Management ============
export type IncidentStatus = 'pending' | 'dispatched' | 'in_progress' | 'resolved' | 'closed';
export type IncidentPriority = 'low' | 'medium' | 'high' | 'critical';
export type IncidentCategory = 
  | 'medical_emergency' 
  | 'fire' 
  | 'crime' 
  | 'traffic_accident' 
  | 'natural_disaster' 
  | 'public_disturbance'
  | 'other';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  priority: IncidentPriority;
  status: IncidentStatus;
  location: GeoLocation;
  reporterId?: string;
  assignedTo?: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  notes?: IncidentNote[];
}

export interface IncidentNote {
  id: string;
  incidentId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

// ============ Real-time SOS (Firebase) ============
export type SOSStatus = 'active' | 'acknowledged' | 'responding' | 'resolved';

export interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  userPhone?: string;
  location: GeoLocation;
  status: SOSStatus;
  message?: string;
  timestamp: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

// ============ Safety Alerts ============
export type AlertType = 'warning' | 'danger' | 'info' | 'all_clear';
export type AlertScope = 'local' | 'regional' | 'national';

export interface SafetyAlert {
  id: string;
  title: string;
  message: string;
  type: AlertType;
  scope: AlertScope;
  affectedAreas: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
}

// ============ Dashboard Stats ============
export interface DashboardStats {
  activeIncidents: number;
  activeSOS: number;
  resolvedToday: number;
  averageResponseTime: number; // in minutes
  incidentsByCategory: Record<IncidentCategory, number>;
  incidentsByStatus: Record<IncidentStatus, number>;
}

// ============ API Response Types ============
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
