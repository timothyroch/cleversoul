import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const uri = "mongodb+srv://timothyroch123:aaabbbccc333@cluster0.26lls.mongodb.net/CleverSoul?retryWrites=true&w=majority";
    
    if (!uri) {
      throw new Error('Missing MongoDB URI in environment configuration.');
    }

    // Database connection and logic
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('CleverSoul');
    const collection = db.collection('Answers');

    const body = await request.json();
    await collection.insertOne(body);

    // Close the connection after the operation
    await client.close();

    return NextResponse.json({ message: 'Data saved successfully!' });
    
  } catch (error) {
    console.error('Error saving data:', error);

    // Type-safe error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}
