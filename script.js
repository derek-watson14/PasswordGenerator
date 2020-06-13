const generateBtn = document.querySelector("#generate");
const textarea = document.querySelector("textarea");

// Each charset in an object
const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  special: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
  numeric: "0123456789",
};

// Get desired password length from user - only accept numbers 8-128
function askLength() {
  let passLen;
  while (isNaN(passLen) || passLen < 8 || passLen > 128) {
    passLen = parseInt(
      prompt("Choose a password length between 8 and 128 characters:")
    );
  }
  return passLen;
}

// Ask if a user wants to include a set of chars in their password,
// if so, return the set, if not return an empty array
function checkSet(setKey) {
  return confirm(`Would you like to include ${setKey} characters?`)
    ? charSets[setKey].split("")
    : [];
}

// Call checkSet on each character set in succession, building a cumulative
// array which is returned
function buildCharSet() {
  return []
    .concat(checkSet("uppercase"))
    .concat(checkSet("lowercase"))
    .concat(checkSet("special"))
    .concat(checkSet("numeric"));
}

// Retrieve a random item from an array
function randomChar(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

// Get length and desired chars from user with above functions, return ""
// if no chars selected, otherwise return random password
function generatePassword() {
  const passLen = askLength();
  const charSet = buildCharSet();
  if (charSet.length < 1) {
    alert("You must select at least one character type!");
    return "";
  }

  return Array.from({ length: passLen }, () => randomChar(charSet)).join("");
}

// Call generate password and write results to DOM
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
