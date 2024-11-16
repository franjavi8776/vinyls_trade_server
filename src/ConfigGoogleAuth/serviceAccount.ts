interface ServiceAccount {
  type: string | undefined;
  project_id: string | undefined;
  private_key_id: string | undefined;
  private_key: string | undefined;
  client_email: string | undefined;
  client_id: string | undefined;
  auth_uri: string | undefined;
  token_uri: string | undefined;
  auth_provider_x509_cert_url: string | undefined;
  client_x509_cert_url: string | undefined;
  universe_domain: string | undefined;
}

const serviceAccount: ServiceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

export default serviceAccount;
