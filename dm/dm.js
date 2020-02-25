const readline = require('readline');
const dmActions= require('./dmActions');

module.exports = {


    dm : function dm(client, chans, ptotal, k, paj, i) {

        var rlm = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        var mm = "";
    
        rlm.question('', (answer) => {
    
            if (answer == "r") {
                console.clear();
    
                rlm.close();
                require('../baseCommand').baseCommand(client);
    
            }
    
            else if (answer ==  "z") {
    
                console.clear();
                console.log("DM chanel selection\n"+
                "   -Type the number of the channel you want to enter\n"+
                "   -Type z to go to the next page\n"+
                "   -Type a to go to the previous page\n\n");
    
                if (paj < ptotal) {
                    k += 10;
                    paj += 1;
                }
    
                for (let j = k; j < k + 10; j++) {
                    try {
                        if (chans[j].type == "dm") {
    
                            console.log(`${chans[j].recipient.username} : ${j}`);
    
                        }
                        else {
                            if(chans[j].name == null){
                                chans[j].recipients.forEach(m =>{
                                    mm = mm + m.username + ", ";
                                })
                                console.log(`${mm} : ${j}`);
        
                            }
        
                        }
    
                    } catch (error) {
                        console.log('');
    
                    }
    
                }
                console.log(`\nPage ${paj} sur ${ptotal}`)
    
                rlm.close();
                dm(client, chans, ptotal, k, paj, i);
    
            }
    
            else if (answer == "a") {
    
                console.clear();
                console.log("DM chanel selection\n"+
                "   -Type the number of the channel you want to enter\n"+
                "   -Type z to go to the next page\n"+
                "   -Type a to go to the previous page\n\n");
    
                if (paj > 1) {
                    k -= 10;
                    paj -= 1;
                }
    
                for (let j = k; j < k + 10; j++) {
                    try {
    
                        if (chans[j].type == "dm") {
    
                            console.log(`${chans[j].recipient.username} : ${j}`);
    
                        }
                        else {
                            if(chans[j].name == null){
                                chans[j].recipients.forEach(m =>{
                                    mm = mm + m.username + ", ";
                                })
                                console.log(`${mm} : ${j}`);
        
                            }
        
                        }
    
                    } catch (error) {
                        console.log('');
    
                    }
    
                }
                console.log(`\nPage ${paj} sur ${ptotal}`)
    
                rlm.close();
                dm(client, chans, ptotal, k, paj, i);
    
            }
    
            else {
    
                try {
    
                    var valeur = parseInt(answer, 10);
    
                } catch (error) {
    
                }
    
                if (valeur > 0 && valeur < i + 1) {
                    try {
                        rlm.close();
                        dmActions.dmSelect(client, chans, ptotal, k, paj, i, valeur);
                    } catch (error) {
                        console.log(error)
    
                    }
    
                }
                else {
    
                    rlm.close();
                    dm(client, chans, ptotal, k, paj, i);
                }
    
            }
    
        });
    
    
    }

}
