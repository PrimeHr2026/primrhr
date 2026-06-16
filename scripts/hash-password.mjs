// Generate an ADMIN_PASSWORD_HASH and AUTH_SECRET for .env
// Usage: node scripts/hash-password.mjs "yourPassword"
import { scryptSync, randomBytes } from "crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "yourPassword"');
  process.exit(1);
}
const salt = randomBytes(16);
const hash = scryptSync(password, salt, 32);
console.log("ADMIN_PASSWORD_HASH=" + salt.toString("hex") + ":" + hash.toString("hex"));
console.log("AUTH_SECRET=" + randomBytes(32).toString("hex"));
