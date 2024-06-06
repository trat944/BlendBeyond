export const getFormattedDate = (userBirthdate : string) => {
  return userBirthdate ? new Date(userBirthdate).toISOString().split('T')[0] : '';
}

export const getOriginalDate = (userBirthdate: string ): string => {
  const formattedBirthdate = new Date(userBirthdate);
  if (!formattedBirthdate) {
      return ''; 
  }

  if (!(formattedBirthdate instanceof Date)) {
      throw new Error('Invalid birthdate format. Expected a Date object.');
  }

  return formattedBirthdate.toISOString();
};