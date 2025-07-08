// client/src/services/api.ts
const API_BASE_URL = 'http://localhost:5000/api';

export interface TaskAPI {
  _id: string;
  title: string;
  start?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  start?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  start?: string;
  completed?: boolean;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Get all tasks
  async getTasks(): Promise<TaskAPI[]> {
    return this.request<TaskAPI[]>('/tasks');
  }

  // Create a new task
  async createTask(task: CreateTaskRequest): Promise<TaskAPI> {
    return this.request<TaskAPI>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  // Update a task
  async updateTask(id: string, updates: UpdateTaskRequest): Promise<TaskAPI> {
    return this.request<TaskAPI>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete a task
  async deleteTask(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request<{ status: string; message: string }>('/health');
  }
}

export const apiService = new ApiService();