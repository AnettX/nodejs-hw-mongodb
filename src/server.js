import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts } from './services/contacts.js';

export const setupServer = async () => {
  const app = express();
  app.use(express.json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not found' });
    next();
  });

  dotenv.config();
  const PORT = Number(env('PORT', '3000'));

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status('200').json({
      data: contacts,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
