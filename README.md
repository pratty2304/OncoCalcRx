# OncoCalcRx Web App

Chemotherapy Dose Calculator - Mobile-First Web Application

## 📱 Features
- Complete chemotherapy protocol database (200+ protocols)
- BSA calculations using Mosteller's formula
- Carboplatin AUC calculations
- 38+ cancer types with subtypes
- Mobile-optimized responsive interface
- Works on any device with a web browser
- 📊 Usage analytics with Google Analytics 4
- Real-time dose adjustments and final prescription generation

## 🚀 Quick Start

### Prerequisites
- Any modern web browser
- Optional: Python 3 or Node.js for local development

### Running the App

#### Option 1: Direct File Access
Simply open `index.html` in any web browser

#### Option 2: Local Development Server
```bash
# Using Python
npm run start

# Or using Node.js serve
npm run serve

# Then visit: http://localhost:3000
```

### Available Scripts

- `npm run start` - Start Python development server on port 3000
- `npm run serve` - Start Node.js serve on port 3000

## 📁 Project Structure

```
oncocalcrx/
├── index.html              # Main web application
├── app.js                  # Application logic & protocol database
├── splash-bg.png           # Custom splash screen image
├── package.json            # Project configuration
├── ANALYTICS_SETUP.md      # Google Analytics configuration guide
└── README.md               # This file
```

## 📊 Analytics Setup

OncoCalcRx includes comprehensive usage analytics to track how medical professionals use the calculator.

**Quick Setup:**
1. See `ANALYTICS_SETUP.md` for detailed Google Analytics 4 configuration
2. Replace `GA_MEASUREMENT_ID` in `index.html` with your Analytics ID
3. View usage reports in your Google Analytics dashboard

**Events Tracked:**
- App usage and user sessions
- Protocol selection methods (search vs browse)
- Dose calculations by cancer type
- Dose adjustments and final prescriptions
- User workflow completion rates

## 🌐 Deployment

### Web Hosting
Deploy to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Apache/Nginx server

### PWA (Progressive Web App)
The app is designed to work offline and can be installed on mobile devices as a PWA.

## 📱 Mobile Usage

- **Responsive Design**: Optimized for mobile devices
- **Touch-Friendly**: Large buttons and form elements
- **Offline Capable**: Works without internet connection
- **Install as App**: Can be added to home screen on mobile devices

## 🏥 Medical Disclaimer

This app is for educational and reference purposes only. Always consult with qualified healthcare professionals for medical decisions.