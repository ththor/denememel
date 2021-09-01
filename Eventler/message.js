const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const Discord = require('discord.js');
const BeklemeSüre = new Set();
module.exports = async (message) => {
const client = message.client;
const prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;
  if(BeklemeSüre.has(message.author.id)) {
  return message.channel.send(new Discord.MessageEmbed().setDescription(`Lütfen 5 Saniye Bekleyip Tekrar Deneyiniz`).setFooter(`${message.guild.name} Sunucusu`).setColor("RANDOM").setTimestamp()).then(message.delete({ timeout: 1000, reason: "Temiz Görünüm"})).catch(e => console.log(e));
  }
  BeklemeSüre.add(message.author.id);
  setTimeout(() => {
  BeklemeSüre.delete(message.author.id);
  }, 5000);
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
    if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
    } else {
    }
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  if(message.content.includes(`<@${client.user.id}>`)) {
     message.channel.send(new Discord.MessageEmbed().setDescription(`🌀 Benim Hakkımda Fazla Bir Bilgin Yok Gibi Gözüküyor ${message.author} 🌀\n\nPrefixim: **${prefix}** ve ${prefix}yardım Yazarak Komutlarımı Görebilirsin\n\n**[Beni Bu Adresten Davet Edebilirsin](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)**`).setFooter(`${client.user.username} Bot`).setColor("RANDOM").setTimestamp()).then(message.delete({ timeout: 2000, reason: "Temiz Bir Görünüm" })).catch(e => console.log(e));
  }
  if(!client.commands.has(command)) {
    if(client.aliases.has(command)) {
     return false;
    } else {
    message.channel.send(new Discord.MessageEmbed().setTitle(`Komut Bulunamadı`).setDescription(`Komutlarımda ${command} İsminde Bir Komut Yok!`).setFooter(`Komutlara Bakmak İçin ${prefix}yardım Yazabilirsin`).setColor("RANDOM").setTimestamp()).then(msg => msg.delete({ timeout: 3000, reason: "Temiz Bir Görünüm"}))
    }
  }
};