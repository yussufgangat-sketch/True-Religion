import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('🧪 TEST ORDER API CALLED');
    
    let body;
    try {
      body = await req.json();
      console.log('📝 Request body received:', JSON.stringify(body, null, 2));
    } catch (jsonError) {
      console.log('⚠️ JSON parsing failed, using empty object:', jsonError);
      body = {};
    }
    
    // Simple order processing without Firebase
    const testOrder = {
      orderId: `TEST-${Date.now()}`,
      customerName: body.customerName || 'Test Customer',
      customerEmail: body.customerEmail || 'test@example.com',
      timestamp: new Date().toISOString(),
      items: body.orderData?.items || [],
      total: body.orderData?.total || 0
    };
    
    console.log('✅ Test order created:', testOrder);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test order processed successfully',
      orderId: testOrder.orderId,
      testOrder
    });

  } catch (error) {
    console.error('❌ TEST ORDER ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Test order failed' 
      },
      { status: 500 }
    );
  }
}