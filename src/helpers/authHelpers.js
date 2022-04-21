export const checkIfAllInputsAreNotEmpty = (userData) => {
  for (let key in userData) {
    if (!Boolean(userData[key]) && key !== "passwordsDifferent") {
      return false;
    }
  }

  return true;
};
