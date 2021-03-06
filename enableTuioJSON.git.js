var script2=document.createElement('script');script2.src='https://raw.github.com/raffael-me/tuioJSON-Parser/master/lib/tuioJSONParser.js';script2.type='text/javascript';
document.head.appendChild(script2);

setTimeout(function(){
	var parser	= new tuioJSONParser({
		logAll: false
	});


		// initialize a WebSocket Object
		socket = new WebSocket('ws://127.0.0.1:8787/jWebSocket/jWebSocket');
		
		// define Callback handler for opOpen event
		socket.onopen = function(){
			socket.send('{"ns":"de.dfki.touchandwrite.streaming","type":"register","stream":"touchandwriteevents","utid":3}');
			console.log("tuioJSON is ready");
			var event	= document.createEvent('CustomEvent');
			event.initCustomEvent('tuiojsonready', true, true, 1);
			document.dispatchEvent(event);
		}
		
		// define Callback handler for onMessage event
		socket.onmessage = function(msg){
			// extract JSON data from message
			var data = JSON.parse(msg.data);
			// post Timestamp
			if (window.location.hash.indexOf('logtimestamp')!=-1) console.log("receive@"+new Date());
			// and pass it to the TuioJSON parser
			parser.parse(data);
		}
		
}, 2000);