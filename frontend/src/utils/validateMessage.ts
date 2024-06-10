import Filter from 'bad-words';

export const validateMessage = (message: string) => {
  const filter = new Filter();
  if (filter.isProfane(message)) {
    return false;
  }
  return true;
};