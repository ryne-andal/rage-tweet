var twitter = require('twitter');
var Slack = require('slack-node')


// Let's fetch Josh's latest tweets...

var twitterClient = new twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});

var params = {screen_name: 'joshstrange', count: 200};

var rageTweets = [];

twitterClient.get("statuses/user_timeline", params, function(error, tweets, response) {
	if(error) throw error;
	// console.log(tweets);
	// console.log(response);
	
	//Let's find out how many times Josh has deposited to the swear jar.
	tweets.forEach(function(val, index) {
		findNaughtyBits(val)
	});
	
	if(rageTweets.length > 0) {
		var randomTweet = randomNumberino(1, rageTweets.length);

		
		var slack = new Slack();
		slack.setWebhook('');
		//select a random rage tweet to push to slack.
		slack.webhook({
			channel: "#general",
			username: "josh-rage",
			text: "*JOSH STRANGE RAGE TWEET OF THE DAY* <"+rageTweets[randomTweet]+">"
		}, function(err, response) {
			console.log(response);
		});
		
	}
});

function randomNumberino(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function findNaughtyBits(tweet) {
	
	//TODO: This list needs to be longer, lol.
	var swearDictionary = [
		"fuck",
		"shit",
		"cunt",
		"moron",
		"douche",
		"ass",
		"bitch"
	];
	
	//Find each instance of rage tweets and append to a rage tweet array.
	swearDictionary.forEach(function(val, index) {
		var search = tweet.text.search(val);
		if(search !== -1) {
			rageTweets.push("https://twitter.com/joshstrange/status/"+tweet.id_str);
		}
	})
}