const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts().then((value) => {
        console.table(value);
      });
      break;

    case "get":
      await getContactById(id).then((value) => {
        console.table(value);
      });
      break;

    case "add":
      await addContact(name, email, phone).then((value) => {
        console.table(value);
      });
      break;

    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
