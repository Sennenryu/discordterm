var keypress = require('keypress');
const readline = require('readline');


module.exports = {

    game: function game() {

        var wait;

        console.log("Heho hidden feature xdd - Osu mania but cheap and your personnal music :)\n\n" +
            "Please enter the game speed between 1 and 1000: (300 = 200 bpm, 150 = 400 bpm, 600 = 100 bpm and so on...)");

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('', (answer) => {

            if (answer > 0 && answer < 1001) {

                wait = answer;
                console.clear();
                rl.close();
                go();

            }
            else {

                rl.close();
                console.clear();
                game();
            }

        });
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

async function lvl() {

    var col = getRandomInt(39);
    console.log(col);
    var pattern = 0;
    var final = 0;
    if (col < 21) {
        pattern = getRandomInt(3);
        switch (pattern) {
            case 1:
                final = 1;
                break;
            case 2:
                final = 2;
                break;
            case 3:
                final = 3;
                break;
            case 4:
                final = 4;
                break;
        }

    }
    if (col < 36 && col > 20) {
        pattern = getRandomInt(5);
        switch (pattern) {
            case 1:
                final = 5;
                break;
            case 2:
                final = 6;
                break;
            case 3:
                final = 7;
                break;
            case 4:
                final = 8;
                break;
            case 5:
                final = 9;
                break;
            case 6:
                final = 10;
                break;
        }
    }
    if (col < 40 && col > 35) {
        pattern = getRandomInt(3);
        switch (pattern) {
            case 1:
                final = 11;
                break;
            case 2:
                final = 12;
                break;
            case 3:
                final = 13;
                break;
            case 4:
                final = 14;
                break;
        }
    }
    if (col == 40) {
        final = 15;
    }
    final -= 1;

    var id = [
        'XXX\
        XXX',


        '       XXX\
                XXX',


        '               XXX\
                        XXX',


        '                       XXX\
                                XXX',


        'XXX    XXX\
        XXX    XXX',


        'XXX            XXX\
        XXX            XXX',


        'XXX                    XXX\
        XXX                    XXX',


        '       XXX     XXX\
                XXX     XXX',


        '       XXX             XXX\
                XXX             XXX',


        '               XXX     XXX\
                        XXX     XXX',


        'XXX    XXX     XXX\
        XXX    XXX     XXX',


        'XXX            XXX     XXX\
        XXX            XXX     XXX',


        'XXX    XXX             XXX\
        XXX    XXX             XXX',

        
        '       XXX     XXX     XXX\
                XXX     XXX     XXX',


        'XXX    XXX     XXX     XXX\
        XXX    XXX     XXX     XXX',
      ];

      console.log(id[final])

    lvl()

}

function go() {

    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {

        lvl();

        if (key && key.ctrl && key.name == 'c') {
            process.exit();
        }

        if (key && key.name == 'd') {
            console.log("xd")
        }

    });

    process.stdin.setRawMode(true);
    process.stdin.resume();

}


