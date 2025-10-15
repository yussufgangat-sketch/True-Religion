import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderData, customerEmail, customerName } = body;

    // Create Gmail transporter with better configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'trdrop2025@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'ALC@Capone2025',
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ Email transporter connected successfully');

    // Group items by product for better display
    const groupedItems: { [key: string]: any[] } = {};
    
    orderData.items.forEach((item: any) => {
      const key = `${item.name}-${item.ref}-${item.colour}-${item.supplierCode}`;
      if (!groupedItems[key]) {
        groupedItems[key] = [];
      }
      groupedItems[key].push(item);
    });

    // Format order details with grouped items
    const orderItems = Object.values(groupedItems).map((productGroup: any[]) => {
      const firstItem = productGroup[0];
      const totalQuantity = productGroup.reduce((sum, item) => sum + item.quantity, 0);
      const totalSubtotal = productGroup.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const sizeBreakdown = productGroup.map((item: any) => 
        `${item.size} (${item.quantity})`
      ).join(', ');
      
      return `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">
            ${firstItem.name}
            ${firstItem.ref ? `<br><small style="color: #dc2626; font-weight: bold;">REF: ${firstItem.ref}</small>` : ''}
            ${firstItem.colour ? `<br><small style="color: #6b7280;">Color: ${firstItem.colour}</small>` : ''}
            ${firstItem.supplierCode ? `<br><small style="color: #6b7280;">Supplier Code: ${firstItem.supplierCode}</small>` : ''}
            <br><small style="color: #374151; font-weight: 600;">Sizes: ${sizeBreakdown}</small>
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">${totalQuantity}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            Wholesale: R${firstItem.wholesalePrice?.toFixed(2) || firstItem.price.toFixed(2)}<br>
            ${firstItem.retailPrice ? `Retail: R${firstItem.retailPrice.toFixed(2)}` : ''}
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">R${totalSubtotal.toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); 
              color: white; 
              padding: 30px 20px; 
              text-align: center; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header h1 { 
              font-size: 32px; 
              font-weight: 900; 
              margin: 0 0 10px 0; 
              letter-spacing: 2px;
            }
            .header h2 { 
              font-size: 18px; 
              margin: 0; 
              opacity: 0.9;
            }
            .content { 
              background: #ffffff; 
              padding: 30px; 
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            .content h3 {
              color: #1f2937;
              font-size: 20px;
              font-weight: 700;
              margin: 25px 0 15px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #dc2626;
              display: inline-block;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0; 
              background: white; 
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            th { 
              background: #1f2937; 
              color: white; 
              padding: 15px 10px; 
              text-align: left; 
              font-weight: 600;
            }
            td { 
              padding: 12px 10px; 
              border: 1px solid #e5e7eb; 
              background: white;
            }
            .total { 
              background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
              color: white;
              font-size: 18px; 
              font-weight: bold; 
              text-align: right; 
              padding: 20px; 
              border-radius: 8px;
              margin: 20px 0;
            }
            .total p {
              margin: 5px 0;
              color: white;
            }
            .total p:last-child {
              font-size: 22px;
              color: #dc2626;
              font-weight: 900;
            }
            .footer { 
              text-align: center; 
              padding: 25px; 
              color: #666; 
              background: #f9fafb;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>TRUE RELIGION</h1>
              <h2>New Order Received</h2>
            </div>
            <div class="content">
              <h3>Order Details</h3>
              <p><strong>Customer:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Order ID:</strong> ${orderData.orderId || 'N/A'}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              
              <h3>Delivery Information</h3>
              <p><strong>Address:</strong> ${orderData.address || 'N/A'}</p>
              <p><strong>City:</strong> ${orderData.city || 'N/A'}</p>
              <p><strong>Postal Code:</strong> ${orderData.postalCode || 'N/A'}</p>
              <p><strong>Phone:</strong> ${orderData.phone || 'N/A'}</p>
              
              <h3>Order Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItems}
                </tbody>
              </table>
              
              <div class="total">
                <p>Subtotal (ex VAT): R${orderData.subtotal?.toFixed(2) || '0.00'}</p>
                <p>VAT (+15%): R${orderData.vatAmount?.toFixed(2) || '0.00'}</p>
                <p style="font-size: 20px; color: #dc2626;">Total (inc VAT): R${orderData.total?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
            <div class="footer">
              <p>True Religion - Premium Denim & Apparel</p>
              <p>This is an automated notification for order management.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: `"True Religion Orders" <${process.env.EMAIL_FROM || 'trdrop2025@gmail.com'}>`,
      to: process.env.EMAIL_TO || 'trdrop2025@gmail.com',
      subject: `New Order from ${customerName} - True Religion`,
      html: emailHTML,
    });

    // Send confirmation email to customer
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); 
              color: white; 
              padding: 30px 20px; 
              text-align: center; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header h1 { 
              font-size: 32px; 
              font-weight: 900; 
              margin: 0 0 10px 0; 
              letter-spacing: 2px;
            }
            .header h2 { 
              font-size: 18px; 
              margin: 0; 
              opacity: 0.9;
            }
            .content { 
              background: #ffffff; 
              padding: 30px; 
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            .content h4 {
              color: #1f2937;
              font-size: 18px;
              font-weight: 700;
              margin: 20px 0 15px 0;
              padding-bottom: 8px;
              border-bottom: 2px solid #dc2626;
              display: inline-block;
            }
            .footer { 
              text-align: center; 
              padding: 25px; 
              color: #666; 
              background: #f9fafb;
              border-top: 1px solid #e5e7eb;
            }
            .order-item { 
              display: flex; 
              align-items: center; 
              gap: 15px; 
              padding: 15px 0; 
              border-bottom: 1px solid #e5e7eb; 
            }
            .product-image { 
              width: 80px; 
              height: 80px; 
              object-fit: cover; 
              border-radius: 8px; 
              border: 2px solid #e5e7eb; 
              flex-shrink: 0; 
            }
            .product-details { flex: 1; }
            .product-name { 
              font-size: 16px; 
              font-weight: 700; 
              color: #1f2937; 
              margin: 0 0 5px 0; 
            }
            .product-color { color: #6b7280; font-size: 14px; margin: 2px 0; }
            .product-code { color: #6b7280; font-size: 12px; margin: 2px 0; }
            .product-info { color: #374151; margin: 5px 0; font-size: 14px; }
            .product-subtotal { 
              font-weight: 700; 
              color: #dc2626; 
              font-size: 16px; 
              margin: 8px 0 0 0; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>TRUE RELIGION</h1>
              <h2>Order Confirmation</h2>
            </div>
            <div class="content">
              <p>Hi ${customerName},</p>
              <p>Thank you for your order! We've received your order and will process it shortly.</p>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4>Order Details</h4>
                <p><strong>Order ID:</strong> ${orderData.orderId || 'N/A'}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
              </div>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4>Delivery Address</h4>
                <p><strong>Address:</strong> ${orderData.address || 'N/A'}</p>
                <p><strong>City:</strong> ${orderData.city || 'N/A'}</p>
                <p><strong>Postal Code:</strong> ${orderData.postalCode || 'N/A'}</p>
                <p><strong>Phone:</strong> ${orderData.phone || 'N/A'}</p>
              </div>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4>Order Items (Full Details)</h4>
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
                      <div class="order-item">
                        ${firstItem.image ? `
                          <img src="${firstItem.image}" alt="${firstItem.name}" class="product-image">
                        ` : ''}
                        <div class="product-details">
                          <p class="product-name">${firstItem.name}</p>
                          ${firstItem.ref ? `<p class="product-color">REF: ${firstItem.ref}</p>` : ''}
                          ${firstItem.colour ? `<p class="product-color">Color: ${firstItem.colour}</p>` : ''}
                          ${firstItem.supplierCode ? `<p class="product-code">Supplier Code: ${firstItem.supplierCode}</p>` : ''}
                          <p class="product-info">Category: ${firstItem.category || 'N/A'}</p>
                          
                          <!-- Size breakdown -->
                          <div style="margin: 15px 0; padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <h5 style="margin: 0 0 10px 0; color: #374151; font-size: 16px; font-weight: 600;">Size Breakdown:</h5>
                            ${sizeBreakdown}
                          </div>
                          
                          <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
                            <div style="flex: 1;">
                              <p style="margin: 0; color: #374151; font-size: 14px;">Wholesale Price (ex VAT): R${firstItem.price.toFixed(2)} each</p>
                            </div>
                            ${firstItem.retailPrice ? `
                              <div style="flex: 1; text-align: right;">
                                <p style="margin: 0; color: #dc2626; font-size: 14px; font-weight: 600;">Recommended Retail: R${firstItem.retailPrice.toFixed(2)} each</p>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>
                    `;
                  }).join('');
                })()}
              </div>
              
              <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 25px; border-radius: 12px; margin: 25px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h4 style="color: white !important; border-bottom: 2px solid #dc2626 !important; margin: 0 0 20px 0 !important; font-size: 20px !important; font-weight: 700 !important;">💰 Order Summary</h4>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #4b5563; color: white; font-size: 16px;">
                  <span>Subtotal (ex VAT):</span>
                  <span>R${orderData.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #4b5563; color: white; font-size: 16px;">
                  <span>VAT (+15%):</span>
                  <span>R${orderData.vatAmount?.toFixed(2) || '0.00'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: none; font-weight: 700; font-size: 22px; color: #dc2626; margin-top: 15px; padding-top: 20px; border-top: 2px solid #dc2626;">
                  <span><strong>Total (inc VAT):</strong></span>
                  <span><strong>R${orderData.total?.toFixed(2) || '0.00'}</strong></span>
                </div>
              </div>
              
              <p>You will receive another email once your order ships.</p>
            </div>
            <div class="footer">
              <p>True Religion - Premium Denim & Apparel</p>
              <p>Thank you for shopping with us!</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"True Religion" <${process.env.EMAIL_FROM || 'trdrop2025@gmail.com'}>`,
      to: customerEmail,
      subject: 'Order Confirmation - True Religion',
      html: customerEmailHTML,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Order emails sent successfully' 
    });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      },
      { status: 500 }
    );
  }
}

