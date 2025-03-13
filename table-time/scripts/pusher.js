// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("999673f7c045421210be", {
  cluster: "us3",
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", function (data) {
  alert(JSON.stringify(data));
});
