import * as XLSX from 'xlsx';
import { writeFileSync } from 'fs';

// User emails to create
const userEmails = [
  'david@fabulous.com.na',
  'matsimanel@gmail.com',
  'hdullabh@icloud.com',
  'info@delbropremium.co.za',
  'tuscanyoutfitters@gmail.com',
  'accounts@brandzz.co.za',
  'khiara.rama@gmail.com',
  'figo@fashionwalk.co.za',
  'riyaz@mweb.co.za',
  'legends01@webmail.co.za',
  'kamlesh@mweb.co.za',
  'dawjees@gmail.com',
];

// Generate 6-digit unique password
function generatePassword(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Ensure all passwords are unique
function generateUniquePasswords(count: number): string[] {
  const passwords = new Set<string>();
  
  while (passwords.size < count) {
    passwords.add(generatePassword());
  }
  
  return Array.from(passwords);
}

function createUserCredentialsExcel() {
  console.log('🚀 Generating user credentials...\n');

  const passwords = generateUniquePasswords(userEmails.length);
  const userCredentials = userEmails.map((email, index) => ({
    email,
    password: passwords[index],
  }));

  // Create Excel file
  console.log('📊 Creating Excel file...\n');

  const worksheetData = [
    ['Email', 'Password', 'Status'],
    ...userCredentials.map(cred => [cred.email, cred.password, 'Ready to Create'])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'User Credentials');

  // Set column widths
  worksheet['!cols'] = [
    { wch: 35 }, // Email
    { wch: 15 }, // Password
    { wch: 20 }, // Status
  ];

  // Style the header row
  const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + '1';
    if (!worksheet[address]) continue;
    worksheet[address].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: 'CCCCCC' } },
    };
  }

  // Write to file
  const fileName = 'user-credentials.xlsx';
  XLSX.writeFile(workbook, fileName);

  console.log(`✅ Excel file created: ${fileName}\n`);
  console.log('📋 User Credentials Summary:');
  console.log('═'.repeat(80));
  userCredentials.forEach(cred => {
    console.log(`Email: ${cred.email.padEnd(35)} | Password: ${cred.password}`);
  });
  console.log('═'.repeat(80));

  console.log('\n📁 Credentials saved to: ' + fileName);
  console.log('\n📝 Next Steps:');
  console.log('1. Use the admin panel to create these users');
  console.log('2. Copy the passwords from the Excel file');
  console.log('3. Share credentials securely with users');
  
  // Also save as JSON for the API
  const jsonData = {
    users: userCredentials,
    generated: new Date().toISOString()
  };
  
  writeFileSync('user-credentials.json', JSON.stringify(jsonData, null, 2));
  console.log('💾 Also saved as: user-credentials.json');
}

createUserCredentialsExcel();

