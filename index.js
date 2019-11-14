
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
var fs = require("fs");

const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");

    
        // //console.log(cappedlist[i]);
        // function listMajors(auth) {
        //     const sheets = google.sheets({version: 'v4', auth});
        //     sheets.spreadsheets.values.get({
        //       spreadsheetId: '162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY',
        //       range: 'Currency!A3:D',
        //     }, 
        //     (err, res) => {
        //     for(i = 1; i < cappedlist.length; i++){ // runs through list comparing to spreadsheet
        //         //console.log('Name: ' + cappedlist[i]);
        //         var added = false;
        //       if (err) return console.log('The API returned an error: ' + err);
        //       const rows = res.data.values;
        //       if (rows.length) {
                
        //         // Print columns A and E, which correspond to indices 0 and 4.
        //         var l = 3;
        //         rows.map((row) => {
        //           //console.log(`${row[0]}, ${row[2]}`);
        //           var capName = cappedlist[i].replace(/\s/g,'');
        //           //console.log(row[0]);
        //           if(row[0] == capName){
        //             console.log(`${row[0]}, ${row[2]}`);
        //               added = true;
        //               console.log(l);
        //               sheets.spreadsheets.values.update({
        //                   spreadsheetId: "162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY",
        //                   range: "Currency!C" + l, //Saves the row at the old index from before
        //                   valueInputOption: "RAW",
        //                   resource: {
        //                       values: [[parseInt(row[2]) + 1]]
        //                   },
        //               }, (err, result) => {
        //                   if (err) {
        //                       console.log(err);
        //                   } else {
        //                       console.log('%d cells updated.', result.data.updatedRows);
        //                   }
        //               });
        //           }
                  
                  
        //           l ++;
                 
                  
        //         });
        //          } //else {
        //     //     console.log('No data found.');
        //     //   }
        //       if(!added){
        //         console.log("Failed to add: " + cappedlist[i].replace(/\s/g,''));
        //         sheets.spreadsheets.values.append({
        //             spreadsheetId: "162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY",
        //             range: "Currency!A:D", //Saves the row at the old index from before
        //             valueInputOption: "USER_ENTERED",
        //             resource: {
        //                 values: [[cappedlist[i].replace(/\s/g,''),"=Items!K9*C" + l + "-D" + l, "1", "0" ]]
        //             },
        //         }, (err, result) => {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log('%d cells updated.', result.data.updatedRows);
        //             }
        //         });
        //        // });
    
        //     }
        //     }
        //     });
        //   }



let mysql = require('mysql')
let config = require('./configmysql.js');
let connection = mysql.createConnection(config);

var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
for(i in cappedlist) {
    
}
    // console.log(data);
    // cappedlist.push(data);
    // console.log(cappedlist);

