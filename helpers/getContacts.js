const fs = require("fs/promises");
const filePath = require("./filePath");

const getAllContacts = async () => {
  try {
    const contacts = await fs.readFile(filePath);
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.log("ERROR", error.message);
  }
};
module.exports = getAllContacts;
