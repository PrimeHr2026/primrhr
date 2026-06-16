import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "primehr";

let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _primehrMongo: Promise<MongoClient> | undefined;
}

export function isDbConfigured() {
  return Boolean(uri);
}

const options = {
  // Fail fast in serverless instead of hanging the whole function.
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
  socketTimeoutMS: 20000,
  maxPoolSize: 10,
};

function connect(): Promise<MongoClient> {
  // Reset the cached promise if the connection fails, so the next
  // request retries instead of reusing a rejected promise.
  return new MongoClient(uri!, options).connect().catch((e) => {
    clientPromise = null;
    if (global._primehrMongo) global._primehrMongo = undefined;
    throw e;
  });
}

function getClient(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (process.env.NODE_ENV === "development") {
    if (!global._primehrMongo) global._primehrMongo = connect();
    return global._primehrMongo;
  }
  if (!clientPromise) clientPromise = connect();
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(dbName);
}

export type ReviewDoc = {
  name: string;
  position?: string;
  company?: string;
  rating: number;
  review: string;
  approved: boolean;
  createdAt: Date;
};

export type ApplicationDoc = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  participants?: string;
  format?: string;
  timeline?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
};
