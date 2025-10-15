import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('🔍 SIMPLE DEBUG TEST STARTING...');
    
    let body;
    try {
      body = await req.json();
      console.log('📝 Request body received:', JSON.stringify(body, null, 2));
    } catch (jsonError) {
      console.log('⚠️ JSON parsing failed, using empty object:', jsonError);
      body = {};
    }
    
    // Test 1: Basic order creation
    const testOrder = {
      orderId: `DEBUG-${Date.now()}`,
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Test order created:', testOrder);
    
    const results = {
      basicTest: 'PASSED',
      firebaseTest: 'NOT_ATTEMPTED',
      environmentCheck: {
        hasFirebaseApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        hasFirebaseProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        nodeEnv: process.env.NODE_ENV
      }
    };
    
    console.log('🔍 Environment check:', results.environmentCheck);

    console.log('🔍 DEBUG TEST COMPLETED');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Debug test completed',
      testOrder,
      results
    });

  } catch (error) {
    console.error('❌ DEBUG TEST ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Debug test failed' 
      },
      { status: 500 }
    );
  }
}
