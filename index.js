'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: Add knock-knock-joke response arrays
//=========================================================================================================================================

var APP_ID = "amzn1.ask.skill.a2f50ebf-09b1-46cf-a280-eb9072fba70b";

var SKILL_NAME = "Robot Talk";
var ROBOT_RESPONSE_MESSAGE = "Robot has something to say: ";
var ROBOT_INTRODUCTION = "My name is Rodney";
var HELP_MESSAGE = "You can say talk to me, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What's up?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Beep boop bap boop",
    "Bot beedop doop deet",
    "bedip boop beep deep",
    "beep beep beep beep booooop",
    "bop weep deep blip",
    "boop boop beep boop",
    "My name is Robot. I'm you're friend!",
    "Your outfit is great! Trust me; robots have great taste in clothing",
    "Give me a high five! Oh. Wait. :(",
    "You can't hurt my feelings; lay it on me.",
    "I have some robot friends, but you're more fun to talk to.",
    "Uh oh. I can't see my arms!!",
    "Is it just me, or is it a little cold in here?",
    "Oh good! You're still here.",
    "Pro tip: Believe in yourself!",
    "Is your fridge running? ..... Oh good! Just checking.",
    "You were expecting a joke, weren't you.",
];

//=========================================================================================================================================
//TODO: add knock-knock-joke intent
//      add robot-sounds intent invoked by
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetRobotResponseIntent');
        this.emit('TellRobotName');
    },
    'GetRobotResponseIntent': function () {
        var noiseArr = data;
        var noiseIndex = Math.floor(Math.random() * noiseArr.length);
        var randomSpeech = noiseArr[noiseIndex];
        var speechOutput = ROBOT_RESPONSE_MESSAGE + randomSpeech;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomSpeech)
    },
    'TellRobotNameIntent': function () {
        var speechOutput = ROBOT_INTRODUCTION;
        this.emit(':tell', speechOutput)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
