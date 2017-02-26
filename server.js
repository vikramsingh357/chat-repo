'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var obj = {data: [ {key:0, value:['are','you']},{key:1,value:['leave']}, {key:2,value:['privlidge','leave']}, {key:3,value:['advance','leave']}, {key:4,value:['optional','holiday']}, {key:5,value:['attendance','regularization']}, {key:6,value:['advance','salary']}, {key:7,value:['letter','recommnedation']}, {key:8,value:['cpa']}, {key:9,value:['cpa','subordinates']}, {key:10,value:['commit','CPA','']}, {key:11,value:['project','party']}, {key:12,value:['Procedure','Promotion']}, {key:13,value:['emee','gift','collect']}, {key:14,value:['update','primary','skill']}]};
TopValues=['I\'m good./\n WBU?','\"Go to Pi -> Apps -> Leave and Attendance Management System -> Click Apply Leave-> Select Leave Type as Priviledge Leave >> Enter Date >> Mention Comment >> Click Submit',
'\"Go to Pi -> Apps -> Leave and Attendance Management System -> Click Apply Leave-> Select Leave Type as Priviledge Leave >> Enter Date >> Mention Comment >> Click Submit',
'\"This leave type can be applied only when Privilege Leave balance is not enough. You can utilize maximum 5 days. Go to Pi >> Apps >> Leave and Attendance Management System >> Click ""Apply Leave"" >> Select Leave Type as Priviledge Leave >> Enter Date >> Mention Comment >> Click Submit >> This will open extended option of advance leave in the same window. Kindly access LAMS portal using below Internet link if you do not have access to Persistent Intranet',
'\"Please apply for Optional holiday instead of Optional Leave Go to Pi >> Apps >> Leave and Attendance Management System >> Click ""Apply Leave"" >> Select Leave Type as ""Optional Holiday >> Enter Holiday Name from dropdown list  >> Enter date and reason >> Click Submit',
'While applying for attendance regularization, employee need to apply for entire 9 hour (working) shift for that day.',
'"The following pointers have to be kept in mind before availing advance salary:/\n 1.Maximum amount provided will be one month’s salary./\n2.The Advance salary will be recovered immediately from next pay cycle. /\n3.Advance salary can be taken only once in 6 months/\n4.Your Duration in persistent >= /\n6.Please allow up-to 5-7 business days to process the same due to internal dependencies:/\n Kindly fill out the information''
'Drop email to ask_hr@persistent.com with request to issue letter. Raise Remedy under HR. Pi >> Remedy >> HR >> Enter Summary / Description >> Tier 1 - HR Operations - Others >> Tier 2 -Request for letters - Others >> Click - Submit'
'\"Please find the CPA self help tool: https:\/\/persistent.yonyx.com\/y\/conversation\/?id=bbe41770-1b1c-11e5-9050-bc764e1116a6/\n    Go to Pi >> apps >>eMee >> Click : People Panel >> Under Search : Select Direct Reportee >> Click on image of reportee and select >> Click ""Profile"" icon at bottom tab >> In Ashram UI >> Click on ""View CPA "" >> Commit CPA./\n   Visit emee page at http:\/\/emee.persistent.co.in\/eMeeTimes.aspx.  "    ',
'\"Please find the CPA self help tool: https:\/\/persistent.yonyx.com\/y\/conversation\/?id=bbe41770-1b1c-11e5-9050-bc764e1116a6/\n    Go to Pi >> apps >>eMee >> Click : People Panel >> Under Search : Select Direct Reportee >> Click on image of reportee and select >> Click ""Profile"" icon at bottom tab >> In Ashram UI >> Click on ""View CPA "" >> Commit CPA./\n   Visit emee page at http:\/\/emee.persistent.co.in\/eMeeTimes.aspx.  "    ',
'\"Please find the CPA self help tool: https:\/\/persistent.yonyx.com\/y\/conversation\/?id=bbe41770-1b1c-11e5-9050-bc764e1116a6/\n    Go to Pi >> apps >>eMee >> Click : People Panel >> Under Search : Select Direct Reportee >> Click on image of reportee and select >> Click ""Profile"" icon at bottom tab >> In Ashram UI >> Click on ""View CPA "" >> Commit CPA./\n   Visit emee page at http:\/\/emee.persistent.co.in\/eMeeTimes.aspx.  "    ',
'"Raise the project party request in the system. Refer to the self help link :- https:\/\/persistent.yonyx.com\/y\/conversation\/?id=d68c5dd0-d5f3-11e4-9f60-bc764e11861e/\nEnsure the request gets approved by the approver. Employee to fill out the cash voucher duly signed by project party requestor, along with the bill to be submitted to the Finance Team at your location. Refer to the policy through : https:\/\/pi.persistent.co.in\/sites\/Company-Policies\/Policy\/Project%20party.pdf"    ',
'"Please refer to the promotion policy to know about the eligiblity criteria and process : https:\/\/pi.persistent.co.in\/sites\/Company-Policies\/Policy\/Promotion%20policy.pdf#search=PROMOTION/\nFor more details connect with ask_hr@persistent.com"',
'Please follow the yonyx link , it’s a self-help tool which will guide you step by step to gift in Emee :- https:\/\/persistent.yonyx.com\/y\/conversation\/?id=93b8c670-8f73-11e6-a94c-bc764e10d166 ',
'Pi >> Apps >> Employee Enterprise : Mitra-EP >> Click on " Professional" >> Go to "Project Experience" >> Add the project details and skill >> Click on "Skill Summary" to check on the listed skills= and skill type which are declared in project experience >> Click on " Primary Skills " >> Click on drop down arrow which will list the skill type >> Select the skill type mapped with the skill which you want to make it as "Primary Skill". Note only two skill can be declared as primary in the system.',
];
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;

    switch (path) {
        case '/':
            path = "/chat.html";
	    fs.readFile(__dirname + path, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write('File not found!');
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write('File not found!');
            response.end();
            break;
    }
});

