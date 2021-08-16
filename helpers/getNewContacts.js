const getNewContacts = async (arrayContacts, name, email, phone) => {
  if (
    arrayContacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    )
  ) {
    throw new Error(`This ${name} is already in contacts`);
  }
  if (
    arrayContacts.some(
      contact => contact.email.toLowerCase() === email.toLowerCase(),
    )
  ) {
    throw new Error(`This ${email} is already in contacts`);
  }
  if (arrayContacts.some(contact => contact.phone === phone)) {
    throw new Error(`This ${phone} is already in contacts`);
  }
  const idArray = [...arrayContacts].map(({ id }) => +id).sort((a, b) => a - b);
  const newId = idArray[idArray.length - 1] + 1;
  const newContact = {
    id: newId,
    name: name,
    email: email,
    phone: phone,
  };
  const arr = [...arrayContacts, newContact];

  return arr;
};
module.exports = getNewContacts;
