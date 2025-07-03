// Enhanced types for the DevDash application

export type Task = {
  id: number;
  title: string;
  completed?: boolean;
  date?: string;
  start?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  description?: string;
  estimatedTime?: number; // in minutes
  createdAt?: string;
  updatedAt?: string;
}

export interface SpotifyArtist {
  name: string;
  id: string;
  external_urls?: {
    spotify: string;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  artists: SpotifyArtist[];
  album?: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  duration_ms?: number;
  external_urls?: {
    spotify: string;
  };
  preview_url?: string;
}

export interface SpotifyPlaybackState {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack | null;
  device: {
    id: string;
    is_active: boolean;
    name: string;
    type: string;
    volume_percent: number;
  };
}

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  humidity?: number;
  pressure?: number;
  visibility?: number;
  uv_index?: number;
}

export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance_rate: number;
  tags: string[];
  url: string;
  is_premium?: boolean;
}

export interface LeetCodeStats {
  total_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  acceptance_rate: number;
  ranking: number;
  contribution_points: number;
  reputation: number;
}

export interface QuickLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  category?: string;
  color?: string;
  description?: string;
}

export interface DashboardStats {
  tasks: {
    total: number;
    completed: number;
    pending: number;
    scheduled: number;
    overdue: number;
  };
  productivity: {
    daily_goal: number;
    completed_today: number;
    streak: number;
    average_completion_time: number;
  };
  coding: {
    leetcode_streak: number;
    problems_solved: number;
    commits_today: number;
    lines_of_code: number;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  dashboard: {
    widgets: string[];
    layout: string;
    refresh_interval: number;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  description?: string;
  location?: string;
  attendees?: string[];
  calendar_type?: 'task' | 'meeting' | 'reminder' | 'personal';
  priority?: 'low' | 'medium' | 'high';
  color?: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  private: boolean;
}

export interface GitHubActivity {
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    action?: string;
    number?: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  action_url?: string;
  action_text?: string;
}

export interface WidgetConfig {
  id: string;
  type: 'weather' | 'spotify' | 'leetcode' | 'github' | 'calendar' | 'tasks' | 'stats' | 'links';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  settings: Record<string, unknown>;
  enabled: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface TaskFormData {
  title: string;
  description?: string;
  priority?: Task['priority'];
  tags?: string[];
  start?: string;
  estimatedTime?: number;
}

export interface SettingsFormData extends UserPreferences {
  profile?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

// Hook types
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Component prop types
export interface BaseWidgetProps {
  className?: string;
  onEdit?: () => void;
  onRemove?: () => void;
  isEditing?: boolean;
}

export interface DragDropResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  } | null;
  reason: 'DROP' | 'CANCEL';
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;