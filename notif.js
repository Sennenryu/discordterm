const fs = require('fs');

module.exports = {

    notif: function notif() {

        fs.readdir('./notifications/', (err, files) => {

            if (files.length == 1) {

            }
            else {

                var n = files.length;
                console.log("\n   New notifications:            Type n + the number of the notification you want to open, for example \"n3\"\n");
                for (let i = 1; i < n; i++) {
                    try {
                        data = fs.readFileSync('./notifications/notif' + i + '.json');
                
                            var temp = JSON.parse(data);
                            if (temp.guild) {
                                console.log(`        ${i} - ${temp.guild} - ${temp.channelname}   ${temp.date} ${temp.username} : ${temp.content}`)
                
                            }
                            else {
                
                                console.log(`        ${i} - ${temp.date} ${temp.channelname} : ${temp.content}`)
                
                            }                        
                
                    } catch (error) {
                
                    }
                }

                console.log("\n");

            }


        });

    }

}
