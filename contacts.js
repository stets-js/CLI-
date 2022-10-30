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
    (contact) => contact.id !== contactId
  );
  try {
    await fs.writeFile(JSON.stringify(filteredContacts));
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    await writeContacts(name, email, phone);
    console.log(
      `Your contact name: ${name}, email: ${email}, phone: ${phone} added!`
    );
    const contactList = await readContacts();
    return contactList;
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
