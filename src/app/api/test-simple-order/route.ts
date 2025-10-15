import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('🧪 TESTING SIMPLE ORDER...');
    
    const body = await req.json();
    console.log('📝 Received data:', JSON.stringify(body, null, 2));
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Test order completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test order completed successfully',
      orderId: 'TEST-12345'
    });

  } catch (error) {
    console.error('❌ Test order error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Test order failed' 
      },
      { status: 500 }
    );
  }
}



