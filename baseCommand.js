const readline = require('readline');
const serv= require('./guild/serv');
const dm= require('./dm/dm');

module.exports = {
    baseCommand : function baseCommand(client) {

        console.log("Discord, but using 0,1% of your CPU and 3mB of your RAM memory\n \n" +
            "How to use?\n" +
            "   -Type m to open the DM selection\n" +
            "   -Type s to open the server selection\n" +
            "   -Type r anywhere to return to the previous screen")

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('', (answer) => {

            if (answer == "s") {

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
                rl.close();



                serv.servGuildSelect(client, ptotal, k, paj, i, guil);

            }
            else if (answer == "m") {

                console.clear();
                console.log("DM chanel selection\n" +
                    "   -Type the number of the channel you want to enter\n" +
                    "   -Type z to go to the next page\n" +
                    "   -Type a to go to the previous page\n\n");
                var chans = [];
                var i = 0;
                let k = 1;
                let paj = 1;
                var mm = "";

                client.channels.forEach(c => {
                    
                    if (c.type == "dm" || c.type == "group") {
                        i++;
                        chans[i] = c;
                    }
                })

                for (let j = k; j < k + 10; j++) {
                    try {

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

                    } catch (error) {
                        console.log('');

                    }
                }
                ptotal = Math.ceil(i / 10);
                console.log(`\nPage ${paj} sur ${ptotal}`);

                rl.close();
                dm.dm(client, chans, ptotal, k, paj, i);

            }
            else {

                rl.close();
                console.clear();
                baseCommand(client);
            }



        })
    }
}