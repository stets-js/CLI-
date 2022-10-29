const path = require("path");
const { readContacts, writeContacts } = require("./func.js");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const res = await readContacts(contactsPath);
    return res;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts(contactsPath);
    const contactById = contacts.filter((contact) => contact.id === contactId);
    if (contactById) {
      return contactById;
    }
    console.log(`There are no contact with ID:${contactId}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  const contacts = await readContacts(contactsPath);
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  try {
    console.log(`Contact with ID:${contactId} was deleted`);
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    await writeContacts(contactsPath, { name, email, phone });
    console.log("Your contact added!");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
