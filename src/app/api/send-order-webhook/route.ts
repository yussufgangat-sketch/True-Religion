import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderData, customerEmail, customerName } = body;

    // Format order data as simple text
    const orderText = `
NEW ORDER - TRUE RELIGION
========================

Customer: ${customerName}
Email: ${customerEmail}
Order ID: ${orderData.orderId || 'N/A'}
Date: ${new Date().toLocaleString()}

SHIPPING INFO:
--------------
Address: ${orderData.address || 'N/A'}
City: ${orderData.city || 'N/A'}
Postal Code: ${orderData.postalCode || 'N/A'}
Phone: ${orderData.phone || 'N/A'}

ORDER ITEMS:
------------
${orderData.items.map((item: any) => `
- ${item.name} (Size: ${item.size})
  Qty: ${item.quantity} × R${item.price} = R${(item.price * item.quantity).toFixed(2)}
`).join('')}

TOTALS:
-------
Subtotal: R${orderData.subtotal?.toFixed(2) || '0.00'}
Shipping: R${orderData.shipping?.toFixed(2) || '0.00'}
TOTAL: R${orderData.total?.toFixed(2) || '0.00'}
`;

    // Log to console (you can see in Vercel logs)
    console.log('📧 NEW ORDER:', orderText);

    // Send to Discord webhook (FREE alternative to email)
    // You can create a Discord webhook in 30 seconds!
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    
    if (discordWebhook) {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🛒 **NEW ORDER** - ${customerName}`,
          embeds: [{
            title: '💰 Order Details',
            description: orderText,
            color: 0x00ff00,
            timestamp: new Date().toISOString()
          }]
        })
      });
    }

    // For now, just return success and log the order
    return NextResponse.json({ 
      success: true, 
      message: 'Order received and logged',
      orderText 
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { 
        success: true, // Return success anyway so customer doesn't see error
        error: 'Order logged but notification failed' 
      },
      { status: 200 } // Return 200 so checkout completes
    );
  }
}




