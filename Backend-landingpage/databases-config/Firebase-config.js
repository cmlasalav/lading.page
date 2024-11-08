require("dotenv").config();
var admin = require("firebase-admin");

var serviceAccount = {
  type: process.env.Firebase_Type,
  project_id: process.env.Firebase_Project_Id,
  private_key_id: process.env.Firebase_Private_Key_Id,
  private_key: process.env.Firebase_Private_Key.replace(/\\n/g, "\n"),
  client_email: process.env.Firebase_client_email,
  client_id: process.env.Firebase_client_id,
  auth_uri: process.env.Firebase_auth_uri,
  token_uri: process.env.Firebase_Token_uri,
  auth_provider_x509_cert_url: process.env.Firebase_auth_provider,
  client_x509_cert_url: process.env.Firebase_client_cert,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket : process.env.Firebase_Storage_domain
});

const auth = admin.auth();
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { auth, db, bucket };
