const { readContacts, writeContacts } = require("./func.js");

async function listContacts() {
  try {
    const res = await readContacts();
    return res;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const contactById = contacts.filter(
      (contact) => contact.id === contactId.toString()
    );
    if (contactById.length > 0) {
      return contactById;
    }
    console.log(`There are no contact with ID:${contactId}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  try {
    await writeContacts(filteredContacts);
    console.log(`Contact with ID: ${contactId} was deleted!`);
    return filteredContacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactNew = { id: Date.now().toString(), name, email, phone };
    const contacts = await readContacts();
    const contactsList = [contactNew, ...contacts];
    await writeContacts(contactsList);
    console.log(
      `Your contact name: ${name}, email: ${email}, phone: ${phone} added!`
    );
    const freshList = await readContacts();
    return freshList;
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
