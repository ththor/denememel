const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports = async (client) => {
  
await client.user.setActivity(`🎄 ${client.user.username} 🎄 🏅 [${ayarlar.prefix}yardım Yazarak Komutlarımı Görebilirsiniz 🏅`, { type: 'WATCHING' }).catch(console.error);
  
await console.log(`[${client.user.tag}]: Giriş Yaptım ve Komutlarım Yüklendi.`);
await client.users.cache.get(ayarlar.sahip).send(`Selam Sahip Ben Komutlarımı Yükledim Bilgilendirmek İstedim\n\nPrefixim Şu Anda: **${ayarlar.prefix}**\n\nToplam ${client.guilds.cache.size} Sunucuya Hizmet Veriyorum.`).catch(e => console.log("Sahibime Mesaj Gönderemedim"));

};