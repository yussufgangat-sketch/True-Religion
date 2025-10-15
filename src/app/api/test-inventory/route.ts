import { NextRequest, NextResponse } from 'next/server';
import { getProductStock, checkAvailability } from '@/lib/inventory';

export async function GET(req: NextRequest) {
  try {
    console.log('🧪 Testing inventory system...');
    
    // Test with first product
    const testProductId = 'tr1';
    console.log('🔍 Testing with product ID:', testProductId);
    
    // Test getProductStock
    const stockData = await getProductStock(testProductId);
    console.log('📊 Stock data result:', stockData);
    
    // Test checkAvailability
    const isAvailable = await checkAvailability(testProductId, 'S', 1);
    console.log('✅ Availability check result:', isAvailable);
    
    return NextResponse.json({
      success: true,
      testProductId,
      stockData,
      isAvailable,
      message: 'Inventory test completed'
    });
    
  } catch (error) {
    console.error('❌ Inventory test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Inventory test failed'
    }, { status: 500 });
  }
}



