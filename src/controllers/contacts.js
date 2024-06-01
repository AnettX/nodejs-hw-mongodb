import { getAllContacts, getContactById } from '../services/contacts.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({
      status: 404,
      message: 'Not valid contact id',
    });
  }

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      //   return res.status(404).json({
      //     status: 404,
      //     message: `Contact with id ${contactId} not found`,
      //   });
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
