const readline = require('readline');
const display= require('../display.js');

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
        if(ga==1){

            display.display(valeur, chans);
            ga=0;
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
                ga=1;
                valeur=-1;
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
        if(go==1){
            display.display(valo, chan);
            go=0;

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
                go=1;
                valeur = -1;
            }
            else {
                chans[valeur].send(answer);
                rltext.close();
                dmSelect(client, chans, ptotal, k, paj, i, valeur);
            }


        })

    },

    once: function once(client){
        
        client.on('message', message => {
            try {
                if (message.channel == chan[valo]) {
                    display.display(valo, chan);
                }
                
                
            } catch (error) {
                
            }
        
    })
    }
    

}


