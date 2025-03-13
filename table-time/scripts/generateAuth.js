const crypto = require("crypto");

const appId = "1957068";
const appKey = "999673f7c045421210be";
const appSecret = "f38c091aeb07c7e5194a"; // Your app secret
const timestamp = 1741817567; // Updated timestamp

const body = JSON.stringify({
  data: '{"message":"hello world"}',
  name: "my-event",
  channel: "my-channel",
});

const bodyMd5 = crypto.createHash("md5").update(body).digest("hex");
const stringToSign = `POST\n/apps/${appId}/events\nauth_key=${appKey}&auth_timestamp=${timestamp}&auth_version=1.0&body_md5=${bodyMd5}`;

const authSignature = crypto
  .createHmac("sha256", appSecret)
  .update(stringToSign)
  .digest("hex");

console.log("Timestamp:", timestamp);
console.log("Body MD5:", bodyMd5);
console.log("Auth Signature:", authSignature);
