fonction asynchrone bug(message, client, textes, num) {
    essayer {
        const remoteJid = message.key?.remoteJid;
        attendre client.sendMessage(remoteJid, {
            image: { url: `database/${num}.jpg` },
            légende : `> ${texts}`,
            contextInfo: {
                externalAdReply: {
                    titre : « Rejoignez notre chaîne WhatsApp »,
                    corps : " ð“†© ð ƒð ¢ð ð ¢ð ð šð ¥ ð ‚ð «ð žð ° ð Ÿ ð Ÿ'ð Ÿ' ð“†ª ",
                    type de média : 1,
                    thumbnailUrl: `https://whatsapp.com/channel/0029VbBT7FdLCoX1TDyQQb1B`,
                    renderLargerThumbnail: false,
                    mediaUrl: `${num}.jpg`,
                    sourceUrl: `${num}.jpg`
                }
            }
        });
    } attraper (e) {
        console.log(e);
    }
}

bug par défaut d'exportation ;