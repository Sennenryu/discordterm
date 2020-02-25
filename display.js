const terminalLink = require('terminal-link');

module.exports = {

    display: async function display(valeur, chans) {

        var mm = "";
        console.clear();
        try {

            if (chans[valeur].type == "dm") {

                console.log(`   @${chans[valeur].recipient.username}\n\n`);

            }
            else if (chans[valeur].type == "text") {
                console.log(`   @${chans[valeur].name}\n\n`)
            }
            else {

                if (chans[valeur].name == null) {
                    chans[valeur].recipients.forEach(m => {
                        mm = mm + m.username + ", ";
                    })
                    console.log(`   @${mm}\n\n`);

                }
            }


        } catch (error) {
            console.log('');

        }

        var mess = [];
        var num = 0;
        chans[valeur].fetchMessages({
            limit: 55,
        }).then((messages) => {

            messages.forEach(message => {

                num++
                mess[num] = message;


            })
            for (var m = 55; m > 0; m--) {
                try {

                    var hours = mess[m].createdAt.getUTCHours();
                    var minutes = mess[m].createdAt.getUTCMinutes();
                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }


                    console.log(`${hours}H${minutes} ${mess[m].author.username} : ${mess[m].content}`)
                    if (mess[m].attachments.array()[0].url) {
                        mess[m].attachments.array().forEach(atta => {
                            var link = terminalLink('----------Link to the sent picture----------', atta.url);
                            console.log(`${hours}H${minutes} ${mess[m].author.username} : ${link}`);
                        })

                    }

                } catch (error) {

                }

            }


        });
    }

}
