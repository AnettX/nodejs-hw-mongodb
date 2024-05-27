import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

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

  dotenv.config();
  const PORT = Number(env('PORT', '3000'));

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: `Contact with id ${contactId} not found`,
      });
    }

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
