import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// GET - Fetch all users
export async function GET() {
  try {
    const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(usersQuery);
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create new user
export async function POST(req: NextRequest) {
  try {
    const { email, password, role, isActive } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists (by email). If found, re-activate instead of failing
    const existingUsersQuery = query(
      collection(db, 'users'),
      where('email', '==', email)
    );
    const existingSnapshot = await getDocs(existingUsersQuery);

    if (!existingSnapshot.empty) {
      const existingDoc = existingSnapshot.docs[0];
      const updateData: any = {
        isActive: true,
        updatedAt: new Date().toISOString()
      };
      if (password) updateData.password = password;
      if (role) updateData.role = role;

      await updateDoc(doc(db, 'users', existingDoc.id), updateData);

      return NextResponse.json({
        success: true,
        user: {
          id: existingDoc.id,
          email,
          password,
          role: role || 'user',
          isActive: true,
          updatedAt: updateData.updatedAt
        },
        reactivated: true
      });
    }

    const userData = {
      email,
      password,
      role: role || 'user',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'users'), userData);

    return NextResponse.json({
      success: true,
      user: {
        id: docRef.id,
        ...userData
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(req: NextRequest) {
  try {
    const { id, email, password, role, isActive } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    await updateDoc(doc(db, 'users', id), updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user (soft delete)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Soft delete: mark as inactive instead of removing the document
    await updateDoc(doc(db, 'users', id), {
      isActive: false,
      deletedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

