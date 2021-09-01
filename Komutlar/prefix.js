const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {

const Prefix = args[0]
if(!Prefix) return message.channel.send(`Hey Bir Prefix Yazmayı Unuttun\n\nÖrnek Kullanım ${ayarlar.prefix}prefix ${ayarlar.prefix}`).catch(e => console.log(e));
if (Prefix === "sıfırla") {
await message.react("☑️")
await message.channel.send(`Prefix Başarıyla Sıfırlandı Yeni Prefix: **${ayarlar.prefix}**`).catch(e => console.log(e));
await db.delete(`prefix_${message.guild.id}`).catch(e => message.channel.send(`Bir Sorun Var Tekrar Denemelisin.`))
} else {
await message.react("☑️")
await message.channel.send(`Prefix Başarıyla **${Prefix}** Olarak Ayarlandı`).catch(e => console.log(e))
await db.set(`prefix_${message.guild.id}`, `${args[0]}`).catch(e => message.channel.send(`Bir Sorun Var Tekrar Denemelisin.`))
}

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["prefix-ayarla"],
  permLevel: 0
};
exports.help = {
  name: "prefix"
};