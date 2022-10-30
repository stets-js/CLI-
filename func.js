const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readContacts() {
  const res = await fs.readFile(contactsPath);
  let contacts = JSON.parse(res);
  return contacts;
}

async function writeContacts(name, email, phone) {
  const contactNew = { id: Date.now().toString(), name, email, phone };
  const contacts = await readContacts();
  const contactsList = JSON.stringify([contactNew, ...contacts]);
  await fs.writeFile(contactsPath, contactsList);
  return contactsList;
}

module.exports = {
  readContacts,
  writeContacts,
};
