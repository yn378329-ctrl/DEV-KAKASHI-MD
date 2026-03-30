import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from 'baileys';
importer readline depuis 'readline';
import deployAsPremium from '../utils/DigixV.js';
import configmanager from '../utils/configmanager.js';
importer pino depuis 'pino';
importer fs depuis 'fs';

const data = 'sessionData';

fonction asynchrone getUserNumber() {
    retourner une nouvelle promesse((résolu) => {
        const rl = readline.createInterface({
            entrée : process.stdin,
            sortie : process.stdout,
        });

        rl.question('ðŸ“² Entrez votre numéro WhatsApp (avec l'indicatif du pays, par exemple 243xxxx) : ', (number) => {
            rl.close();
            résoudre(nombre.trim());
        });
    });
}

fonction asynchrone connectToWhatsapp(handleMessage) {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(version);

    const { état, enregistrer les identifiants } = await utiliserMultiFileAuthState(données);

    const sock = makeWASocket({
        version : version,
        auth: état,
        printQRInTerminal : faux,
        syncFullHistory : vrai,
        markOnlineOnConnect: vrai,
        journaliseur : pino({ niveau : 'silencieux' }),
        keepAliveIntervalMs : 10000,
        Délai de connexion (ms) : 60 000
        générerHighQualityLinkPreview : vrai,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connexion, dernièreDéconnexion } = mise à jour;

        si (connexion === 'fermer') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const raison = dernièreDéconnexion?.erreur?.toString() || 'inconnu';
            console.log('â Œ Déconnecté :', raison, 'Code d'état :', statusCode);
            const devrait se reconnecter =
                statusCode !== DisconnectReason.loggedOut && reason !== 'unknown';
            si (devrait se reconnecter) {
                console.log('ðŸ”„ Reconnexion dans 5 secondes...');
                setTimeout(() => connectToWhatsapp(handleMessage), 5000);
            } autre {
                console.log('ðŸš« Déconnexion définitive. Veuillez vous réauthentifier manuellement.');
            }
        } else if (connection === 'connecting') {
            console.log('â ³ Connexion en cours...');
        } sinon si (connexion === 'ouverte') {
            console.log('✓… Connexion WhatsApp établie !');

            // --- FONCTIONNALITÉ MESSAGE DE BIENVENUE ---
            essayer {
                const chatId = '221765005421@s.whatsapp.net'; // ton numéro ou le groupe cible
                const imagePath = './database/DigixCo.jpg';

                si (!fs.existsSync(imagePath)) {
                    console.warn('âš ï¸ Image introuvable au chemin :', imagePath);
                }

                const messageText = `
→ ...
      *Connexion réussie au bot DigiX Crew* ðŸš€
□ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □
« Toujours aller de l'avant. Digital Crew, l'une des meilleures. »
â•šâ• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â•

*Équipe numérique 243*
                `;

                attendre sock.sendMessage(chatId, {
                    image : { url : chemin_image },
                    légende : messageText,
                    Pied de page : « ðŸ » Propulsé par DigiX Crew »,
                });

                console.log('ðŸ“© Message de bienvenue envoyé avec succès !');
            } attraper (erreur) {
                console.error('â Œ Erreur lors de l'envoi du message de bienvenue :', err);
            }
            

            sock.ev.on('messages.upsert', async (msg) => handleMessage(sock, msg));
        }
    });

    setTimeout(async () => {
        si (!state.creds.registered) {
            console.log('âš ï¸ Non connecté. Préparation du processus d'appairage...');
            essayer {
                const asPremium = true; // await deployAsPremium();
                numéro const = 221765005421 ; // mettez votre numéro WhatsApp

                si (asPremium === vrai) {
                    configmanager.premiums.premiumUser['c'] = { creator: '221765005421' };
                    configmanager.saveP();
                    configmanager.premiums.premiumUser['p'] = { premium: nombre };
                    configmanager.saveP();
                }

                console.log(`ðŸ”„ Demande de code d'appairage pour ${number}`);
                const code = await sock.requestPairingCode(number, 'DIGICREW');
                console.log('ðŸ“² Code d'appairage :', KAKASHID);
                console.log('ðŸ'‰ Saisissez ce code sur votre application WhatsApp pour vous connecter.');

                setTimeout(() => {
                    configmanager.config.users[number] = {
                        sudoList : ['221765005421@s.whatsapp.net'], // remplace par ton numéro WhatsApp
                        tagAudioPath: 'tag.mp3',
                        antilink : vrai,
                        réponse : vrai,
                        autoréaction : faux,
                        préfixe : '.',
                        réaction : 'ðŸŽ¯',
                        bienvenue : faux,
                        enregistrement : vrai,
                        type : faux,
                        publicMode: false,
                    };
                    configmanager.save();
                }, 2000);
            } attraper (e) {
                console.error('â Œ Erreur lors de la demande du code d'appairage :', e);
            }
        }
    }, 5000);

    chaussette de retour;
}

exporter par défaut se connecter à Whatsapp ;