const BASE = (import.meta.env.VITE_API_BASE_URL as string) ?? 'http://localhost:4001/api';

export type AdminResource =
  | 'people'
  | 'research_areas'
  | 'publications'
  | 'grants'
  | 'events'
  | 'news'
  | 'contact_messages';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

export interface AdminAuthResponse {
  token: string;
  user: AdminUser;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

const TOKEN_KEY = 'ci_lab_admin_token';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, init?: RequestInit, includeAuth = false): Promise<T> {
  const isFormData = typeof FormData !== 'undefined' && init?.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string> | undefined),
  };

  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (includeAuth) {
    const token = getAdminToken();
    if (!token) {
      throw new Error('Missing admin token');
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers,
  });

  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok || !json.success) {
    throw new Error(json.error ?? json.message ?? `Request failed (${res.status})`);
  }

  return json.data;
}

export async function adminSignup(payload: {
  name: string;
  email: string;
  password: string;
  signupKey?: string;
}) {
  return request<AdminAuthResponse>('/admin/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function adminLogin(payload: { email: string; password: string }) {
  return request<AdminAuthResponse>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function adminMe() {
  return request<AdminUser>('/admin/auth/me', undefined, true);
}

export async function listAdminResource(resource: AdminResource) {
  return request<Record<string, unknown>[]>(`/admin/${resource}`, undefined, true);
}

export async function createAdminResource(resource: AdminResource, payload: Record<string, unknown>) {
  return request<Record<string, unknown>>(`/admin/${resource}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, true);
}

export async function updateAdminResource(resource: AdminResource, id: string, payload: Record<string, unknown>) {
  return request<Record<string, unknown>>(`/admin/${resource}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }, true);
}

export async function deleteAdminResource(resource: AdminResource, id: string) {
  return request<{ message: string }>(`/admin/${resource}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  }, true);
}

export async function uploadAdminImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return request<{ url: string; path: string }>(
    '/admin/upload-image',
    {
      method: 'POST',
      body: formData,
    },
    true,
  );
}
