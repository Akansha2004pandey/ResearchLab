import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  adminMe,
  clearAdminToken,
  createAdminResource,
  deleteAdminResource,
  getAdminToken,
  listAdminResource,
  type AdminResource,
  uploadAdminImage,
  updateAdminResource,
} from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

const RESOURCE_CONFIG: Array<{ key: AdminResource; label: string; description: string }> = [
  { key: 'people', label: 'People', description: 'Faculty, students, staff profiles' },
  { key: 'research_areas', label: 'Research', description: 'Research cards and details' },
  { key: 'publications', label: 'Publications', description: 'Papers, patents, and records' },
  { key: 'grants', label: 'Grants', description: 'Funding opportunities and grants' },
  { key: 'events', label: 'Lab Timeline', description: 'Events with event-specific photo galleries' },
  { key: 'news', label: 'News', description: 'News and announcements' },
  { key: 'contact_messages', label: 'Contact Messages', description: 'Messages from contact form' },
];

const ARRAY_KEYS = new Set([
  'authors',
  'research_interests',
  'co_pis',
  'contributions',
  'related_publication_ids',
  'images',
]);

const BOOLEAN_KEYS = new Set(['featured']);

const READONLY_KEYS = new Set(['created_at', 'updated_at']);
const IMAGE_FIELDS = new Set(['image', 'src', 'poster_image', 'agency_logo']);

const DEFAULT_TEMPLATES: Record<AdminResource, Record<string, unknown>> = {
  people: {
    id: '',
    name: '',
    role: '',
    category: 'faculty',
    image: '',
    bio: '',
    research_interests: [],
    email: '',
    google_scholar: '',
    linkedin: '',
    website: '',
    year_joined: '',
    year_left: '',
    image_class_name: '',
    display_order: 0,
  },
  research_areas: {
    id: '',
    title: '',
    short_description: '',
    full_description: '',
    methodology: '',
    contributions: [],
    related_publication_ids: [],
    icon: 'Block',
    image: '',
    display_order: 0,
  },
  publications: {
    id: '',
    title: '',
    authors: [],
    venue: '',
    year: '',
    type: 'journal',
    abstract: '',
    pdf_url: '',
    doi_url: '',
    code_url: '',
    bibtex: '',
    featured: false,
    display_order: 0,
  },
  grants: {
    id: '',
    title: '',
    agency: '',
    agency_logo: '',
    amount: '',
    start_date: '',
    end_date: '',
    pi: '',
    co_pis: [],
    description: '',
    status: 'ongoing',
    display_order: 0,
  },
  events: {
    id: '',
    title: '',
    type: 'workshop',
    date: '',
    end_date: '',
    time: '',
    venue: '',
    description: '',
    full_description: '',
    speaker: '',
    speaker_affiliation: '',
    poster_image: '',
    images: [],
    registration_url: '',
    status: 'upcoming',
    display_order: 0,
  },
  news: {
    id: '',
    title: '',
    date: '',
    category: 'general',
    description: '',
    image: '',
    link: '',
    display_order: 0,
  },
  contact_messages: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
};

const FIELD_LABELS: Record<string, string> = {
  id: 'Block ID',
  name: 'Name',
  role: 'Role',
  category: 'Category',
  image: 'Image URL',
  bio: 'Biography',
  research_interests: 'Research Interests (comma separated)',
  email: 'Email',
  google_scholar: 'Google Scholar URL',
  linkedin: 'LinkedIn URL',
  website: 'Website URL',
  year_joined: 'Year Joined',
  year_left: 'Year Left',
  image_class_name: 'Image Class Name',
  display_order: 'Display Order',
  title: 'Title',
  short_description: 'Short Description',
  full_description: 'Full Description',
  methodology: 'Methodology',
  contributions: 'Contributions (comma separated)',
  related_publication_ids: 'Related Publication IDs (comma separated)',
  icon: 'Icon Name',
  authors: 'Authors (comma separated)',
  venue: 'Venue',
  year: 'Year',
  type: 'Type',
  abstract: 'Abstract',
  pdf_url: 'PDF URL',
  doi_url: 'DOI URL',
  code_url: 'Code URL',
  bibtex: 'BibTeX',
  featured: 'Featured (true/false)',
  agency: 'Agency',
  agency_logo: 'Agency Logo URL',
  amount: 'Amount',
  start_date: 'Start Date',
  end_date: 'End Date',
  pi: 'Principal Investigator',
  co_pis: 'Co-PIs (comma separated)',
  description: 'Description',
  status: 'Status',
  date: 'Date',
  end_date_event: 'End Date',
  time: 'Time',
  venue_event: 'Venue',
  full_description_event: 'Full Description',
  speaker: 'Speaker',
  speaker_affiliation: 'Speaker Affiliation',
  poster_image: 'Poster Image URL',
  images: 'Event Images (comma separated URLs)',
  registration_url: 'Registration URL',
  subject: 'Subject',
  message: 'Message',
};

