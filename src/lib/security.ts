// Security utility functions for the True Religion application

// Type definitions
interface UserData {
  email?: string;
  name?: string;
}

interface ProductData {
  name?: string;
  price?: number;
  category?: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

interface OrderData {
  userId?: string;
  items?: OrderItem[];
  total?: number;
}

interface FirebaseUser {
  token?: {
    admin?: boolean;
  };
}

/**
 * Validate user data before writing to Firestore
 */
export const validateUserData = (data: UserData) => {
  const errors: string[] = [];

  // Required fields
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required and must be a string');
  }

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Name length validation
  if (data.name && (data.name.length < 2 || data.name.length > 50)) {
    errors.push('Name must be between 2 and 50 characters');
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }

  return data;
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove other potentially dangerous tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  
  // Remove dangerous attributes
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*javascript\s*:/gi, '');
  sanitized = sanitized.replace(/\s*data\s*:/gi, '');
  
  return sanitized.trim();
};

/**
 * Validate product data
 */
export const validateProductData = (data: ProductData) => {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Product name is required');
  }

  if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
    errors.push('Valid price is required');
  }

  if (!data.category || !['male', 'female'].includes(data.category)) {
    errors.push('Valid category is required (male or female)');
  }

  if (errors.length > 0) {
    throw new Error(`Product validation failed: ${errors.join(', ')}`);
  }

  return data;
};

/**
 * Validate order data
 */
export const validateOrderData = (data: OrderData) => {
  const errors: string[] = [];

  if (!data.userId || typeof data.userId !== 'string') {
    errors.push('User ID is required');
  }

  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (!data.total || typeof data.total !== 'number' || data.total <= 0) {
    errors.push('Valid total amount is required');
  }

  if (errors.length > 0) {
    throw new Error(`Order validation failed: ${errors.join(', ')}`);
  }

  return data;
};

/**
 * Check if user is admin
 */
export const isAdmin = (user: FirebaseUser): boolean => {
  return user?.token?.admin === true;
};

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

/**
 * Generate secure random string
 */
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Validate file upload
 */
export const validateFileUpload = (file: File, maxSize: number, allowedTypes: string[]): boolean => {
  // Check file size
  if (file.size > maxSize) {
    return false;
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return false;
  }

  return true;
};

/**
 * Get file upload validation rules
 */
export const getFileUploadRules = () => ({
  profileImage: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  productImage: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  receipt: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png']
  }
});
