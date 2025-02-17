const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isKnownType = ['home', 'work', 'personal'].includes(type);
  if (isKnownType) return type;
};

const parseIsFavorite = (IsFavorite) => {
  const isBoolean = ['true', 'false'].includes(IsFavorite);
  if (isBoolean) {
    return IsFavorite === 'true' ? 'true' : 'false';
  }
};

export const parseFilterParams = (query) => {
  const { type, isFavorite } = query;

  const parsedType = parseType(type);
  const parsedIsFavorite = parseIsFavorite(isFavorite);

  return {
    type: parsedType,
    isFavorite: parsedIsFavorite,
  };
};
