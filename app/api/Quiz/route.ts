import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;

// Helper function to connect to the MongoDB database
const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("CleverSoul");
};

// Handle GET requests to fetch quiz data for a specific date
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // Expected in YYYY-MM-DD format

    // If no date parameter is provided, return an error
    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
    }

    // Parse the date and calculate start and end of the day in UTC
    const providedDate = new Date(date);
    const startOfDay = new Date(Date.UTC(providedDate.getUTCFullYear(), providedDate.getUTCMonth(), providedDate.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(providedDate.getUTCFullYear(), providedDate.getUTCMonth(), providedDate.getUTCDate(), 23, 59, 59, 999));

    // Connect to the database and fetch the answers from the 'Answers' collection
    const db = await connectToDatabase();
    const collection = db.collection("Answers");

    // Query for answers within the specified date range
    const answers = await collection.find({
      timestamp: {
        $gte: startOfDay.toISOString(),
        $lte: endOfDay.toISOString(),
      },
    }).toArray();

    // If quizzes are found, return them in the response
    if (answers.length > 0) {
      return NextResponse.json({ success: true, quiz: answers });
    } else {
      return NextResponse.json({ success: false, message: "No quiz found for the given date." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
