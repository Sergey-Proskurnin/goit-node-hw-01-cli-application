const fs = require("fs/promises");

const filePath = require("./filePath");

const addNewContacts = async (data) => {
  try {
    const string = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, string);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};
module.exports = addNewContacts;
