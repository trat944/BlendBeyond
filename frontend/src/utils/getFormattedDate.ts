export const getFormattedDate = (userBirthdate: string) => {
  if (!userBirthdate) return '';
  
  const date = new Date(userBirthdate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${day} / ${month} / ${year}`;
}

export const getOriginalDate = (userBirthdate: string): string => {
  if (!userBirthdate) return '';
  
  const formattedBirthdate = new Date(userBirthdate);
  
  if (!(formattedBirthdate instanceof Date) || isNaN(formattedBirthdate.getTime())) {
      throw new Error('Invalid birthdate format. Expected a Date object.');
  }

  return formattedBirthdate.toISOString();
};