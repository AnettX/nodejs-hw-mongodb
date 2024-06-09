const parseBoolean = (isFavourite) => {
  if (!['true', 'false'].includes(isFavourite)) return;
  return isFavourite === 'true' ? true : false;
};

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;
  const validContactTypes = ['work', 'home', 'personal'];
  if (validContactTypes.includes(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedContactType = parseContactType(contactType);
  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
