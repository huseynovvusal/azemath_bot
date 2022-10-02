const telegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const math = require("mathjs");

dotenv.config();

const token = process.env.BOT_TOKEN;

const bot = new telegramBot(token, { polling: true });

let sum = false;

let chatId;

bot.on("message", (msg) => {
  chatId = msg.chat.id;

  let randomWelcomeMessages = [
    "Xoş gəldin",
    "Ümid edirəm yaxşısan",
    "Necəsən?",
  ];

  if (msg.text === "/start") {
    sum = false;

    let randomWelcomeMessage =
      randomWelcomeMessages[
        Math.floor(Math.random() * randomWelcomeMessages.length)
      ];

    bot.sendMessage(
      chatId,
      `Salam! ${randomWelcomeMessage}. Mən Riyaziyyat botuyam. daxil etdiyin misalı həll edəcəm! /sum yazaraq misal göndərə bilərsən... \n\n Hesablama əməllərinin işarələri  \n\n Toplama * \n Çıxma - \n Vurma * \n Bölmə / \n Üstlü qüvvət ^ \n Kvadrat kök sqrt() \n Sinus sin(α deg) \n Kosinus cos(α deg)`
    );
  } else {
    // SALAM

    if (msg.text.toLowerCase().includes("salam"))
      bot.sendMessage(chatId, `Salam ${msg.chat.first_name}`, {
        reply_to_message_id: msg.message_id,
      });

    // CALCULATE

    if (sum) {
      let answer = math.evaluate(msg.text);
      bot.sendMessage(chatId, answer, { reply_to_message_id: msg.message_id });
    }

    // SUM

    if (msg.text === "/sum") {
      sum = true;
      bot.sendMessage(
        chatId,
        "Misalı yazı şəklində göndər həll edim! :) Çıxmaq üçün /exit yazın."
      );
    }
    // HELP

    if (msg.text === "/help") {
      bot.sendMessage(
        chatId,
        "Hesablama əməllərinin işarələri  \n\n Toplama * \n Çıxma - \n Vurma * \n Bölmə / \n Üstlü qüvvət ^ \n Kvadrat kök sqrt() \n Sinus sin(α deg) \n Kosinus cos(α deg)",
        { reply_to_message_id: msg.id }
      );
    }
    // EXIT
    if (msg.text === "/exit") {
      sum = false;
    }
  }
});

// bot.on("polling_error", (err) => {git push -u origin main
//   if (!sum) {
//     bot.sendMessage(chatId, "Anlamadım.");
//   }
// });