var weeksrecorded = fs.readFileSync("weeksrecorded.txt");
client.once('ready', () => {
    
    //nat discord id 566283643664859137
    var citadelChannel = client.channels.find(channel => channel.id === '414644210390663178');
    var testChannel = client.channels.find(channel => channel.id === '566283643664859137');
    var rankedChannel = client.channels.find(channel => channel.id === '612869936913711114');
    var newmonth = true;
    //clan log 612869936913711114
    // ranked channel 453854088606646274

    var interval = setInterval(function() {

        var resetTime = fs.readFileSync("resetTime.txt").toString().split("\n");
            for(i in resetTime) {
                var citDay = resetTime[0];
                var citHours = resetTime[1];
                var citMinutes = resetTime[2];
                
        }
        // var citDay = 2;
        // var citHours = 10;
        // var citMinutes = 32;    
    //console.log(resetMiliSeconds);
    //var resetMiliSeconds = '644400000';
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var datetime = new Date();
    var day = new Date().getDay();
    var date = new Date().getDate();
    

    if (date == 9 && newmonth == true){
        testChannel.send("Oyster has Reset");
        testChannel.send(newmonth);
        newmonth = false; 
    }

    if (day == 2 && newmonth == false){
        newmonth = true;
    }
    //console.log(day);
    // if(day >= 2 && hours >= 2 && minutes>=11 && seconds >=0){// come back to this
    //     citDay = citDay + 7;
    // }
    
    
    var dayMiliSeconds = day * 24 * 60 * 60 * 1000;
    var hoursMiliSeconds = hours * 60 * 60 * 1000;
    var minutesMiliSeconds = minutes * 60 * 1000;
    var secondsMiliSeconds = seconds * 1000;
    var currentTimeMS = dayMiliSeconds + hoursMiliSeconds + minutesMiliSeconds + secondsMiliSeconds;

    var resetMiliSeconds = (citDay * 24 * 60 * 60 * 1000) + (citHours * 60 * 60 * 1000) + (citMinutes * 60 * 1000);
     if(currentTimeMS >= resetMiliSeconds){
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
        timeLeftMinutesDisplay = timeLeftMinutes.slice(0,1);
    } else {
        timeLeftMinutesDisplay = timeLeftMinutes.slice(0,2);
    }
    //console.log(timeLeftMinutesDisplay + " minutes")
   // console.log(timeLeftMinutes + " minutes");
   var dayleft = citDay - day;
    
    citadelMessage = "There are " + timeLeftDaysDisplay + " days " + timeLeftHoursDisplay + " hours " + timeLeftMinutesDisplay + " minutes " + "remaining until the clan citadel resets";
    //message.channel.send(citadelMessage);
    // client.channels.get('general').send("hey");

        if(resetMiliSeconds - currentTimeMS == 1000){
            
            var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
            var weeksrecorded = fs.readFileSync("weeksrecorded.txt").toString().split("\n");
            var weekrecorded = parseInt(weeksrecorded[0])
            weekrecorded += 1;
            rankedChannel.send("The CitadelBot has recorded: " + weekrecorded + " build ticks.");        
                    fs.writeFile('weeksrecorded.txt', weekrecorded , function (err) {
                        if (err) throw err;
                        console.log('worked!');
                    });
            rankedChannel.send((cappedlist.length - 1) + " people have capped this week.");        
            rankedChannel.send("List of people that capped: ");
            for(i = 0; i < cappedlist.length; i++){
                
                    rankedChannel.send(cappedlist[i]);   
            }

            fs.readFile('credentials.json', (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Sheets API.
                authorize(JSON.parse(content), listMajors);
              });

            var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
               //console.log(cappedlist[i]);
        function listMajors(auth) {
            const sheets = google.sheets({version: 'v4', auth});
            sheets.spreadsheets.values.get({
              spreadsheetId: '162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY',
              range: 'Currency!A3:D',
            }, 
            (err, res) => {
            for(i = 1; i < cappedlist.length; i++){ // runs through list comparing to spreadsheet
                //console.log('Name: ' + cappedlist[i]);
                var added = false;
              if (err) return console.log('The API returned an error: ' + err);
              const rows = res.data.values;
              if (rows.length) {
                
                // Print columns A and E, which correspond to indices 0 and 4.
                var l = 3;
                rows.map((row) => {
                  //console.log(`${row[0]}, ${row[2]}`);
                  var capName = cappedlist[i].replace(/\s/g,'');
                  //console.log(row[0]);
                  if(row[0] == capName){
                    console.log(`${row[0]}, ${row[2]}`);
                      added = true;
                      console.log(l);
                      sheets.spreadsheets.values.update({
                          spreadsheetId: "162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY",
                          range: "Currency!C" + l, //Saves the row at the old index from before
                          valueInputOption: "RAW",
                          resource: {
                              values: [[parseInt(row[2]) + 1]]
                          },
                      }, (err, result) => {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log('%d cells updated.', result.data.updatedRows);
                          }
                      });
                  }
                  
                  
                  l ++;
                 
                  
                });
                 } //else {
            //     console.log('No data found.');
            //   }
              if(!added){
                console.log("Failed to add: " + cappedlist[i].replace(/\s/g,''));
                sheets.spreadsheets.values.append({
                    spreadsheetId: "162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY",
                    range: "Currency!A:D", //Saves the row at the old index from before
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [[cappedlist[i].replace(/\s/g,''),"=Items!K9*C" + l + "-D" + l, "1", "0" ]]
                    },
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('%d cells updated.', result.data.updatedRows);
                    }
                });
               // });
    
            }
            }
            });
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
        
    }

    if(command === 'citupdatetimer'){
        if(args.length == 3) {
            var theday = new Date().getDay();
            var thehour = new Date().getHours();
            var theminute = new Date().getMinutes();
            
            
            var resetTime = fs.readFileSync('resetTime.txt').toString().split("\n");
            timer = '';
            theday = ((theday + parseInt(args[0])) % 7);
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
    }


    //console.log(message.content);
    var testChannel = client.channels.find(channel => channel.id === '566283643664859137');
    var citadelChannel = client.channels.find(channel => channel.id === '414644210390663178');
    msgLowerCase = message.content.toLowerCase();
    if(message.content.toLocaleLowerCase() == "!r") {
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


    if(message.content.toLowerCase() == '!cl'){ //displaying list of people who capped
        var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");

        message.channel.send(cappedlist);
         }

         if(message.content.toLowerCase() == '!testc'){

            fs.readFile('credentials.json', (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Sheets API.
                authorize(JSON.parse(content), listMajors);
              });

            var cappedlist = fs.readFileSync("cappedList.txt").toString().split("\n");
               //console.log(cappedlist[i]);
        function listMajors(auth) {
            const sheets = google.sheets({version: 'v4', auth});
            sheets.spreadsheets.values.get({
              spreadsheetId: '162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY',
              range: 'Currency!A3:D',
            }, 
            (err, res) => {
            for(i = 1; i < cappedlist.length; i++){ // runs through list comparing to spreadsheet
                //console.log('Name: ' + cappedlist[i]);
                var added = false;
              if (err) return console.log('The API returned an error: ' + err);
              const rows = res.data.values;
              if (rows.length) {
                
                // Print columns A and E, which correspond to indices 0 and 4.
                var l = 3;
                rows.map((row) => {
                  //console.log(`${row[0]}, ${row[2]}`);
                  var capName = cappedlist[i].replace(/\s/g,'');
                  //console.log(row[0]);
                  if(row[0] == capName){
                    console.log(`${row[0]}, ${row[2]}`);
                      added = true;
                      console.log(l);
                      sheets.spreadsheets.values.update({
                          spreadsheetId: "162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY",
                          range: "Currency!C" + l, //Saves the row at the old index from before
                          valueInputOption: "RAW",
                          resource: {
                              values: [[parseInt(row[2]) + 1]]
                          },
                      }, (err, result) => {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log('%d cells updated.', result.data.updatedRows);
                          }
                      });
                  }
                  
                  
                  l ++;
                 
                  
                });
                 } //else {
            //     console.log('No data found.');
            //   }
              if(!added){
                console.log("Failed to add: " + cappedlist[i].replace(/\s/g,''));
                sheets.spreadsheets.values.append({
                    spreadsheetId: "162y1KlrNIfqNsJr4Fwn3WeXM9U4IEFNTVlZrQ-SScfY",
                    range: "Currency!A:D", //Saves the row at the old index from before
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [[cappedlist[i].replace(/\s/g,''),"=Items!K9*C" + l + "-D" + l, "1", "0" ]]
                    },
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('%d cells updated.', result.data.updatedRows);
                    }
                });
               // });
    
            }
            }
            });
          }

         }

    // if(message.content.toLowerCase() == '!testinsert'){
    //     global.sqlusername = '1';
    //     var username = message.member.user.tag;
    //     connection.connect(function(err){
    //         connection.query(`SELECT username from cappedlist where username = 'Nat#9023'`, function (err, result, fields){
    //             if(!result.length){
    //                 message.channel.send("non existant");
    //                 connection.query(`INSERT INTO cappedlist (username) VALUES ('` + username + `')`);
    //             } else {     
    //             Object.keys(result).forEach(function(key){
    //             var row = result[key];
    //             message.channel.send(row.username);
           
    //            sqlusername = row.username;
    //            message.channel.send("updating");
    //            connection.query(`UPDATE cappedlist SET capNo = (capNo + 1) WHERE username = ?`, [username]);
    //             });
    //         }
    //         });
            
    //     });
    // }

    // if(message.content.toLowerCase() == '!testtime'){
        
    //     message.channel.send(theday);
    //     message.channel.send(thehour);
    //     message.channel.send(theminute);
    //     message.channel.send("hey");

    // }


         if(msgLowerCase.startsWith(`${prefix}manualreset`)){ //sends out list of people who capped and then resets the list
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
             }
})



client.login(token);