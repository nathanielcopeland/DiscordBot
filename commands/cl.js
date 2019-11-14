module.exports = {
    name: 'cl',
    execute(message, args){   
    var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");

    message.channel.send(cappedlist);
     },
    };