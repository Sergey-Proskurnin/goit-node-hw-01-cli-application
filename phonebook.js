const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db", "./contacts.json");

const getAllContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

const addNewContacts = async (data) => {
  try {
    await fs.writeFile(contactsPath, data);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

const listContacts = async () => {
  const contacts = await getAllContacts();
  console.table(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      throw new Error(`We have no contact with this id = ${contactId}!`);
    }
    console.table([contact]);
    return contact;
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    const newContacts = contacts.filter(({ id }) => id !== +contactId);

    if (contacts.length === newContacts.length) {
      throw new Error(`We have no contact with this id = ${contactId}!`);
    }
    const string = JSON.stringify(newContacts, null, 2);
    await addNewContacts(string);
    const updatedСontacts = await getAllContacts();
    console.table(updatedСontacts);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

// listContacts();
// getContactById(12);
removeContact(3);
