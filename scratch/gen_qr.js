import fs from 'fs';

const svg = fs.readFileSync('public/upi-qr.svg', 'utf8');
const base64 = Buffer.from(svg).toString('base64');
const dataUri = `data:image/svg+xml;base64,${base64}`;

const jsCode = `/**
 * Bundled UPI QR Code (SVG and Base64 Data URI)
 * UPI ID: 9174934135@yescred
 * Payee Name: sarthak patidar
 */

export const UPI_ID = '9174934135@yescred';
export const UPI_PAYEE_NAME = 'sarthak patidar';
export const UPI_QR_DATA_URI = '${dataUri}';
export const UPI_QR_PATH = '/upi-qr.svg';
`;

fs.writeFileSync('src/lib/qrCode.js', jsCode);
console.log('Successfully created src/lib/qrCode.js');
