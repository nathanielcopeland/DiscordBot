module.exports = {
    name: 'citupdatetimer',
    execute(message, args){
    if(args.length == 3) {
        var theday = new Date().getDay();
        var thehour = new Date().getHours();
        var theminute = new Date().getMinutes();
        
        
        var resetTime = fs.readFileSync('resetTime.txt').toString().split("\n");
        timer = '';
        theday = ((theday + parseInt(args[0])) % 7) + 1;
        thehour = ((thehour + parseInt(args[1])) % 24);
        theminute = ((theminute + parseInt(args[2])) % 60) + 1;
        timer = timer + theday + "\n";
        timer = timer + thehour + "\n"
        timer = timer + theminute + "\n"
        // for(i = 0; i < args.length; i++){

        //     timer = timer + `${args[i]}` +  "\n";
        // }

        fs.writeFile('resetTime.txt', timer , function (err) {
            if (err) throw err;
            console.log('worked!');
        });
    } else if (args.length == 0) {
        var resetTime = fs.readFileSync('resetTime.txt').toString().split("\n");
        message.channel.send(resetTime);
    }
},
};