const { addNewContacts, getAllContacts, getNewContacts } = require("./helpers");

const listContacts = async () => {
  const contacts = await getAllContacts();
  console.table(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    const contact = contacts.find((item) => item.id === +contactId);
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
    await addNewContacts(newContacts);
    const updatedСontacts = await getAllContacts();
    console.table(updatedСontacts);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await getAllContacts();
    const newContacts = await getNewContacts(contacts, name, email, phone);
    await addNewContacts(newContacts);
    const updatedСontacts = await getAllContacts();
    console.table(updatedСontacts);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
