


const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
var fs = require("fs");

let mysql = require('mysql')
let config = require('./configmysql.js');
let connection = mysql.createConnection(config);


var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
for(i in cappedlist) {
    console.log(cappedlist[i]);
}
    // console.log(data);
    // cappedlist.push(data);
    // console.log(cappedlist);


client.once('ready', () => {
    console.log('Ready!')
    //nat discord id 566283643664859137
    var citadelChannel = client.channels.find(channel => channel.id === '414644210390663178');
    var testChannel = client.channels.find(channel => channel.id === '566283643664859137');
    var rankedChannel = client.channels.find(channel => channel.id === '453854088606646274');

    var interval = setInterval(function() {
        
        var citDay = 2;
        var citHours = 10;
        var citMinutes = 32;    
    //console.log(resetMiliSeconds);
    //var resetMiliSeconds = '644400000';
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var datetime = new Date();
    var day = new Date().getDay();
    //console.log(day);
    // if(day >= 2 && hours >= 2 && minutes>=11 && seconds >=0){// come back to this
    //     citDay = citDay + 7;
    // }
    
    
    var dayMiliSeconds = day * 24 * 60 * 60 * 1000;
    var hoursMiliSeconds = hours * 60 * 60 * 1000;
    var minutesMiliSeconds = minutes * 60 * 1000;
    var secondsMiliSeconds = seconds * 1000;
    var currentTimeMS = dayMiliSeconds + hoursMiliSeconds + minutesMiliSeconds + secondsMiliSeconds;
    console.log(currentTimeMS + " hey");
    var resetMiliSeconds = (citDay * 24 * 60 * 60 * 1000) + (citHours * 60 * 60 * 1000) + (citMinutes * 60 * 1000);
     if(currentTimeMS >= resetMiliSeconds){
         citDay = 2 + 7;
     }
     console.log(citDay);
    var resetMiliSeconds = (citDay * 24 * 60 * 60 * 1000) + (citHours * 60 * 60 * 1000) + (citMinutes * 60 * 1000);
    var timeLeft = resetMiliSeconds - currentTimeMS;
    var timeLeftDays = timeLeft / (1000 * 60 * 60 * 24);
    currentTime = datetime.setDate(datetime.getDate() +30);
    var time = hours + ":" + minutes + ":" + seconds
    //console.log("resetMiliseconds = " + resetMiliSeconds);
    //console.log("currenttimems = " + currentTimeMS);
        //console.log(time);
        //console.log(datetime);
   // console.log('current time ' + currentTimeMS);
   // console.log(timeLeft);
    //console.log('time left days ' + timeLeftDays);
    var hey = timeLeftDays + '';
    timeLeftDaysDisplay = hey.slice(0,1)
    //console.log(timeLeftDaysDisplay + " days");
    slicedHours = hey.slice(1, 30);

    slicedHours = '0' + slicedHours;
    //console.log(slicedHours);
    timeLeftHours = slicedHours * 24;
    timeLeftHours = timeLeftHours + '';
    if(timeLeftHours.slice(1, 2) == "."){
        timeLeftHoursDisplay = timeLeftHours.slice(0,1);
    
    
    } else {
        timeLeftHoursDisplay = timeLeftHours.slice(0,2);
    }
    
    
    //console.log(timeLeftHoursDisplay + " hours");
    //console.log(timeLeftHours);
    if(timeLeftHours.slice(2, 3) == '.' ){
        slicedMinutes = timeLeftHours.slice(2, 30)
    } else {
        slicedMinutes = timeLeftHours.slice(1, 30)
    }
    
    //console.log(slicedMinutes);
    slicedMinutes = '0' + slicedMinutes;
    timeLeftMinutes = slicedMinutes * 60;
    timeLeftMinutes = timeLeftMinutes + '';
    if(timeLeftMinutes.slice(1, 2) == "."){
        timeLeftMinutesDisplay = timeLeftMinutes.slice(0,1);
    } else {
        timeLeftMinutesDisplay = timeLeftMinutes.slice(0,2);
    }
    //console.log(timeLeftMinutesDisplay + " minutes")
   // console.log(timeLeftMinutes + " minutes");
   var dayleft = citDay - day;
    
    citadelMessage = "There are " + timeLeftDaysDisplay + " days " + timeLeftHoursDisplay + " hours " + timeLeftMinutesDisplay + " minutes " + "remaining until the clan citadel resets";
    console.log("There are " + timeLeftDaysDisplay + " days " + timeLeftHoursDisplay + " hours " + timeLeftMinutesDisplay + " minutes " + "remaining until the clan citadel resets");
    //message.channel.send(citadelMessage);
    // client.channels.get('general').send("hey");

        console.log(resetMiliSeconds - currentTimeMS);
        if(resetMiliSeconds - currentTimeMS == 1000){
            
            var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
            rankedChannel.send("List of people that capped: ")
            for(i = 0; i < cappedlist.length; i++){
                
                    rankedChannel.send(cappedlist[i]);
                
                
            }
            citadelChannel.send("Citadel has reset!!");
            fs.truncate("cappedList.txt", 0, function(){console.log('done')})
             
        }
        // if(timeLeftDaysDisplay < '1' && timeLeftHoursDisplay < '1' &&  timeLeftMinutesDisplay < '1' ){
        //     citadelChannel.send("Citadel has reset!!");
            
            
        //     //send('Citadel has reset');
        // }
    }, 1000);
    
})


client.on('error', console.error);

