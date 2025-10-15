import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    console.log('📧 TESTING NODEMAILER...');
    
    const body = await req.json();
    console.log('📝 Request body:', JSON.stringify(body, null, 2));
    
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
    
    // Test email configuration with product images
    const testEmail = {
      from: 'trdrop2025@gmail.com',
      to: 'trdrop2025@gmail.com',
      subject: 'Test Email with Product Images - True Religion Store',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">TRUE RELIGION</h2>
          <h3>Test Order Confirmation with Product Images</h3>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4>Order Details</h4>
            <p><strong>Order ID:</strong> TR-0001</p>
            <p><strong>Customer:</strong> Test Customer</p>
            <p><strong>Email:</strong> test@example.com</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4>Sample Product Display</h4>
            <div style="border-bottom: 1px solid #e5e7eb; padding: 15px 0; display: flex; align-items: center; gap: 15px;">
              <div style="flex-shrink: 0;">
                <img src="https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.appspot.com/o/products%2FTR1%2Fimage1.jpg?alt=media" alt="Sample Product" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 2px solid #e5e7eb;">
              </div>
              <div style="flex: 1;">
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1f2937;">Sample True Religion T-Shirt</p>
                <p style="margin: 2px 0; color: #6b7280; font-size: 14px;">Color: Black</p>
                <p style="margin: 2px 0; color: #6b7280; font-size: 12px;">Code: TR1</p>
                <p style="margin: 5px 0; color: #374151;">Size: M | Quantity: 1</p>
                <p style="margin: 5px 0; color: #374151;">Price: R 250.00 each</p>
                <p style="margin: 5px 0; font-weight: bold; color: #dc2626; font-size: 16px;">Subtotal: R 250.00</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280;">✅ Nodemailer is working perfectly!</p>
            <p style="color: #6b7280;">✅ Product images are displaying correctly!</p>
            <p style="color: #6b7280;">Your True Religion e-commerce system is ready!</p>
          </div>
        </div>
      `
    };
    
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Email sent successfully:', info.messageId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Nodemailer test successful',
      messageId: info.messageId,
      config: {
        host: 'smtp.gmail.com',
        port: 587,
        from: 'trdrop2025@gmail.com',
        to: 'trdrop2025@gmail.com'
      }
    });
    
  } catch (error) {
    console.error('❌ NODEMAILER ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Nodemailer test failed',
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
