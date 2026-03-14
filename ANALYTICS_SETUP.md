# OncoCalcRx Analytics Setup Guide

## Overview
Your OncoCalcRx app now has comprehensive analytics tracking implemented using Google Analytics 4 (GA4). This will help you monitor usage patterns, user behavior, and app performance.

## Setup Instructions

### 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Enter your account name (e.g., "OncoCalcRx Analytics")
5. Choose your data sharing settings
6. Click "Next"

### 2. Set up Property
1. Enter property name: "OncoCalcRx"
2. Select your reporting time zone
3. Select currency (USD recommended)
4. Click "Next"

### 3. Choose Business Information
1. Select "Health and fitness" or "Science and education" as industry category
2. Select business size (likely "Small" for individual practice)
3. Choose "Get baseline reports" as your objective
4. Click "Create"

### 4. Accept Terms of Service
1. Select your country
2. Accept the Google Analytics Terms of Service
3. Accept the Google Measurement Terms of Service

### 5. Get Your Measurement ID
1. In your new property, click "Data Streams"
2. Click "Add stream" → "Web"
3. Enter your website URL (where you'll host OncoCalcRx)
4. Enter stream name: "OncoCalcRx Web App"
5. Click "Create stream"
6. **Copy the Measurement ID** (format: G-XXXXXXXXXX)

### 6. Update Your App Code
1. Open `/Users/prathyusha/Desktop/chemoprotocols 2/index.html`
2. Find line 10: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
3. Replace both instances of `GA_MEASUREMENT_ID` with your actual Measurement ID
4. Save the file

Example:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', 'G-ABC123DEF4', {
        page_title: 'OncoCalcRx - Chemotherapy Dose Calculator',
        page_location: window.location.href
    });
</script>
```

## What's Being Tracked

### 1. App Usage Events
- **app_start**: When users first load the app
- **patient_info_completed**: When users complete patient information
- **protocol_selected**: When users select a chemotherapy protocol
- **dose_calculated**: When dose calculations are performed
- **dose_adjustment_started**: When users begin dose adjustments
- **final_prescription_generated**: When final prescriptions are created

### 2. Page Views
- Patient Information page
- Regimen Selection page  
- Dose Results page
- Dose Adjustment page
- Final Prescription page

### 3. User Behavior Data
- Protocol selection method (search vs browse)
- Cancer types being treated
- Device/browser information
- Session duration
- Geographic location (if enabled)

## Viewing Your Analytics

### 1. Real-time Data
1. Go to your Google Analytics property
2. Click "Reports" → "Realtime"
3. See current active users and their activity

### 2. User Engagement
1. Click "Reports" → "Engagement" → "Events"
2. View all the custom events being tracked
3. See which protocols are most commonly used
4. Monitor completion rates through the workflow

### 3. Custom Reports
Create custom reports to track:
- Most popular cancer types
- Protocol selection methods
- Completion rates by page
- User flow through the application

### 4. Key Metrics to Monitor
- **Daily Active Users**: How many oncologists use the app daily
- **Session Duration**: How long users spend calculating doses
- **Protocol Popularity**: Which regimens are used most frequently
- **Completion Rate**: Percentage of users who complete calculations
- **Geographic Distribution**: Where your users are located

## Data Privacy Considerations
- Analytics data is anonymized and aggregated
- No patient health information (PHI) is tracked
- Only app usage patterns and workflow data are collected
- Consider adding a privacy notice to your app if required by your institution

## Troubleshooting
1. **No data appearing**: Check that you've replaced GA_MEASUREMENT_ID correctly
2. **Events not tracking**: Open browser developer tools to check for JavaScript errors
3. **Real-time data not showing**: Make sure you're testing from a different network than where you set up GA

## Advanced Features
Consider enabling:
- **Enhanced measurement**: Automatic scroll tracking, file downloads
- **Conversions**: Mark successful dose calculations as conversion events
- **Audiences**: Segment users by cancer type or usage patterns
- **Attribution modeling**: Understand user acquisition channels

Your OncoCalcRx app is now ready for comprehensive usage analytics!