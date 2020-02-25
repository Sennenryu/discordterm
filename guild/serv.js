const readline = require('readline');
const servActions= require('./servActions');

module.exports = {

    servGuildSelect : function servGuildSelect(client, ptotal, k, paj, i, guil) {

        var rls = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        rls.question('', (answer) => {
    
            if (answer == "r") {
                console.clear();
    
                rls.close();
                require('../baseCommand').baseCommand(client);
    
            }
    
            else if (answer == "z") {
    
                console.clear();
                console.log("Server selection\n"+
                "   -Type the number of the server you want to enter\n"+
                "   -Type z to go to the next page\n"+
                "   -Type a to go to the previous page\n\n");
    
                if (paj < ptotal) {
                    k += 10;
                    paj += 1;
                }
    
                for (let j = k; j < k + 10; j++) {
                    try {
    
                        console.log(`${guil[j].name} : ${j}`);
    
                    } catch (error) {
                        console.log('');
    
                    }
    
                }
                console.log(`\nPage ${paj} sur ${ptotal}`)
    
                rls.close();
                servGuildSelect(client, ptotal, k, paj, i, guil);
    
            }
    
            else if (answer == "a") {
    
                console.clear();
                console.log("Server selection\n"+
                "   -Type the number of the server you want to enter\n"+
                "   -Type z to go to the next page\n"+
                "   -Type a to go to the previous page\n\n");
    
                if (paj > 1) {
                    k -= 10;
                    paj -= 1;
                }
    
                for (let j = k; j < k + 10; j++) {
                    try {
    
                        console.log(`${guil[j].name} : ${j}`);
    
                    } catch (error) {
                        console.log('');
    
                    }
    
                }
                console.log(`\nPage ${paj} sur ${ptotal}`)
    
                rls.close();
                servGuildSelect(client, ptotal, k, paj, i, guil);
    
            }
    
            else {
    
                try {
    
                    var val = parseInt(answer, 10);
    
                } catch (error) {
    
                }
    
                if (val > 0 && val < i + 1) {
                    try {
                        rls.close();
                        servActions.servChannelSelectSend(client, ptotal, k, paj, i, val, guil);
                    } catch (error) {
    
                    }
    
                }
                else {
                    
                    rls.close();
                    servGuildSelect(client, ptotal, k, paj, i, guil);
                }
    
            }
    
        });
    }

}