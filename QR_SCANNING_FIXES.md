# QR Code Generator - Google Lens Compatible

## QR Code Scanning Issues Fixed ✅

### What Was Fixed:

1. **URL Format Issues**: 
   - QR codes now automatically add `https://` protocol if missing
   - Ensures proper URL format for Google Lens recognition

2. **Error Correction Level**: 
   - Default error correction increased from 'L' to 'M' and 'H'
   - Better scanning reliability with damaged or partially obscured codes

3. **Color Contrast**: 
   - Automatic contrast validation (minimum 125 brightness difference)
   - Falls back to black/white if contrast is too low
   - Better visibility for camera scanners

4. **QR Code Size**: 
   - Minimum size increased to 300px for better scanning
   - Higher pixel density (scale: 8) for clearer patterns

5. **Margin/Quiet Zone**: 
   - Increased margin to 4 modules around QR code
   - Better scanner detection and focus

6. **Content Formatting**:
   - Email addresses formatted as `mailto:email@domain.com`
   - Phone numbers formatted as `tel:+1234567890` 
   - SMS formatted as `sms:+1234567890`
   - Proper protocol prefixes for better app recognition

## How to Run the Project

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation & Running

1. **Navigate to the project directory:**
   ```bash
   cd "C:\\Users\\Nagineni Dhanush\\Music\\Desktop\\games\\project-bolt-sb1-lpjqkecx\\project"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will typically run on `http://localhost:5173`
   - Look for the URL in the terminal output

### Testing QR Code Scanning

1. **Generate a QR Code:**
   - Choose QR type (URL, Email, Phone, etc.)
   - Enter content
   - Use default security and style settings for best compatibility

2. **Test with Google Lens:**
   - Open Google app on your phone
   - Tap the camera icon
   - Point camera at the QR code on your screen
   - Should recognize and offer appropriate action

3. **Test with iPhone Camera:**
   - Open Camera app
   - Point at QR code
   - Tap the notification banner that appears

4. **Test with Android Scanner:**
   - Most Android phones have built-in QR scanning
   - Some may need Google Lens or dedicated QR app

## QR Code Best Practices

### For Maximum Compatibility:
- ✅ Use high contrast colors (black on white is best)
- ✅ Ensure proper content formatting (URLs with https://)
- ✅ Use Medium or High error correction
- ✅ Make QR codes at least 300x300 pixels
- ✅ Test on multiple devices before sharing

### Content Guidelines:
- **URLs**: Must include protocol (`https://example.com`)
- **Email**: Will auto-format as `mailto:user@domain.com`
- **Phone**: Will auto-format as `tel:+1234567890`
- **WiFi**: Use format `NetworkName|Password|WPA`

## Troubleshooting

### If QR codes don't scan:
1. **Check contrast**: Ensure dark/light colors have sufficient difference
2. **Check size**: Make sure QR code is large enough (minimum 300px)
3. **Check content**: Verify URLs have proper protocol
4. **Check device**: Test with different phones/apps
5. **Check lighting**: Ensure good lighting conditions when scanning

### Common Issues:
- **URL without protocol**: Add `https://` to web addresses
- **Low contrast**: Use black (#000000) and white (#FFFFFF)
- **Too small**: Increase QR code size in customization
- **Poor error correction**: Use 'M' or 'H' instead of 'L'

## Recent Improvements Made

### Code Changes:
1. **Enhanced `formatQRContent()` function**: Automatically formats content based on QR type
2. **Improved `generateQRCodeDataUrl()` function**: Better scanning optimization
3. **Color contrast validation**: Automatic fallback to high contrast colors
4. **Increased default settings**: Better size, margin, and error correction

### UI Improvements:
1. **Scanner compatibility score**: Shows how well QR will scan
2. **Real-time tips**: Provides guidance for better scanning
3. **Visual feedback**: Indicates scanning optimization status

The QR codes generated should now work reliably with Google Lens, iPhone Camera, Android built-in scanners, and all major QR code scanning apps.