import { MouseEvent } from "react";

export const openModal = (
  onOpen: React.Dispatch<React.SetStateAction<boolean>>, 
  event: MouseEvent<HTMLButtonElement>,
  onLoginClicked: React.Dispatch<React.SetStateAction<boolean>>,
  onSignUpClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  event.stopPropagation();
  onOpen(true);

  const loginBtn = document.querySelector('.loginBtn');
  const signUpBtn = document.querySelector('.signUpBtn');
  
  if (event.target === loginBtn) {
    onLoginClicked(true);
    onSignUpClicked(false);
  } else if (event.target === signUpBtn) {
    onLoginClicked(false);
    onSignUpClicked(true);
  }
}

