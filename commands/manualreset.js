module.exports = {
    name: 'manualreset',
    execute(message, args){   
    var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
    var weeksrecorded = fs.readFileSync("weeksrecorded.txt").toString().split("\n");
    var weekrecorded = parseInt(weeksrecorded[0])
    weekrecorded += 1;
    var rankedChannel = client.channels.find(channel => channel.id === '612869936913711114');
    
    rankedChannel.send("The CitadelBot has recorded: " + weekrecorded + " build ticks.");
            
            fs.writeFile('weeksrecorded.txt', weekrecorded , function (err) {
                if (err) throw err;
                console.log('worked!');
            });
    
     rankedChannel.send("List of people that capped: ")
    for(i = 0; i < cappedlist.length; i++){
        
            rankedChannel.send(cappedlist[i]);
            
        
    }
    fs.truncate("cappedList.txt", 0, function(){console.log('done')})
     },
    };