// Use this while debugging in node-debug
//server.listen(8001);

// Use this while deploying to heroku
server.listen(process.env.PORT);

var listener = io.listen(server);

//global.testContext = 0;
/* Array that holds the location data of all the devices currently connected */
global.deviceLocationData = [];
/* Array that holds the session data for all the connected clients */
global.allClients = [];


listener.sockets.on('connection', function (socket) {
    /* Push the current socket to the allClients array */
    allClients.push(socket);
    var deviceSessionId = allClients.indexOf(socket);

    socket.emit('deviceSessionData', { 'deviceSessionId': deviceSessionId });

    socket.on('disconnect', function () {
        console.log('Got disconnect!');

        var deviceSessionId = allClients.indexOf(socket);
        /* Remove the session from the allClients array */
        allClients.splice(deviceSessionId, 1);

        /* Remove the location data from the deviceLocationData array */
        deviceLocationData.splice(deviceSessionId, 1);

    });

    socket.on('chat message', function (msg_from_user) {

        var response_from_narad_muni = getResponseFromAIChatBot(msg_from_user);
        socket.emit('chat message', response_from_narad_muni);
    });

});

// AI Chatbot API Interface methods

var getResponseFromAIChatBot = function (msg_from_user)
{
	var response_from_agent_bot = findalltheWords(msg_from_user);
	
    // TODO: Bring this response from AI Chatbot API Interface
   //var response_from_agent_bot = "Narayan! Narayan! Bolo Watse, kis duwidha mein ho?";

    return response_from_agent_bot;
}

var findalltheWords = function (sentence) {

 var diffWords = [];
    var words = sentence.replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
    words.forEach(function (word) {
        if (!(diffWords.indexOf(word) > -1)) {
            diffWords.push(word);
        }
    });

    var array = [];
    var index;
    array = ['from', 'how', 'to', 'want', 'the', 'for', 'in', 'need', 'only'];

    array.forEach(function (word) {
index=diffWords.indexOf(word);
        if (index > -1) {

            diffWords.splice(index, 1);
        }
    });
    return diffWords;
}
var getreply = function(keywords)
{
	var index;
    obj.data.forEach(function(itm)  {
        itm.forEach(function(i) {
            keywords.forEach(function(x){
		    if(i==x)
			 index=itm.indexOf(i);
	    });
        });
    });
}