function toFieldString(value: unknown) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
}

function summarizeItem(item: Record<string, unknown>) {
  return (
    (typeof item.title === 'string' && item.title) ||
    (typeof item.name === 'string' && item.name) ||
    (typeof item.subject === 'string' && item.subject) ||
    (typeof item.id === 'string' && item.id) ||
    'Untitled'
  );
}

function subtitleItem(item: Record<string, unknown>) {
  return (
    (typeof item.date === 'string' && item.date) ||
    (typeof item.category === 'string' && item.category) ||
    (typeof item.type === 'string' && item.type) ||
    (typeof item.email === 'string' && item.email) ||
    ''
  );
}

function previewImage(item: Record<string, unknown>) {
  const timelineImages = Array.isArray(item.images)
    ? (item.images.find((value) => typeof value === 'string' && value.trim()) as string | undefined)
    : undefined;

  const imageValue =
    timelineImages ||
    (typeof item.image === 'string' && item.image) ||
    (typeof item.src === 'string' && item.src) ||
    (typeof item.poster_image === 'string' && item.poster_image) ||
    (typeof item.agency_logo === 'string' && item.agency_logo) ||
    (typeof item.image_url === 'string' && item.image_url);

  return imageValue || null;
}

function previewText(resource: AdminResource, item: Record<string, unknown>) {
  if (resource === 'people') {
    return `${item.role ?? ''} ${item.category ? `• ${item.category}` : ''}`.trim();
  }
  if (resource === 'publications') {
    return `${item.venue ?? ''} ${item.year ? `• ${item.year}` : ''}`.trim();
  }
  if (resource === 'events') {
    return `${item.date ?? ''} ${item.venue ? `• ${item.venue}` : ''}`.trim();
  }
  if (resource === 'grants') {
    return `${item.agency ?? ''} ${item.amount ? `• ${item.amount}` : ''}`.trim();
  }
  return subtitleItem(item);
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [activeResource, setActiveResource] = useState<AdminResource>('people');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const token = getAdminToken();

  const meQuery = useQuery({
    queryKey: ['admin-me'],
    queryFn: adminMe,
    enabled: Boolean(token),
    retry: false,
  });

  const resourceQuery = useQuery({
    queryKey: ['admin-resource', activeResource],
    queryFn: () => listAdminResource(activeResource),
    enabled: Boolean(token),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const base = resourceQuery.data?.find((row) => String(row.id) === editingId) ?? DEFAULT_TEMPLATES[activeResource];
      const payload: Record<string, unknown> = {};

      for (const [key, rawValue] of Object.entries(form)) {
        if (READONLY_KEYS.has(key)) continue;

        const templateValue = (base as Record<string, unknown>)[key];
        const trimmed = rawValue.trim();

        if (ARRAY_KEYS.has(key) || Array.isArray(templateValue)) {
          payload[key] = trimmed ? trimmed.split(',').map((v) => v.trim()).filter(Boolean) : [];
          continue;
        }

        if (BOOLEAN_KEYS.has(key) || typeof templateValue === 'boolean') {
          payload[key] = trimmed === 'true';
          continue;
        }

        if (typeof templateValue === 'number' || /(^year_|_order$|^display_order$|^year$)/.test(key)) {
          payload[key] = trimmed === '' ? null : Number(trimmed);
          continue;
        }

        payload[key] = trimmed === '' ? null : trimmed;
      }

      if (editingId) {
        return updateAdminResource(activeResource, editingId, payload);
      }
      return createAdminResource(activeResource, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-resource', activeResource] });
      setIsEditorOpen(false);
      setEditingId(null);
      toast({ title: 'Saved', description: 'Item has been updated successfully.' });
    },
    onError: (error) => {
      toast({
        title: 'Save failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteAdminResource(activeResource, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-resource', activeResource] });
      toast({ title: 'Deleted', description: 'Item deleted successfully.' });
    },
    onError: (error) => {
      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  const imageUploadMutation = useMutation({
    mutationFn: async ({ field, file }: { field: string; file: File }) => {
      setUploadingField(field);
      const uploaded = await uploadAdminImage(file);
      return { field, uploaded };
    },
    onSuccess: ({ field, uploaded }) => {
      setForm((prev) => ({ ...prev, [field]: uploaded.url }));
      toast({ title: 'Image uploaded', description: 'File uploaded and linked to this block.' });
    },
    onError: (error) => {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Could not upload image',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setUploadingField(null);
    },
  });

  const editorFields = useMemo(() => {
    const existing = editingId
      ? resourceQuery.data?.find((row) => String(row.id) === editingId)
      : undefined;

    if (existing) {
      return Object.keys(existing as Record<string, unknown>).filter((key) => !READONLY_KEYS.has(key));
    }

    return Object.keys(DEFAULT_TEMPLATES[activeResource]).filter((key) => !READONLY_KEYS.has(key));
  }, [activeResource, editingId, resourceQuery.data]);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (meQuery.isError) {
    clearAdminToken();
    return <Navigate to="/admin/login" replace />;
  }

  const startCreate = () => {
    const initial = Object.fromEntries(
      Object.entries(DEFAULT_TEMPLATES[activeResource]).map(([key, value]) => [key, toFieldString(value)]),
    );
    setEditingId(null);
    setForm(initial);
    setIsEditorOpen(true);
  };

  const startEdit = (item: Record<string, unknown>) => {
    const values = Object.fromEntries(
      Object.entries(item)
        .filter(([key]) => !READONLY_KEYS.has(key))
        .map(([key, value]) => [key, toFieldString(value)]),
    );

    setEditingId(String(item.id));
    setForm(values);
    setIsEditorOpen(true);
  };

  const logout = () => {
    clearAdminToken();
    navigate('/admin/login');
  };

  return (
    <main className="hero-gradient min-h-screen">
      <header className="border-b border-border/80 bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold">AI Lab Admin</h1>
            <p className="text-xs text-muted-foreground">Manage site content without code edits</p>
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Button variant="outline" className="rounded-none" onClick={() => navigate('/')}>View Site</Button>
            <Button variant="destructive" className="rounded-none" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8 grid lg:grid-cols-[280px_1fr] gap-6">
        <Card className="exp-card rounded-none">
          <CardHeader>
            <CardTitle className="text-base">Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-sm text-muted-foreground mb-3">
              {meQuery.data?.name} ({meQuery.data?.email})
            </p>
            {RESOURCE_CONFIG.map((resource) => (
              <button
                key={resource.key}
                type="button"
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeResource === resource.key
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveResource(resource.key)}
              >
                {resource.label}
              </button>
            ))}
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                {RESOURCE_CONFIG.find((r) => r.key === activeResource)?.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                {RESOURCE_CONFIG.find((r) => r.key === activeResource)?.description}
              </p>
            </div>
            {activeResource !== 'contact_messages' && <Button className="rounded-none" onClick={startCreate}>Add Block</Button>}
          </div>

          {resourceQuery.isLoading && <p className="text-muted-foreground">Loading data...</p>}

          {resourceQuery.data && resourceQuery.data.length === 0 && (
            <Card className="exp-card rounded-none">
              <CardContent className="py-10 text-center text-muted-foreground">No items yet.</CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {(resourceQuery.data ?? []).map((item) => (
              <Card key={String(item.id ?? item.created_at)} className="exp-card rounded-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{summarizeItem(item)}</CardTitle>
                  {previewText(activeResource, item) && (
                    <p className="text-xs text-muted-foreground">{previewText(activeResource, item)}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {previewImage(item) && (
                    <img
                      src={String(previewImage(item))}
                      alt={String(item.alt ?? item.title ?? item.name ?? 'block image')}
                      className="w-full h-36 object-cover rounded-md border border-border"
                    />
                  )}
                  <div className="text-sm text-muted-foreground line-clamp-3">
                    {String(item.description ?? item.short_description ?? item.bio ?? item.caption ?? item.message ?? '')}
                  </div>
                  <div className="flex gap-2">
                    {activeResource !== 'contact_messages' && (
                      <Button variant="outline" size="sm" className="rounded-none" onClick={() => startEdit(item)}>
                        Edit Block
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-none"
                      onClick={() => {
                        if (!item.id) return;
                        const ok = window.confirm('Delete this content block permanently?');
                        if (ok) deleteMutation.mutate(String(item.id));
                      }}
                    >
                      Delete Block
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto brutal-border">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Content Block' : 'Create Content Block'}</DialogTitle>
            <DialogDescription>
              Fill the form to manage this block. For list fields, use comma-separated values.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {editorFields.map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>{FIELD_LABELS[field] ?? field.replace(/_/g, ' ')}</Label>
                {IMAGE_FIELDS.has(field) ? (
                  <div className="space-y-3">
                    {form[field] ? (
                      <img
                        src={form[field]}
                        alt={`${field} preview`}
                        className="w-full h-40 object-cover rounded-md border border-border"
                      />
                    ) : (
                      <div className="h-24 rounded-md border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
                        No image selected
                      </div>
                    )}
                      <Input
                      id={`${field}-upload`}
                        className="rounded-none"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        imageUploadMutation.mutate({ field, file });
                      }}
                      disabled={imageUploadMutation.isPending}
                    />
                    <p className="text-xs text-muted-foreground">
                      {uploadingField === field ? 'Uploading image...' : 'Select an image file to upload.'}
                    </p>
                  </div>
                ) : field.includes('description') || field === 'bio' || field === 'abstract' || field === 'message' ? (
                  <Textarea
                    id={field}
                    rows={4}
                    className="rounded-none"
                    value={form[field] ?? ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                  />
                ) : (
                  <Input
                    id={field}
                    className="rounded-none"
                    value={form[field] ?? ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" className="rounded-none" onClick={() => setIsEditorOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-none" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
