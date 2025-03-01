const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isKnownType = ['home', 'work', 'personal'].includes(type);
  if (isKnownType) return type;
};

const parseIsFavourite = (IsFavourite) => {
  const isBoolean = ['true', 'false'].includes(IsFavourite);
  if (isBoolean) {
    return IsFavourite === 'true' ? 'true' : 'false';
  }
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
