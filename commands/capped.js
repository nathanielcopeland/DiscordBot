module.exports = {
    name: 'capped',
    execute(message, args){
    if(args.length >= 1) {
    //     return message.channel.send(`Please use the correct syntax, ${message.author}!`);
    // } else if(args.length == 1){
        var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
        username = '';
        for(i = 0; i < args.length; i++){
            username =  username + `${args[i]}` + ' ';
        }
        
        //message.channel.send(username);
        var alreadycapped = false;
        cappedlist.indexOf(username) === -1 ? cappedlist.push(username) : (alreadycapped = true) ;

    if(alreadycapped == false){
        
        fs.appendFile("cappedList.txt", '\n' + username, (err) => {
            if (err) throw err;
            console.log("added to cappedList");
        });
        message.react('✅');
    }else{
        message.react('❎');
    }
    }
    
},
};