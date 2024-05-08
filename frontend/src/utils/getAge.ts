export const getAge = (birthdate: Date | undefined): number | undefined => {
  if (birthdate) {
    const currentDate = new Date();
    const userBirthDate = new Date(birthdate);
    let age = currentDate.getFullYear() - userBirthDate.getFullYear();
    
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const birthMonth = userBirthDate.getMonth() + 1;
    const birthDay = userBirthDate.getDate();
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
    
    return age;
  }
}