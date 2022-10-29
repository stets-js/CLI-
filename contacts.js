const path = require("path");
const { readContacts, writeContacts } = reqiure("./func.js");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    await readContacts(contactsPath);
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
    return `There are no contact with ID:${contactId}`;
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts(contactsPath);
    const contactById = contacts.filter((contact) => contact.id !== contactId);
    if (contactById) {
      return contactById;
    }
    return `Contact with ID:${contactId} was deleted`;
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
