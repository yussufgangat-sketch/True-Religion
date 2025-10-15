import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      console.log('⚠️ JSON parsing failed:', jsonError);
      body = { error: 'Invalid JSON' };
    }
    
    return NextResponse.json({ 
      status: 'ok', 
      message: 'POST request received',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to process request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