client.on('message', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if(command === 'capped'){
        if(args.length >= 1) {
        //     return message.channel.send(`Please use the correct syntax, ${message.author}!`);
        // } else if(args.length == 1){
            var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
            username = '';
            for(i = 0; i < args.length; i++){
                username =  username + `${args[i]}` + ' ';
            }
            
            message.channel.send(username);
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
        
    }
    //console.log(message.content);
    var testChannel = client.channels.find(channel => channel.id === '566283643664859137');
    var citadelChannel = client.channels.find(channel => channel.id === '414644210390663178');
    msgLowerCase = message.content.toLowerCase();
    if(message.content.toLocaleLowerCase() == "!r") {
        //message.channel.send("working")
    var citDay = 2;
    var citHours = 10;
    var citMinutes = 35;
   
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var datetime = new Date();
    var day = new Date().getDay();
    var dayMiliSeconds = day * 24 * 60 * 60 * 1000;
    var hoursMiliSeconds = hours * 60 * 60 * 1000;
    var minutesMiliSeconds = minutes * 60 * 1000;
    var secondsMiliSeconds = seconds * 1000;
    var currentTimeMS = dayMiliSeconds + hoursMiliSeconds + minutesMiliSeconds + secondsMiliSeconds;
    console.log(currentTimeMS);
    var resetTime = (citDay * 24 * 60 * 60 * 1000) + (citHours * 60 * 60 * 1000) + (citMinutes * 60 * 1000);
    if(currentTimeMS >= resetTime){
        citDay = 2 + 7;
    }
    var resetMiliSeconds = (citDay * 24 * 60 * 60 * 1000) + (citHours * 60 * 60 * 1000) + (citMinutes * 60 * 1000);
    
    var timeLeft = resetMiliSeconds - currentTimeMS;
    var timeLeftDays = timeLeft / (1000 * 60 * 60 * 24);
    currentTime = datetime.setDate(datetime.getDate() +30);
    var time = hours + ":" + minutes + ":" + seconds
    //console.log("resetMiliseconds = " + resetMiliSeconds);
    //console.log("currenttimems = " + currentTimeMS);
        //console.log(time);
        //console.log(datetime);
   // console.log('current time ' + currentTimeMS);
   // console.log(timeLeft);
    //console.log('time left days ' + timeLeftDays);
    var hey = timeLeftDays + '';
    timeLeftDaysDisplay = hey.slice(0,1)
    //console.log(timeLeftDaysDisplay + " days");
    slicedHours = hey.slice(1, 30);

    slicedHours = '0' + slicedHours;
    //console.log(slicedHours);
    timeLeftHours = slicedHours * 24;
    timeLeftHours = timeLeftHours + '';
    if(timeLeftHours.slice(1, 2) == "."){
        timeLeftHoursDisplay = timeLeftHours.slice(0,1);
    
    
    } else {
        timeLeftHoursDisplay = timeLeftHours.slice(0,2);
    }
    
    
    //console.log(timeLeftHoursDisplay + " hours");
    //console.log(timeLeftHours);
    if(timeLeftHours.slice(2, 3) == '.' ){
        slicedMinutes = timeLeftHours.slice(2, 30)
    } else {
        slicedMinutes = timeLeftHours.slice(1, 30)
    }
    
    //console.log(slicedMinutes);
    slicedMinutes = '0' + slicedMinutes;
    timeLeftMinutes = slicedMinutes * 60;
    timeLeftMinutes = timeLeftMinutes + '';
    if(timeLeftMinutes.slice(1, 2) == "."){
        timeLeftMinutes = timeLeftMinutes.slice(0,1);
    } else {
        timeLeftMinutesDisplay = timeLeftMinutes.slice(0,2);
    }
    //console.log(timeLeftMinutesDisplay + " minutes")
   // console.log(timeLeftMinutes + " minutes");
   var dayleft = citDay - day;
    
    citadelMessage = "There are " + timeLeftDaysDisplay + " days " + timeLeftHoursDisplay + " hours " + timeLeftMinutesDisplay + " minutes " + "remaining until the clan citadel resets";
    console.log("There are " + timeLeftDaysDisplay + " days " + timeLeftHoursDisplay + " hours " + timeLeftMinutesDisplay + " minutes " + "remaining until the clan citadel resets");
    var citadelChannel = client.channels.find(channel => channel.id === '410405053807984640');
    message.channel.send(citadelMessage);
    
    }

    // if(message.content.startsWith(`${prefix}time`)) {
    //     var hours2 = new Date().getHours();
    //     var minutes2 = new Date().getMinutes();
    //     var seconds2 = new Date().getSeconds();
    //     var datetime2 = new Date().getDate();
    //     var correctTime = new Date().getTime();
    //     message.channel.send(correctTime);
    //     var time = hours2 + ":" + minutes2 + ":" + seconds2
    //         message.channel.send("The time is " + time)
            
    
    // }
    if(message.content.toLowerCase() == `!capped`){
        var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
        var alreadycapped = false;
        var username = message.member.displayName;
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

    console.log(cappedlist);    
     console.log(username);

    if(message.content.toLowerCase() == '!cl'){ //displaying list of people who capped
        var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
        console.log(cappedlist);
        message.channel.send(cappedlist);
         }

    if(message.content.toLowerCase() == '!testinsert'){
        var username = message.member.displayName;
        message.channel.send("hey");
        message.channel.send(username);
        var sql = `INSERT INTO cappedlist (username) VALUES ('` + username + `')`;
        var values = username;
        message.channel.send(sql);
        connection.query(sql);
            
            connection.end();
    }


    


         if(msgLowerCase.startsWith(`${prefix}manualreset`)){ //sends out list of people who capped and then resets the list
            var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
            // testChannel.send("List of people that capped: ")
            for(i = 0; i < cappedlist.length; i++){
                
                    // rankedChannel.send(cappedlist[i]);
                
                
            }
            fs.truncate("cappedList.txt", 0, function(){console.log('done')})
             }
})



client.login(token);