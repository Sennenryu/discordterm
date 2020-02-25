const readline = require('readline');
const display = require('../display.js');

function servDisplayFirst(client) {

    console.clear();
    console.log("Server selection\n" +
        "   -Type the number of the server you want to enter\n" +
        "   -Type z to go to the next page\n" +
        "   -Type a to go to the previous page\n\n");

    let i = 0;
    let k = 1;
    var guil = [];
    let paj = 1;

    client.guilds.forEach(guild => {
        i++;
        guil[i] = client.guilds.get(guild.id);

    })


    for (let j = k; j < k + 10; j++) {
        console.log(`${guil[j].name} : ${j}`);
    }
    ptotal = Math.ceil(i / 10);
    console.log(`\nPage ${paj} sur ${ptotal}`)


}


module.exports = {

    servChannelSelectSend: function servChannelSelectSend(client, ptotal, k, paj, i, val, guil) {

        console.clear();
        console.log("Server's channel selection\n" +
            "   -Type the number of the channel you want to enter\n\n")
        console.log(guil[val].name + '\n');
        let a = 0;
        var chans = [];
        guil[val].channels.forEach(c => {
            if (c.type == "text") {
                a++;
                chans[a] = c;
                console.log(`   ${chans[a].name} : ${a}`)
            }
        })
        console.log("\n");

        var rlc = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rlc.question('', (answer) => {

            if (answer == "r") {
                console.clear();
                servDisplayFirst(client);

                rlc.close();
                require('./serv').servGuildSelect(client, ptotal, k, paj, i, guil);

            }
            else {

                try {
                    var valeur = parseInt(answer, 10);

                } catch (error) {

                }

                if (valeur > 0 && valeur < a + 1) {
                    try {
                        rlc.close();
                        console.clear();
                        require('../dm/dmActions').servSend(client, chans, ptotal, k, paj, i, valeur, val, guil);

                    } catch (error) {

                    }

                }

                else {
                    rlc.close();
                    servChannelSelectSend(client, ptotal, k, paj, i, val, guil);
                }
            }

        });

    },



}