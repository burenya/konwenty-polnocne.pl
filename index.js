const { GoogleSpreadsheet } = require('google-spreadsheet');
const { GatewayIntentBits, Client, AttachmentBuilder } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const doc = new GoogleSpreadsheet('1IXNhplTNpHatopR1btypjFycmZt5-cUMiEF0ezspPKI');
dotenv.config();
const bot = new Client({
    intents: [GatewayIntentBits.Guilds],
    presence: {status: 'invisible'}
});

const ifPastEvent = (a) => {
    const aDate = new Date(a);
    aDate.setHours(0,0,0,0);
    const now = new Date();
    now.setHours(0,0,0,0);
    return now - aDate > 0
}

const getMonthList = async () => {
    const list = {};
    const sheet = doc.sheetsByTitle["miesiace"];
    const rows = await sheet.getRows();
    for (const row of rows) {
        list[row.nazwa_miesiaca] = row.liczba
    }
    return list;
}

const getFormattedMonthList = async () => {
    const list = {};
    const sheet = doc.sheetsByTitle["miesiace"];
    const rows = await sheet.getRows();
    for (const row of rows) {
        list[row.nazwa_miesiaca] = row.nazwa_formatowana
    }
    return list;
}

const getEmojiList = async () => {
    const list = {};
    const sheet = doc.sheetsByTitle["kategorie"];
    const rows = await sheet.getRows();
    for (const row of rows) {
        list[row.nazwa_kategorii] = row.emoji
    }
    return list;
}

const site_events = [];
const discord_events = [];

bot.on('ready', async () => {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_ACCOUNT,
        private_key: process.env.GOOGLE_PRIVKEY
    });
    await doc.loadInfo();
    const monthList = await getMonthList();
    const formattedMonthList = await getFormattedMonthList();
    const emojiList = await getEmojiList();
    const activeYear = process.env.ACTIVE_YEAR;
    for (const sheetTitle in doc.sheetsByTitle) {
        if (!sheetTitle.startsWith("lista_konwentow")) continue;
        const sheet = doc.sheetsByTitle[sheetTitle];
        const rows = await sheet.getRows();
        const year = sheetTitle.substring(sheetTitle.length - 4);
        rows.sort((a,b) => {
            const aDate = new Date(`${year}-${monthList[a.miesiac]}-${a.dzien_start}`);
            const bDate = new Date(`${year}-${monthList[b.miesiac]}-${b.dzien_start}`);
            return aDate-bDate;
        })
        for (const row of rows) {
            start_date = `${row.dzien_start}`.length == 1 ? `0${row.dzien_start}` : `${row.dzien_start}` ;
            end_date = `${row.dzien_koniec}`.length == 1 ? `0${row.dzien_koniec}` : `${row.dzien_koniec}` ;
            const day = start_date != end_date ? `${start_date}-${end_date}` : `${start_date}`
            const month = monthList[row.miesiac];
            console.log()
            site_events.push({
                "typ": row.kategoria,
                "nazwa": row.nazwa_konwentu,
                "minal": ifPastEvent(`${year}-${month}-${end_date}`),
                "data": `${day}.${month}.${year}`,
                "miasto": row.miasto
            });
            if (year != activeYear) continue;
            discord_events.push({
                "typ": emojiList[row.kategoria],
                "nazwa": row.nazwa_konwentu,
                "minal": ifPastEvent(`${year}-${month}-${end_date}`),
                "dzien": `${day}`,
                "miesiac": formattedMonthList[row.miesiac],
                "miasto": row.miasto,
                "kanal": row.id_kanalu
            })
        }
    }
    site_events.sort((a,b) => {
        return parseInt(a.data.substring(a.data.length - 4)) - parseInt(b.data.substring(b.data.length - 4))
    });
    fs.writeFileSync("lista.json", JSON.stringify({"konwenty": site_events}, null, 2));
    const channel = await bot.channels.fetch(process.env.CHANNEL_ID);
    const legenda = await channel.messages.fetch(process.env.LEGENDA_ID);
    const minione = await channel.messages.fetch(process.env.MINIONE_ID);
    const nadchodzace = await channel.messages.fetch(process.env.NADCHODZACE_ID);
    let legendaText = "";
    for (const emojiDesc in emojiList) {
        legendaText += `${emojiList[emojiDesc]}  ${emojiDesc}\n`
    }
    let minioneText = ""
    let minioneBackup = minioneText;
    let nadchodzaceText = "";
    let nadchodzaceBackup = nadchodzaceText;
    let lastMonth = ""; 
    for (const event of discord_events) {
        if (!event.minal) continue;
        if (event.miesiac != lastMonth) {
            lastMonth = event.miesiac;
            minioneText = minioneText.trim();
            minioneText += `\n\n${lastMonth}\n\n`;
        };
        minioneText += `${event.typ}  **${event.dzien} ◆ ${event.nazwa} ◆** ${event.miasto}`;
        minioneText += event.kanal ? `\n         ↳ Kanał na forum: <#${event.kanal}>\n\n`: '\n\n';
    }
    if (minioneBackup == minioneText) {
        minioneText += "\n\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:white_circle: ** SOON:tm: ** :white_circle:\n"
    }
    lastMonth = "";
    for (const event of discord_events) {
        if (event.minal) continue;
        if (event.miesiac != lastMonth) {
            lastMonth = event.miesiac;
            nadchodzaceText = nadchodzaceText.trim();
            nadchodzaceText += `\n\n${lastMonth}\n\n`;
        };
        nadchodzaceText += `${event.typ}  **${event.dzien} ◆ ${event.nazwa} ◆** ${event.miasto}`;
        nadchodzaceText += event.kanal ? `\n         ↳ Kanał na forum: <#${event.kanal}>\n\n`: '\n\n';
    }
    if (nadchodzaceBackup == nadchodzaceText) {
        nadchodzaceText += `\n\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:white_circle: ** BRAK <a:polarbearPensive:879863553396461678> ** :white_circle:\n`
    }
    await legenda.edit(legendaText);
    await minione.edit(minioneText);
    await nadchodzace.edit(nadchodzaceText);
    bot.destroy();
});

bot.login(process.env.DISCORD_TOKEN);
