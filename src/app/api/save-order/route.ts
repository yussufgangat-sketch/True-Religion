import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

let app;
let db;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app); // Use default database
  console.log('✅ Firebase initialized successfully with default database');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 SAVING ORDER...');
    const body = await req.json();
    const { orderData, customerEmail, customerName } = body;

    console.log('📝 Order Data:', JSON.stringify(orderData, null, 2));

    // Save order to Firestore
    const orderDoc = {
      orderId: orderData.orderId || `TR-${Date.now()}`,
      customerName,
      customerEmail,
      address: orderData.address,
      city: orderData.city,
      postalCode: orderData.postalCode,
      phone: orderData.phone,
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      timestamp: Date.now()
    };

    console.log('📝 Saving to Firestore...');
    
    if (!db) {
      throw new Error('Firestore not initialized');
    }
    
    const docRef = await addDoc(collection(db, 'orders'), orderDoc);
    console.log('✅ Order saved to Firestore:', docRef.id);

    // Send email using Nodemailer
    console.log('📧 Sending email via Nodemailer...');
    try {
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'trdrop2025@gmail.com',
          pass: 'wcnd mwcj bskm gsfy'
        }
      });
      
      const orderEmail = {
        from: 'trdrop2025@gmail.com',
        to: customerEmail,
        cc: 'trdrop2025@gmail.com',
        subject: `Order Confirmation - ${orderDoc.orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">TRUE RELIGION</h2>
            <h3>Order Confirmation</h3>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>Order Details</h4>
              <p><strong>Order ID:</strong> ${orderDoc.orderId}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Customer:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>Shipping Address</h4>
              <p><strong>Address:</strong> ${orderData.address || 'N/A'}</p>
              <p><strong>City:</strong> ${orderData.city || 'N/A'}</p>
              <p><strong>Postal Code:</strong> ${orderData.postalCode || 'N/A'}</p>
              <p><strong>Phone:</strong> ${orderData.phone || 'N/A'}</p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>Order Items</h4>
              ${orderData.items.map((item: any) => `
                <div style="border-bottom: 1px solid #e5e7eb; padding: 15px 0; display: flex; align-items: center; gap: 15px;">
                  ${item.image ? `
                    <div style="flex-shrink: 0;">
                      <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 2px solid #e5e7eb;">
                    </div>
                  ` : ''}
                  <div style="flex: 1;">
                    <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1f2937;">${item.name}</p>
                    ${item.colour ? `<p style="margin: 2px 0; color: #6b7280; font-size: 14px;">Color: ${item.colour}</p>` : ''}
                    ${item.supplierCode ? `<p style="margin: 2px 0; color: #6b7280; font-size: 12px;">Code: ${item.supplierCode}</p>` : ''}
                    <p style="margin: 5px 0; color: #374151;">Size: ${item.size} | Quantity: ${item.quantity}</p>
                    <p style="margin: 5px 0; color: #374151;">Price: R${item.price.toFixed(2)} each</p>
                    <p style="margin: 5px 0; font-weight: bold; color: #dc2626; font-size: 16px;">Subtotal: R${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>Order Summary</h4>
              <p><strong>Subtotal:</strong> R${orderData.subtotal.toFixed(2)}</p>
              <p><strong>Shipping:</strong> R${orderData.shipping.toFixed(2)}</p>
              <p><strong>Total:</strong> R${orderData.total.toFixed(2)}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280;">Thank you for your order!</p>
            </div>
          </div>
        `
      };
      
      const info = await transporter.sendMail(orderEmail);
      console.log('✅ Order email sent successfully:', info.messageId);
      
    } catch (emailError) {
      console.log('❌ Email sending failed:', emailError);
      // Don't fail the entire order if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Order saved successfully',
      orderId: docRef.id
    });

  } catch (error) {
    console.error('❌ Error saving order:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to save order' 
      },
      { status: 500 }
    );
  }
}

