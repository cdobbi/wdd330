const crypto = require("crypto");

const body = JSON.stringify({
  data: '{"message":"hello world"}',
  name: "my-event",
  channel: "my-channel",
});

const bodyMd5 = crypto.createHash("md5").update(body).digest("hex");

console.log("Body MD5:", bodyMd5);
