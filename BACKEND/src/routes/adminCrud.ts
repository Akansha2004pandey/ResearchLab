import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';
import { ApiError } from '../middleware/error.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

const resourceParamSchema = z.enum([
  'people',
  'research_areas',
  'publications',
  'grants',
  'events',
  'news',
  'contact_messages',
]);

const payloadSchema = z.record(z.unknown());

const ORDERABLE_RESOURCES = new Set([
  'people',
  'research_areas',
  'publications',
  'grants',
  'events',
  'news',
]);

const TEXT_ID_RESOURCES = new Set([
  'people',
  'research_areas',
  'publications',
  'grants',
  'events',
  'news',
]);

function resourceFromParam(input: string) {
  const parsed = resourceParamSchema.safeParse(input);
  if (!parsed.success) {
    throw new ApiError(400, 'Unsupported resource');
  }
  return parsed.data;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 40);
}

function deriveId(resource: string, payload: Record<string, unknown>) {
  if (!TEXT_ID_RESOURCES.has(resource)) {
    return;
  }

  if (typeof payload.id === 'string' && payload.id.trim()) {
    return;
  }

  const source =
    (typeof payload.title === 'string' && payload.title) ||
    (typeof payload.name === 'string' && payload.name) ||
    resource;

  const stamp = Date.now().toString().slice(-6);
  payload.id = `${toSlug(source)}-${stamp}`;
}

export const adminCrudRouter = Router();

adminCrudRouter.use(requireAdminAuth);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
}

async function uploadToBucket(bucket: string, path: string, file: Express.Multer.File) {
  const { error } = await supabase.storage.from(bucket).upload(path, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (!error) return;

  if (!error.message.toLowerCase().includes('bucket') || !error.message.toLowerCase().includes('not found')) {
    throw new ApiError(500, `Failed to upload image: ${error.message}`);
  }

  const { error: createBucketError } = await supabase.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: 8 * 1024 * 1024,
  });

  if (createBucketError) {
    throw new ApiError(500, `Failed to create storage bucket: ${createBucketError.message}`);
  }

  const { error: retryError } = await supabase.storage.from(bucket).upload(path, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (retryError) {
    throw new ApiError(500, `Failed to upload image: ${retryError.message}`);
  }
}

adminCrudRouter.post('/upload-image', upload.single('file'), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      throw new ApiError(400, 'Image file is required');
    }

    const isImage = file.mimetype.startsWith('image/');
    if (!isImage) {
      throw new ApiError(400, 'Only image uploads are allowed');
    }

    const bucket = 'admin-assets';
    const extension = file.originalname.includes('.')
      ? file.originalname.slice(file.originalname.lastIndexOf('.'))
      : '.jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${sanitizeFileName(file.originalname.replace(extension, ''))}${extension}`;
    const path = `uploads/${fileName}`;

    await uploadToBucket(bucket, path, file);

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    res.json({
      success: true,
      data: {
        url: data.publicUrl,
        path,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminCrudRouter.get('/:resource', async (req, res, next) => {
  try {
    const resource = resourceFromParam(req.params.resource);
    const limit = parseLimit(req.query.limit as string | undefined, 500);

    let query = supabase.from(resource).select('*').limit(limit);

    if (ORDERABLE_RESOURCES.has(resource)) {
      query = query.order('display_order', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, `Failed to load ${resource}`);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

adminCrudRouter.post('/:resource', async (req, res, next) => {
  try {
    const resource = resourceFromParam(req.params.resource);
    const parsed = payloadSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Invalid payload');
    }

    const payload = { ...parsed.data };
    deriveId(resource, payload);

    const { data, error } = await supabase.from(resource).insert(payload).select('*').single();
    ensureNoSupabaseError(error, `Failed to create ${resource} item`);

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

adminCrudRouter.put('/:resource/:id', async (req, res, next) => {
  try {
    const resource = resourceFromParam(req.params.resource);
    const id = req.params.id;
    const parsed = payloadSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Invalid payload');
    }

    const payload = { ...parsed.data };
    delete payload.id;

    const { data, error } = await supabase
      .from(resource)
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();

    ensureNoSupabaseError(error, `Failed to update ${resource} item`);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

adminCrudRouter.delete('/:resource/:id', async (req, res, next) => {
  try {
    const resource = resourceFromParam(req.params.resource);
    const id = req.params.id;

    const { error } = await supabase.from(resource).delete().eq('id', id);
    ensureNoSupabaseError(error, `Failed to delete ${resource} item`);

    res.json({ success: true, message: `${resource} item deleted` });
  } catch (error) {
    next(error);
  }
});
