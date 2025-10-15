# Image Upload and Organization Guide

This guide explains how to upload and organize your product images to match your Excel REF codes.

## 📁 Folder Structure

Your images should be organized like this:

```
public/images/
├── TR 1/                    # Product REF: TR1
│   ├── front.jpg
│   ├── back.jpg
│   └── detail.jpg
├── TR 2/                    # Product REF: TR2
│   ├── main.jpg
│   └── side.jpg
├── TR 100/                  # Product REF: TR100
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
└── TR 1000/                 # Product REF: TR1000
    ├── front.jpg
    └── back.jpg
```

## 🚀 How to Upload Images

### Method 1: Web Interface (Recommended)

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the image upload page:**
   ```
   http://localhost:3000/admin/upload-images
   ```

3. **Upload your images:**
   - Drag and drop images or click to select
   - Images will be automatically organized by REF code
   - The system will create folders like "TR 1", "TR 2", etc.

### Method 2: Manual Upload

1. **Create the base images directory:**
   ```bash
   mkdir -p public/images
   ```

2. **Organize your images manually:**
   - Create folders named after your REF codes
   - Place images in the corresponding folders
   - Use descriptive filenames

3. **Run the organization script:**
   ```bash
   npm run organize-images
   ```

## 📋 Step-by-Step Process

### Step 1: Prepare Your Images

1. **Name your images with REF codes:**
   - `TR1_front.jpg`
   - `TR1_back.jpg`
   - `TR2_main.jpg`
   - `TR100_detail.jpg`

2. **Supported formats:**
   - JPG/JPEG
   - PNG
   - WebP
   - GIF

### Step 2: Upload Images

**Option A: Web Interface**
1. Go to `/admin/upload-images`
2. Drag and drop your images
3. The system will automatically:
   - Extract REF codes from filenames
   - Create appropriate folders
   - Organize images by REF

**Option B: Manual Upload**
1. Create folders in `public/images/`
2. Name folders like "TR 1", "TR 2", etc.
3. Place images in corresponding folders

### Step 3: Generate Image Mapping

After uploading, generate the image mapping:

```bash
npm run organize-images
```

This will create `public/image-mapping.json` with all your image mappings.

### Step 4: Process Excel Data

Now you can process your Excel data with image matching:

```bash
npm run process-excel your-products.csv
```

## 🎯 Image Matching Logic

The system matches images to products using this priority:

1. **REF Code Match** (Highest Priority)
   - Product REF: "TR1" → Folder: "TR 1/"
   - Product REF: "TR100" → Folder: "TR 100/"

2. **Primary Image Selection**
   - Files with "main", "primary", "front", "1", "01" in name
   - Falls back to first image in folder

3. **Keyword Matching** (Fallback)
   - Matches product description keywords
   - Matches color keywords
   - Matches category keywords

4. **Random Selection** (Last Resort)
   - Random image from your collection

## 📊 Example Workflow

### 1. Your Excel Data:
```csv
REF,Description,Colour,Category
TR1,True Religion SS Polo,White,Golfers
TR2,True Religion Jeans,Blue,Jeans
TR100,True Religion Hoodie,Black,Hoodies
```

### 2. Your Image Folders:
```
public/images/
├── TR 1/
│   ├── front.jpg
│   └── back.jpg
├── TR 2/
│   ├── main.jpg
│   └── detail.jpg
└── TR 100/
    ├── 1.jpg
    └── 2.jpg
```

### 3. Generated Mapping:
```json
{
  "TR1": {
    "ref": "TR1",
    "folderPath": "/images/TR 1",
    "images": ["/images/TR 1/front.jpg", "/images/TR 1/back.jpg"],
    "primaryImage": "/images/TR 1/front.jpg"
  },
  "TR2": {
    "ref": "TR2", 
    "folderPath": "/images/TR 2",
    "images": ["/images/TR 2/main.jpg", "/images/TR 2/detail.jpg"],
    "primaryImage": "/images/TR 2/main.jpg"
  }
}
```

### 4. Final Product Data:
```typescript
{
  id: "tr1",
  ref: "TR1",
  name: "True Religion SS Polo",
  image: "/images/TR 1/front.jpg",
  // ... other fields
}
```

## 🛠️ Commands

### Scan Existing Images
```bash
npm run organize-images
```

### Process Excel with Images
```bash
npm run process-excel data/products.csv
```

### Generate Image Mapping
```bash
tsx scripts/organize-images.ts
```

## 🔧 Troubleshooting

### Common Issues:

1. **"No images found"**
   - Check that images are in `public/images/` directory
   - Verify folder names match REF codes (TR 1, TR 2, etc.)
   - Ensure images have supported extensions

2. **"REF not extracted"**
   - Use filenames like "TR1_image.jpg" or "TR-1_image.jpg"
   - Or organize in folders named "TR 1", "TR 2", etc.

3. **"Images not matching"**
   - Check that REF codes in Excel match folder names
   - Verify image mapping was generated correctly
   - Run the organization script again

### File Requirements:
- Images in `public/images/` directory
- Folders named after REF codes (TR 1, TR 2, etc.)
- Supported image formats (JPG, PNG, WebP, GIF)
- Proper file permissions

## 📈 Best Practices

1. **Consistent Naming:**
   - Use descriptive filenames
   - Include REF codes in filenames
   - Use consistent folder structure

2. **Image Quality:**
   - Use high-resolution images
   - Optimize for web (compress if needed)
   - Use consistent aspect ratios

3. **Organization:**
   - One folder per product REF
   - Multiple images per product supported
   - Clear primary image naming

## 🎉 Next Steps

After organizing your images:

1. **Test the image matching:**
   ```bash
   npm run organize-images
   ```

2. **Process your Excel data:**
   ```bash
   npm run process-excel your-data.csv
   ```

3. **Check the generated products:**
   - Review `src/data/products-updated.ts`
   - Verify image assignments
   - Test in your application

Your images will be automatically matched with your Excel product data based on REF codes!




