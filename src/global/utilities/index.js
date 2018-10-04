
//Small functions

//Creates a random ID that is always unique
export const generateID = () => '_' + Math.random().toString(36).substr(2, 9);

//Converts Normal Strings to kebab-case
export const stringToKebab = (string) => string.split(" ").join("-").toLowerCase();

//Converts Kebab-case strings to Normal strings
export const kebabToString = (string) => string.split("-").join(" ");

//Returns a random element from an array
export const returnRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

//Pascal to Kebab Case
export const pascalToKebab = (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

//Converts an object into an array
export const objectToArray = (object) => Object.keys(object).map(key => object[key]);

//Finds the position of a letter or word in a given string
export const findPositionInString = (string, param) => string.search(param);

//Switches the positiion of the words in a two-word string
export const switchWords = (string) => { const regExp = /^(\S+)\s+(\S+)$/; return string.replace(regExp, '$2 $1') };

//Converts Normal Strings to cameCase
export const stringToCamelCase = (string) => string.toLowerCase().trim().split(/[.\-_\s]/g).reduce((string, word) => string + word[0].toUpperCase() + word.slice(1));

//Converts Normal String to PascalCase
export const stringToPascalCase = (string) => string[0].toUpperCase() + stringToCamelCase(string).substr(1);

//Returns a string without the timestamp
export const removeTimestamp = (string) => string.slice(14).split("-").join(" ");
