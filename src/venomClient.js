// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

venom
  .create({
    session: "sendMassive", //nome da sessão
    openBrowser: true,
    headless: "new",
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
//Função responsavel por validar os números de celulares que por padrão possuem 12 caracteres
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
//Função responsavel por extrair os números dos contatos do array de objetos 
const extractContacts = (arrayContacts) => {
  const contactCounts = {};
  for (const contact of arrayContacts) {
    const userId = contact.id.user;
    const contactCount = (contactCounts[userId] ?? 0) + 1;
    contactCounts[userId] = contactCount;
  }
  return Object.keys(contactCounts);
};
//Função responsavel por formatar os contatos para envio de msgs
const formattedNumbers = (array) => {
  const newNumbers = array.map((number) => `${number}@c.us`);
  return newNumbers
}

async function start(client) {
  const chats = await client.getAllChats();
  const contacts = await client.getAllContacts();
  let contactChat = extractContacts(chats);
  let contactSchedule = extractContacts(contacts);
  let arrayPreProcess = [...contactChat, ...contactSchedule];
  let arrayProcess = isValidNumber(arrayPreProcess)
  const arrayFinal = formattedNumbers(arrayProcess)
      arrayFinal.forEach(element => {
        client
        .sendText(element, "Welcome Venom 🕷")
        .then((result) => {
          console.log("SUCESS!!!"); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
      });
}
