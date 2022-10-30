const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readContacts() {
  const res = await fs.readFile(contactsPath);
  let contacts = JSON.parse(res);
  return contacts;
}

async function writeContacts(data) {
  let result = await fs.writeFile(contactsPath, JSON.stringify(data));
  return result;
}

module.exports = {
  readContacts,
  writeContacts,
};
