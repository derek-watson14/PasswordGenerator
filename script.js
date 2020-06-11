// Assignment Code
const generateBtn = document.querySelector("#generate");
const textarea = document.querySelector("textarea");

// * Get desired password length from user - only accept integers 8-128
function askLength() {
  let passLen;
  while (
    typeof passLen !== "number" ||
    isNaN(passLen) ||
    passLen < 8 ||
    passLen > 128
  ) {
    passLen = parseInt(
      prompt("Choose a password length between 8 and 128 characters:")
    );
  }
  return passLen;
}

// * Ask if a user wants to include a set of chars in their password,
// * if so, return the set, if not return an empty array
function checkSet(setKey) {
  return confirm(`Would you like to include ${setKey} characters?`)
    ? charSets[setKey]
    : [];
}

// * Call checkSet on each character set in succession, building a cumulative
// * array which is returned
function buildCharSet() {
  return []
    .concat(checkSet("uppercase"))
    .concat(checkSet("lowercase"))
    .concat(checkSet("special"))
    .concat(checkSet("numeric"));
}

// * Test that the user selected at least one charSet - if not, alert the user.
// * Use await to ensure DOM manipulation occurs before alert flashes
async function checkEmpty(charSet) {
  if (charSet.length < 1) {
    textarea.style.borderColor = "hsl(360, 91%, 36%)";
    await (() => new Promise((resolve) => setTimeout(resolve, 0)))();

    alert("You must select at least one character type!");
    textarea.style.borderColor = "#c0c7cf";
  }
}

// * Retrieve a random item from an array
function randomChar(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

// * Create an array of specified length, with each item a random char
// * join into a string
function generatePassword(passLen, charSet) {
  return Array.from({ length: passLen }, () => randomChar(charSet)).join("");
}

// * Using above functions: ask desired length & characters, ensure charSet
// * not empty, generate password, and write to DOM
function writePassword() {
  const passLen = askLength();
  const charSet = buildCharSet();
  checkEmpty(charSet);

  const password = generatePassword(passLen, charSet);
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// * Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
