#!/bin/bash
# Revert homepage to original design
echo "🔄 Reverting homepage to original design..."
cp src/app/page.tsx.backup src/app/page.tsx
echo "✅ Homepage reverted successfully!"
echo "📝 Original design restored from backup"


