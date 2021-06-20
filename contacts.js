const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath).then((res) => {
    const contacts = JSON.parse(res);
    console.table(contacts);
  });
  return;
}

function getContactById(contactId) {
  fs.readFile(contactsPath).then((res) => {
    const contacts = JSON.parse(res);
    const target = contacts.find((contact) => contactId === contact.id);

    console.log(target);
  });
  return;
}

function removeContact(contactId) {
  fs.readFile(contactsPath).then((res) => {
    const contacts = JSON.parse(res);
    const filtered = contacts.filter((contact) => contact.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(filtered));
  });
  return;
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath).then((res) => {
    const contacts = JSON.parse(res);

    // ? get current id
    let minId = 1;
    contacts.forEach((item) => {
      if (minId == item.id) {
        minId++;
      }
    });

    contacts.push({ id: minId, name, email, phone });

    // ? sorting array
    contacts.sort((a, b) => a.id > b.id ? 1 : -1);

    fs.writeFile(contactsPath, JSON.stringify(contacts));
  });
  return;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
