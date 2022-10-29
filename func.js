import { nanoid } from "nanoid";
const fs = require("fs");

async function readContacts(path) {
  const res = await fs.readFile(path);
  let contacts = JSON.parse(res);
  return contacts;
}

async function writeContacts(contactsPath, { name, email, phone }) {
  const contactNew = { id: nanoid(), name, email, phone };
  const contacts = readContacts(contactsPath);
  const contactsList = JSON.stringify([contactNew, ...contacts]);
  await fs.writeFile(contactsPath, contactsList);
  return contactsList;
}

module.exports = {
  readContacts,
  writeContacts,
};
