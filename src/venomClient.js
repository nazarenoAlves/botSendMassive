// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

venom
  .create({
    session: "sendMassive", //nome da sessão
    openBrowser: true,
    headless: false,
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

// let textmsg = `🔥Black Friday na Câmaras e Pneus🔥
// A Black Friday está chegando e a Câmaras e Pneus está preparando as melhores ofertas para você!
// Dia 24, você poderá aproveitar descontos de até porcentagem em produtos selecionados.
// Acesse o nosso site ou loja física e confira todas as ofertas!

// Até lá!

// Câmaras e Pneus

// Executivo de Vendas: Ribamar Costa.
// `

async function start(client) {
  const chats = await client.getAllChats();
  const contacts = await client.getAllContacts();
  let contactChat = extractContacts(chats);
  let contactSchedule = extractContacts(contacts);
  let arrayPreProcess = [...contactChat, ...contactSchedule];
  let arrayProcess = isValidNumber(arrayPreProcess)
  const arrayFinal = formattedNumbers(arrayProcess)
  console.log(arrayFinal);
  let index = 0;

  const intervalId = setInterval(() => {
    if (index < arrayFinal.length) {
      client
        .sendText(arrayFinal[index], textmsg)
        .then((result) => {
          console.log("SUCESS!!!"); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 30 * 1000);
}
