import { MongoClient } from 'mongodb';  // Removed unused WithId and Document

const uri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;

const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db('CleverSoul');
};

// Define GET handler for Next.js app directory
export const GET = async (_req: Request) => {  // Prefixed req with underscore
    try {
        // Calculate start and end of the current day in UTC
        const now = new Date();
        const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
        const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

        console.log("Start of Day (UTC):", startOfDay.toISOString());
        console.log("End of Day (UTC):", endOfDay.toISOString());

        // Connect to the database
        const db = await connectToDatabase();
        const collection = db.collection('Answers');

        // Query for answers within today's UTC date range
        const answers = await collection.find({
            timestamp: {
                $gte: startOfDay.toISOString(),
                $lte: endOfDay.toISOString(),
            },
        }).toArray();

        // Respond with the fetched data
        return new Response(JSON.stringify({ success: true, data: answers }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching answers:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
