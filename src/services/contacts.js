import { ContactsCollection } from '../db/models/contact';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};
