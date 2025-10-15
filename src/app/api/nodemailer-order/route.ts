import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    console.log('📧 NODEMAILER ORDER EMAIL...');
    
    const body = await req.json();
    const { orderData, customerEmail, customerName } = body;
    
    console.log('📝 Order data:', JSON.stringify(orderData, null, 2));
    
    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'trdrop2025@gmail.com',
        pass: 'wcnd mwcj bskm gsfy'
      }
    });
    
    console.log('📧 Nodemailer transporter created');
    
    // Create order email
    const orderEmail = {
      from: 'trdrop2025@gmail.com',
      to: customerEmail,
      cc: 'trdrop2025@gmail.com', // Send copy to store
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - True Religion</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f8fafc;
            }
            .container {
              max-width: 700px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: shimmer 3s ease-in-out infinite;
            }
            @keyframes shimmer {
              0%, 100% { transform: translateX(-100%) translateY(-100%); }
              50% { transform: translateX(0%) translateY(0%); }
            }
            .logo {
              font-size: 32px;
              font-weight: 900;
              letter-spacing: 3px;
              margin: 0;
              position: relative;
              z-index: 1;
            }
            .header-subtitle {
              font-size: 16px;
              margin: 10px 0 0 0;
              opacity: 0.9;
              position: relative;
              z-index: 1;
            }
            .content {
              padding: 40px 30px;
            }
            .order-id {
              background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
              border-left: 4px solid #dc2626;
              padding: 20px;
              margin: 30px 0;
              border-radius: 0 8px 8px 0;
            }
            .order-id h3 {
              margin: 0 0 10px 0;
              color: #1f2937;
              font-size: 18px;
            }
            .order-id p {
              margin: 5px 0;
              color: #6b7280;
              font-size: 14px;
            }
            .section {
              background-color: #f9fafb;
              border-radius: 12px;
              padding: 25px;
              margin: 25px 0;
              border: 1px solid #e5e7eb;
            }
            .section h4 {
              color: #1f2937;
              font-size: 20px;
              font-weight: 700;
              margin: 0 0 20px 0;
              padding-bottom: 12px;
              border-bottom: 3px solid #dc2626;
              display: inline-block;
            }
            .item {
              display: flex;
              align-items: flex-start;
              gap: 20px;
              padding: 20px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .item:last-child {
              border-bottom: none;
            }
            .item-image {
              flex-shrink: 0;
              width: 100px;
              height: 100px;
              border-radius: 12px;
              border: 2px solid #e5e7eb;
              object-fit: cover;
              background-color: #f3f4f6;
            }
            .item-details {
              flex: 1;
            }
            .item-name {
              font-size: 18px;
              font-weight: 700;
              color: #1f2937;
              margin: 0 0 8px 0;
            }
            .item-ref {
              color: #dc2626;
              font-weight: 600;
              font-size: 14px;
              margin: 2px 0;
            }
            .item-info {
              color: #6b7280;
              font-size: 14px;
              margin: 3px 0;
            }
            .item-price {
              color: #374151;
              font-size: 16px;
              margin: 8px 0;
            }
            .item-subtotal {
              font-weight: 700;
              color: #dc2626;
              font-size: 18px;
              margin: 10px 0 0 0;
            }
            .summary {
              background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
              border-radius: 12px;
              padding: 25px;
              margin: 25px 0;
              color: white;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .summary h4 {
              color: white !important;
              border-bottom: 2px solid #dc2626 !important;
              margin: 0 0 20px 0 !important;
              font-size: 20px !important;
              font-weight: 700 !important;
            }
            .summary-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #4b5563;
              color: white;
              font-size: 16px;
            }
            .summary-row:last-child {
              border-bottom: none;
              font-weight: 700;
              font-size: 22px;
              color: #dc2626;
              margin-top: 15px;
              padding-top: 20px;
              border-top: 2px solid #dc2626;
            }
            .footer {
              background-color: #1f2937;
              color: white;
              padding: 30px;
              text-align: center;
            }
            .footer h3 {
              margin: 0 0 15px 0;
              color: #dc2626;
              font-size: 20px;
            }
            .footer p {
              margin: 8px 0;
              color: #d1d5db;
              font-size: 14px;
            }
            .divider {
              height: 2px;
              background: linear-gradient(to right, #dc2626, transparent);
              margin: 30px 0;
            }
            /* Mobile Responsive Styles */
            @media only screen and (max-width: 600px) {
              .container {
                margin: 0;
                box-shadow: none;
              }
              .header {
                padding: 30px 20px;
              }
              .logo {
                font-size: 28px;
                letter-spacing: 2px;
              }
              .content {
                padding: 30px 20px;
              }
              .section {
                padding: 20px;
                margin: 20px 0;
              }
              .section h4 {
                font-size: 18px;
              }
              .item {
                flex-direction: column;
                gap: 15px;
                padding: 15px 0;
              }
              .item-image {
                width: 80px;
                height: 80px;
                align-self: center;
              }
              .summary {
                padding: 20px;
                margin: 20px 0;
                background: linear-gradient(135deg, #1f2937 0%, #374151 100%) !important;
                color: white !important;
              }
              .summary h4 {
                font-size: 18px !important;
                color: white !important;
              }
              .summary-row {
                font-size: 14px;
                padding: 10px 0;
                color: white !important;
              }
              .summary-row span {
                color: white !important;
              }
              .summary-row:last-child {
                font-size: 18px;
                color: #dc2626 !important;
              }
              .summary-row:last-child span {
                color: #dc2626 !important;
              }
              .footer {
                padding: 20px;
              }
              .order-id {
                padding: 15px;
                margin: 20px 0;
              }
              .order-id h3 {
                font-size: 16px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1 class="logo">TRUE RELIGION</h1>
              <p class="header-subtitle">Order Confirmation</p>
            </div>
            
            <!-- Content -->
            <div class="content">
              <div class="order-id">
                <h3>🎉 Thank you for your order!</h3>
                <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString('en-US', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })}</p>
                <p><strong>Customer:</strong> ${customerName.toLowerCase()}</p>
              </div>
              
              <!-- Delivery Information -->
              <div class="section">
                <h4>📦 Delivery Information</h4>
                <p><strong>Address:</strong> ${orderData.address || 'N/A'}</p>
                <p><strong>City:</strong> ${orderData.city || 'N/A'}</p>
                <p><strong>Postal Code:</strong> ${orderData.postalCode || 'N/A'}</p>
                <p><strong>Phone:</strong> ${orderData.phone || 'N/A'}</p>
              </div>
              
              <!-- Order Items -->
              <div class="section">
                <h4>🛍️ Order Items (Full Details)</h4>
                ${(function() {
                  // Group items by product (name + ref + colour + supplierCode)
                  const groupedItems: { [key: string]: any[] } = {};
                  
                  orderData.items.forEach((item: any) => {
                    const key = `${item.name}-${item.ref || ''}-${item.colour || ''}-${item.supplierCode || ''}`;
                    if (!groupedItems[key]) {
                      groupedItems[key] = [];
                    }
                    groupedItems[key].push(item);
                  });
                  
                  return Object.values(groupedItems).map((productGroup: any[]) => {
                    const firstItem = productGroup[0];
                    const totalQuantity = productGroup.reduce((sum, item) => sum + item.quantity, 0);
                    const totalSubtotal = productGroup.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    
                    const sizeBreakdown = productGroup.map((item: any) => 
                      `<p style="margin: 5px 0; color: #6b7280; font-size: 14px;">Size: ${item.size} | Quantity: ${item.quantity}</p>`
                    ).join('');
                    
                    return `
                      <div class="item">
                        ${firstItem.image ? `
                          <img src="${firstItem.image}" alt="${firstItem.name}" class="item-image">
                        ` : `
                          <div class="item-image" style="display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px;">
                            No Image
                          </div>
                        `}
                        <div class="item-details">
                          <h3 class="item-name">${firstItem.name}</h3>
                          ${firstItem.ref ? `<p class="item-ref">REF: ${firstItem.ref}</p>` : ''}
                          ${firstItem.colour ? `<p class="item-info">Color: ${firstItem.colour}</p>` : ''}
                          ${firstItem.supplierCode ? `<p class="item-info">Supplier Code: ${firstItem.supplierCode}</p>` : ''}
                          <p class="item-info">Category: ${firstItem.category || 'N/A'}</p>
                          
                          <!-- Size breakdown -->
                          <div style="margin: 15px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <h5 style="margin: 0 0 10px 0; color: #374151; font-size: 16px; font-weight: 600;">Size Breakdown:</h5>
                            ${sizeBreakdown}
                          </div>
                          
                          <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
                            <div style="flex: 1;">
                              <p style="margin: 0; color: #374151; font-size: 14px;">Wholesale Price (ex VAT): R ${firstItem.wholesalePrice?.toFixed(2) || firstItem.price.toFixed(2)} each</p>
                            </div>
                            ${firstItem.retailPrice ? `
                              <div style="flex: 1; text-align: right;">
                                <p style="margin: 0; color: #dc2626; font-size: 14px; font-weight: 600;">Recommended Retail: R ${firstItem.retailPrice.toFixed(2)} each</p>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>
                    `;
                  }).join('');
                })()}
              </div>
              
              <!-- Order Summary -->
              <div class="summary">
                <h4>💰 Order Summary</h4>
                <div class="summary-row">
                  <span>Subtotal (ex VAT):</span>
                  <span>R ${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                  <span>VAT (+15%):</span>
                  <span>R ${orderData.vatAmount.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                  <span><strong>Total (inc VAT):</strong></span>
                  <span><strong>R ${orderData.total.toFixed(2)}</strong></span>
                </div>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <h3>TRUE RELIGION</h3>
              <p>Premium American Denim & Apparel</p>
              <p>Established 2002 • Authentic Heritage</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    console.log('📧 Sending order email...');
    const info = await transporter.sendMail(orderEmail);
    console.log('✅ Order email sent successfully:', info.messageId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order email sent successfully',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('❌ NODEMAILER ORDER ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send order email',
        details: {
          name: error.name,
          code: error.code,
          message: error.message
        }
      },
      { status: 500 }
    );
  }
}
