export default async function react(client, message){

    const sleep = ms => new Promise(r => setTimeout(r, ms))

    const remoteJid = message?.key.remoteJid;

    attendre client.sendMessage(remoteJid,

        {
            réagir : {
                texte : 'ðŸŽ¯',

                clé : message.clé
            }
        }

    )

    attendre sleep(1000)

    attendre client.sendMessage(remoteJid,

        {
            réagir : {
                texte : 'âš¡',

                clé : message.clé
            }
        }

    )
    attendre sleep(1000)

     attendre client.sendMessage(remoteJid, {
     réagir : { supprimer : vrai,
     clé : message.clé }
  })

}