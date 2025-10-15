import { NextRequest, NextResponse } from 'next/server';
import { deductStock } from '@/lib/inventory';

export async function POST(req: NextRequest) {
  try {
    console.log('📦 DEDUCTING STOCK...');
    
    const body = await req.json();
    const { items } = body;
    
    console.log('📝 Items to deduct stock for:', JSON.stringify(items, null, 2));
    
    const results = [];
    
    try {
      console.log(`📦 Deducting stock for ${items.length} items`);
      
      await deductStock(items);
      
      console.log(`✅ Successfully deducted stock for all items`);
      return NextResponse.json({ 
        success: true, 
        message: 'Stock deducted successfully'
      });
      
    } catch (error) {
      console.error(`❌ Error deducting stock:`, error);
      return NextResponse.json({ 
        success: false, 
        error: error.message || 'Failed to deduct stock'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('❌ Error in deduct-stock API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to deduct stock' 
      },
      { status: 500 }
    );
  }
}
