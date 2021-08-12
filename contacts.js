const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db", "./contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = data.toString();
      console.table(JSON.parse(contacts));
      return contacts;
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.filter(({ id }) => id === +contactId);
      if (contact.length === 0) {
        return console.log(`We have no contact with this id = ${contactId}!`);
      }
      return console.table(contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(({ id }) => id !== +contactId);
      if (contacts.length === newContacts.length) {
        return console.log(`We have no contact with this id = ${contactId}!`);
      }
      const string = JSON.stringify(newContacts, null, 2 );
      fs.writeFile(contactsPath, string).catch((err) =>
        console.log(err.message)
      );
      listContacts();
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const idArray = [...contacts].map(({ id }) => +id).sort((a, b) => a - b);
      const newId = idArray[idArray.length - 1] + 1;
      const newContact = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
      };
      if (
        contacts.some(
          (contact) => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        return console.log(`This ${name} is already in contacts`);
      }
      if (
        contacts.some(
          (contact) => contact.email.toLowerCase() === email.toLowerCase()
        )
      ) {
        return console.log(`This ${email} is already in contacts`);
      }
      if (contacts.some((contact) => contact.phone === phone)) {
        return console.log(`This ${phone} is already in contacts`);
      }
      const newContacts = [...contacts, newContact];
      const string = JSON.stringify(newContacts, null, 2 );
      fs.writeFile(contactsPath, string).catch((err) =>
        console.log(err.message)
      );
      listContacts();
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
// listContacts();
// getContactById(10);
// removeContact(3);
// addContact('Jone Smitch', 'jonesmitch@ps.ua', '(045) 534-4318')
