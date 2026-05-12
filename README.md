# 🟢 Billify - Real-Time Expense Sharing App

<p align="center">
  <img src="./assets/images/logo.png" alt="Billify Logo" width="200"/>
</p>

<p align="center">
  <strong>Collaborative expense tracking made simple</strong>
</p>

---

## 📱 About Billify

Billify is a real-time, collaborative expense-sharing application designed for groups to track collective spending and eliminate the "who owes who" confusion. Built with React Native (Expo), Firebase, and NativeWind (Tailwind CSS).

### ✨ Key Features

- 🔐 **Secure Authentication** - Email/Password & Google OAuth
- 👥 **Group Collaboration** - Create groups, invite members via codes
- 💰 **Smart Expense Splitting** - Equal, Percentage, or Custom splits
- ⚡ **Real-Time Sync** - Firestore onSnapshot listeners
- 📊 **Visual Reports** - Charts and balance summaries
- 🔔 **Push Notifications** - Stay updated on group activity
- 📱 **Cross-Platform** - iOS & Android support

---

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo SDK 52+
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Firebase (Firestore, Authentication, Cloud Functions)
- **State Management**: React Context API
- **Testing**: Jest + React Native Testing Library

---

## 📋 Prerequisites

Before you start, ensure you have installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Expo Go App** on your phone - [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

Optional but recommended:
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

---

## 🚀 Complete Setup Guide

### Step 1: Clone the Repository

Open your terminal (in VS Code: Ctrl + ` or Cmd + `) and run:

```bash
# Clone the repository
git clone https://github.com/Billify-Mobile/billify-app.git

# Navigate into the project folder
cd billify-app

# Switch to development branch
git checkout dev
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# or if you prefer yarn
yarn install
```

This will install all packages listed in `package.json`.

### Step 3: Firebase Setup

#### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `billify-app`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

#### 3.2 Register Your App

1. In Firebase Console, click the **Web icon** (</>)
2. Register app nickname: `Billify Web`
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**
5. **Copy the Firebase configuration object** - you'll need it next

#### 3.3 Enable Authentication

1. In Firebase Console, go to **Authentication** → **Get Started**
2. Enable **Email/Password** sign-in method
3. Enable **Google** sign-in method
   - Add your support email
   - Click **Save**

#### 3.4 Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Start in **Test mode** (we'll add security rules later)
3. Choose a location (asia-southeast1 recommended for Philippines)
4. Click **Enable**

#### 3.5 Set Up Cloud Storage (Optional)

1. Go to **Storage** → **Get started**
2. Start in **Test mode**
3. Click **Done**

### Step 4: Environment Variables Setup

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Open `.env` in VS Code and fill in your Firebase credentials:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Measurement ID for Analytics
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**⚠️ CRITICAL**: Never commit `.env` to GitHub! It's already in `.gitignore`.

### Step 5: Firebase Security Rules

In Firebase Console, go to **Firestore Database** → **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isSignedIn() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId);
    }
    
    // Groups collection
    match /groups/{groupId} {
      allow read: if isSignedIn() && 
                     request.auth.uid in resource.data.members;
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() && 
                               request.auth.uid == resource.data.createdBy;
    }
    
    // Expenses collection
    match /expenses/{expenseId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn() && 
                       request.auth.uid == resource.data.paidBy;
      allow delete: if isSignedIn() && 
                       request.auth.uid == resource.data.paidBy;
    }
    
    // Settlements collection
    match /settlements/{settlementId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && 
                       request.auth.uid == request.resource.data.from;
      allow update, delete: if false; // Settlements are immutable
    }
  }
}
```

Click **Publish**.

### Step 6: Run the App

#### Option A: Using Expo Go (Recommended for Development)

```bash
# Start the development server
npx expo start
```

You'll see a QR code in your terminal. 

**On your phone:**
1. Open **Expo Go** app
2. Scan the QR code
3. Wait for the app to load

**Tip**: Make sure your phone and computer are on the same WiFi network.

#### Option B: Using iOS Simulator (Mac only)

```bash
# Press 'i' in the terminal after running expo start
# OR
npx expo start --ios
```

#### Option C: Using Android Emulator

```bash
# Press 'a' in the terminal after running expo start
# OR
npx expo start --android
```

---

## 📁 Project Structure

```
billify-app/
├── app/                      # Expo Router screens
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx        # Login screen
│   │   └── register.tsx     # Registration screen
│   ├── (tabs)/              # Main app tabs
│   │   ├── index.tsx        # Home/Dashboard
│   │   ├── groups.tsx       # Groups list
│   │   ├── add-expense.tsx  # Add expense form
│   │   ├── balances.tsx     # Balances overview
│   │   └── profile.tsx      # User profile
│   ├── group/[id].tsx       # Group detail screen
│   ├── activity.tsx         # Activity feed
│   ├── reports.tsx          # Expense reports
│   └── _layout.tsx          # Root layout
├── components/              # Reusable UI components
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Avatar.tsx
│   ├── SummaryCard.tsx      # Balance summary card
│   ├── ExpenseCard.tsx      # Expense list item
│   └── GroupCard.tsx        # Group list item
├── contexts/               # React Context providers
│   └── AuthContext.tsx     # Authentication context
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts          # Authentication hook
│   ├── useGroups.ts        # Groups data hook
│   └── useExpenses.ts      # Expenses data hook
├── lib/                    # Utility functions
│   ├── firebase.ts         # Firebase configuration
│   ├── calculations.ts     # Split calculations
│   └── validation.ts       # Form validation
├── db/                     # Database documentation
│   └── schema.md           # Firestore schema
├── assets/                 # Static assets
│   ├── images/
│   │   ├── logo.png
│   │   └── icon.png
│   └── fonts/
├── types/                  # TypeScript type definitions
│   └── index.ts
├── .env                    # Environment variables (DO NOT COMMIT)
├── .env.example            # Example environment file
├── .gitignore             # Git ignore rules
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

