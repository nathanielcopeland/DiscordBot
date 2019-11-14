module.exports = {
    name: 'r',
    execute(message, args){
        //message.channel.send("working")
        var resetTime = fs.readFileSync("resetTime.txt").toString().split("\n");
        for(i in resetTime) {
            var citDay = resetTime[0];
            var citHours = resetTime[1];
            var citMinutes = resetTime[2];
            
    }
   
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
    var citadelChannel = client.channels.find(channel => channel.id === '410405053807984640');
    message.channel.send(citadelMessage);
    
    },
};