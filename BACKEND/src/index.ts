import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import { contactRouter } from './routes/contact.js';
import { adminAuthRouter } from './routes/adminAuth.js';
import { adminCrudRouter } from './routes/adminCrud.js';
import { eventsRouter } from './routes/events.js';
import { galleryRouter } from './routes/gallery.js';
import { grantsRouter } from './routes/grants.js';
import { healthRouter } from './routes/health.js';
import { homeRouter } from './routes/home.js';
import { newsRouter } from './routes/news.js';
import { peopleRouter } from './routes/people.js';
import { publicationsRouter } from './routes/publications.js';
import { researchRouter } from './routes/research.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'ResearchLab backend API',
    version: '1.0.0',
  });
});

app.use('/api/health', healthRouter);
app.use('/api/home', homeRouter);
app.use('/api/people', peopleRouter);
app.use('/api/research', researchRouter);
app.use('/api/publications', publicationsRouter);
app.use('/api/grants', grantsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/news', newsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin', adminCrudRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${env.PORT}`);
});