---

## 🎨 Development Workflow

### Git Branch Strategy

```
main (production)
  ↑
dev (stable development)
  ↑
feat/your-feature (feature branches)
```

### Creating a New Feature

```bash
# 1. Make sure you're on dev branch
git checkout dev

# 2. Pull latest changes
git pull origin dev

# 3. Create a feature branch
git checkout -b feat/your-feature-name

# 4. Make your changes and commit
git add .
git commit -m "feat: description of your feature"

# 5. Push to GitHub
git push origin feat/your-feature-name

# 6. Create a Pull Request on GitHub to merge into dev
```

### Branch Naming Conventions

- `feat/` - New features (e.g., `feat/google-auth`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `db/` - Database changes (e.g., `db/add-settlements`)
- `ui/` - UI improvements (e.g., `ui/update-home-screen`)
- `docs/` - Documentation (e.g., `docs/update-readme`)

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

Tests are located next to their components with `.test.tsx` extension.

Example: `components/Button.test.tsx`

---

## 📱 Building for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build APK
eas build -p android --profile preview
```

### iOS Build (Requires Mac)

```bash
# Build for iOS
eas build -p ios --profile preview
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@env'"

**Solution**: 
```bash
# Clear cache and restart
npx expo start -c
```

### Issue: Firebase errors

**Solution**: 
1. Double-check your `.env` file
2. Ensure Firebase project is properly configured
3. Check if Firestore and Authentication are enabled

### Issue: QR code doesn't work

**Solution**:
- Ensure phone and computer are on the same WiFi
- Try tunnel mode: `npx expo start --tunnel`

### Issue: App won't run on simulator

**Solution**:
```bash
# Clear watchman cache
watchman watch-del-all

# Clear metro cache
npx expo start -c
```

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

---

## 👥 Team Roles (Sprint 1-3)

- **M1 - Project Lead**: Jomar - Architecture, Git, Scaffolding
- **M2 - Frontend Developer**: Christian - UI/UX Implementation
- **M3 - Backend Developer**: Gabriel - Database Schema, Security Rules
- **M4 - Auth Specialist**: Trixian - Authentication Flow
- **M5 - QA & Documentation**: Wayne - Testing, Documentation

---

## 📝 License

This project is developed as part of IT Elective coursework at New Era University.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request to `dev` branch

---

## 📞 Support

For questions or issues:
- Create an issue in the GitHub repository
- Contact the project lead: Jomar Auditor

---

**Made with 💚 by the Billify Team**
