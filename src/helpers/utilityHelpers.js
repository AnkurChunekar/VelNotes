export const capitalizeString = (string) => {
  string = string.trim();
  let result = "";

  for (let i = 0; i < string.length; i++) {
    if (i === 0 || string[i + 1] === " ") result += string[i].toUpperCase();
    else result += string[i].toLowerCase();
  }

  return result;
};

export const deepCloneObject = (obj) => JSON.parse(JSON.stringify(obj)); 
