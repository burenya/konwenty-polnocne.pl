const { GatewayIntentBits, Client } = require('discord.js');
const discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
// Test
const bot = new Client({
    intents: [GatewayIntentBits.Guilds],
    presence: {status: 'invisible'}
});

const months = {
    "🔺 STYCZEŃ 🔺": "01",
    "🔺 LUTY 🔺": "02",
    "🔺 MARZEC 🔺": "03",
    "🔺 KWIECIEŃ 🔺": "04",
    "🔺 MAJ 🔺": "05",
    "🔺 CZERWIEC 🔺": "06",
    "🔺 LIPIEC 🔺": "07",
    "🔺 SIERPIEŃ 🔺": "08",
    "🔺 WRZESIEŃ 🔺": "09",
    "🔺 PAŹDZIERNIK 🔺": "10",
    "🔺 LISTOPAD 🔺": "11",
    "🔺 GRUDZIEŃ 🔺": "12",
}

bot.once('ready', async () => {
    const channel = await bot.channels.fetch(process.env.CHANNEL_ID);
    const message = await channel.messages.fetch(process.env.MESSAGE_ID);
    const input = message.content.replace(/[*_]+/g, "").split('\n\n');
    for (const elem in input) {
        input[elem] = input[elem].split('\n');
    }
    const year = input[0].shift().replace("KONWENTY I EVENTY", "").trim();
    const result = [];
    const conType = {};
    for (const conRow of input.shift()) {
        const conSplit = conRow.split(/ +/);
        const conEmoji = conSplit.shift();
        conType[conEmoji] = conSplit.join(" ");
    }
    for (const monthList of input) {
        let month = months[monthList.shift()];
        if (!month) continue;
        for (const con of monthList) {
            let conSplit = con.split(/ +/);
            const conEmoji = conSplit.shift();
            conSplit = conSplit.join(" ").split("🔸");
            if (conType.hasOwnProperty(conEmoji)) {
                result.push({
                    "typ": conType[conEmoji],
                    "nazwa": conSplit[1].trim(),
                    "data": `${conSplit[0].replace(/ +/g, "")}.${month}.${year}`,
                    "miasto": conSplit[2].trim()
                })
            }
        }
    }
    fs.writeFileSync("lista.json", JSON.stringify({"konwenty": result}, null, 2));
    bot.destroy();
});

bot.login(process.env.DISCORD_TOKEN);
