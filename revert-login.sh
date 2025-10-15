#!/bin/bash
# Revert login page to original design
echo "🔄 Reverting login page to original design..."
Copy-Item "src/app/(auth)/login/page.tsx.backup" "src/app/(auth)/login/page.tsx"
echo "✅ Login page reverted successfully!"
echo "📝 Original design restored from backup"


