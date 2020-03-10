const readline = require('readline');
const display = require('../display.js');
const fs = require('fs')  //pour lire les fichiers locaux
var player = require('play-sound')(opts = {})


function dmDisplayFirst(client) {

    console.clear();
    console.log("DM chanel selection\n" +
        "   -Type the number of the channel you want to enter\n" +
        "   -Type z to go to the next page\n" +
        "   -Type a to go to the previous page\n\n");

    var chans = [];
    var a = 0;
    let k = 1;
    let paj = 1;
    var mm = "";

    client.channels.forEach(c => {

        if (c.type == "dm" || c.type == "group") {
            a++;
            chans[a] = c;
        }
    })

    a--;

    for (let j = k; j < k + 10; j++) {
        if (chans[j].type == "dm") {

            console.log(`${chans[j].recipient.username} : ${j}`);

        }
        else {
            if (chans[j].name == null) {
                chans[j].recipients.forEach(m => {
                    mm = mm + m.username + ", ";
                })
                console.log(`${mm} : ${j}`);

            }

        }
    }
    ptotal = Math.ceil(a / 10);
    console.log(`\nPage ${paj} sur ${ptotal}`);

}

var valo;
var chan;
var ga = 1;
var go = 1;

module.exports = {

    servSend: function servSend(client, chans, ptotal, k, paj, i, valeur, val, guil) {

        valo = valeur;
        chan = chans;
        if (ga == 1) {

            display.display(valeur, chans);
            ga = 0;
        }

        var rltext = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rltext.question('', (answer) => {

            if (answer == "r") {
                console.clear();
                rltext.close();
                require('../guild/servActions').servChannelSelectSend(client, ptotal, k, paj, i, val, guil);
                ga = 1;
                valeur = -1;
            }
            else {
                chans[valeur].send(answer);
                rltext.close();
                servSend(client, chans, ptotal, k, paj, i, valeur, val, guil);
            }


        })

    },


    dmSelect: function dmSelect(client, chans, ptotal, k, paj, i, valeur) {

        valo = valeur;
        chan = chans;
        if (go == 1) {
            display.display(valo, chan);
            go = 0;

        }

        var rltext = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rltext.question('', (answer) => {

            if (answer == "r") {
                console.clear();
                dmDisplayFirst(client);
                rltext.close();
                require('./dm').dm(client, chans, ptotal, k, paj, i);
                go = 1;
                valeur = -1;
            }
            else {
                chans[valeur].send(answer);
                rltext.close();
                dmSelect(client, chans, ptotal, k, paj, i, valeur);
            }


        })

    },

    once: function once(client) {

        client.on('message', message => {
            try {
                if (message.channel == chan[valo]) {
                    display.display(valo, chan);
                }


            } catch (error) {

            }
            if (message.author.id != client.user.id) {
                if (message.channel.type == "dm" || message.channel.type == "group") {

                    try {
                        if (message.channel.type == "dm") {

                            var rec = message.channel.recipient.username;

                        }
                        if (message.channel.type == "group") {
                            var mm = "";
                                message.channel.recipients.forEach(m => {
                                    mm = mm + m.username + ", ";
                                })
                                var rec = mm;

                            

                        }

                    } catch (error) {
                        console.log('');

                    }
                    var hours = message.createdAt.getUTCHours();
                    var minutes = message.createdAt.getUTCMinutes();

                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }

                    fs.readdir('./notifications/', (err, files) => {
                        const mess = {
                            channelname: rec,
                            content: message.content,
                            date: hours + 'H' + minutes
                        }

                        var n = files.length;
                        fs.writeFile('./notifications/notif' + n + '.json', JSON.stringify(mess), function (err) {
                            if (err) throw err;
                        });
                    });

                }

                if(message.channel.type == "text" && message.content.includes("<@!"+client.user.id+">")){
                    player.play('./discord-notification.mp3', { timeout: 300 }, function(err){
                        if (err) throw err
                      })
                    var hours = message.createdAt.getUTCHours();
                    var minutes = message.createdAt.getUTCMinutes();

                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }

                    fs.readdir('./notifications/', (err, files) => {
                        const mess = {
                            username: message.author.username,
                            guild: message.guild.name,
                            channelname: message.channel.name,
                            content: message.content,
                            date: hours + 'H' + minutes
                        }

                        var n = files.length;
                        fs.writeFile('./notifications/notif' + n + '.json', JSON.stringify(mess), function (err) {
                            if (err) throw err;
                        });
                    });

                }
            }
        })

    }


}


