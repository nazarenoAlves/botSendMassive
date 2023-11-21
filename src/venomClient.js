// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

venom
  .create({
    session: "sendMassive", //name of session
    openBrowser: true,
    headless: "new",
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

const isValidNumber = (array) => {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const length = array[i].length;
    if (length === 12) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};
const extractContacts = (arrayContacts) => {
  const contactCounts = {};
  for (const contacts of arrayContacts) {
    const userId = contacts.id.user;
    const contactCount = (contactCounts[userId] ?? 0) + 1;
    contactCounts[userId] = contactCount;
  }
  return Object.keys(contactCounts);
};

async function start(client) {
  const chats = await client.getAllChats();
  const contacts = await client.getAllContacts();
  let contactChat = extractContacts(chats);
  let contactSchedule = extractContacts(contacts);
  let arrayProcess = [...contactChat, ...contactSchedule];
  console.log(isValidNumber(arrayProcess));
  
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
