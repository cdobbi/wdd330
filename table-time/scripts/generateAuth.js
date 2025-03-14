const crypto = require("crypto");

/**
 * Generates the authentication signature and timestamp for Pusher requests.
 * @param {string} authKey - Your Pusher app key.
 * @param {string} secretKey - Your Pusher app secret.
 * @param {object} body - The event data to be sent to Pusher.
 * @returns {object} An object containing the authSignature and authTimestamp.
 */
function generateAuth(authKey, secretKey, body) {
  const authTimestamp = Math.floor(Date.now() / 1000); // Current timestamp
  const bodyMD5 = crypto
    .createHash("md5")
    .update(JSON.stringify(body))
    .digest("hex");

  const stringToSign = `POST\n/apps/1957068/events\nauth_key=${authKey}&auth_timestamp=${authTimestamp}&auth_version=1.0&body_md5=${bodyMD5}`;

  const authSignature = crypto
    .createHmac("sha256", secretKey)
    .update(stringToSign)
    .digest("hex");

  return {
    authTimestamp,
    authSignature,
  };
}

module.exports = generateAuth;
