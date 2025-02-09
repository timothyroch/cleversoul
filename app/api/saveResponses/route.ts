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

    return NextResponse.json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);

    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
