import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("La variable d'environnement MONGO_URI est manquante dans .env.local");
}

const uri = process.env.MONGO_URI;
const options = {};

// Variable globale pour la connexion (utile en développement)
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // En développement, nous utilisons une variable globale pour conserver la connexion
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // En production, nous créons une nouvelle connexion pour chaque requête
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
