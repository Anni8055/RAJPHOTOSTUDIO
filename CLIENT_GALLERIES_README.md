# Client Gallery Setup Instructions

This document provides instructions on how to set up the client gallery feature for your wedding photography website.

## Overview

The client gallery feature allows you to:
1. Upload and organize photos for individual clients
2. Share private galleries with clients via unique links
3. Allow clients to view and download their photos

The system is built with Firebase for authentication, storage, and database functionality.

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once your project is created, click on the web icon (</>) to add a web app
4. Register your app with a nickname (e.g., "Wedding Photography Galleries")
5. Copy the Firebase configuration values for the next step

### 2. Configure Environment Variables

1. Create a file named `.env.local` in the root directory of your project
2. Add the following environment variables with your Firebase project values:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 3. Enable Firebase Services

#### Authentication:
1. In Firebase Console, go to "Authentication" and click "Get Started"
2. Enable the Email/Password sign-in method
3. Add your admin email address as a user (use the "Add user" button)

#### Firestore Database:
1. Go to "Firestore Database" and click "Create database"
2. Start in production mode
3. Choose a location closest to your primary audience
4. Create the following security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow admin access to everything if authenticated
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public access to galleries via ID
    match /galleries/{galleryId} {
      allow read: if true;
    }
  }
}
```

#### Storage:
1. Go to "Storage" and click "Get Started"
2. Choose a location closest to your primary audience
3. Create the following security rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Admin can read/write all files
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    // Anyone can read gallery images
    match /galleries/{galleryId}/{allImages=**} {
      allow read: if true;
    }
  }
}
```

### 4. Deploy and Access

1. Build and deploy your application
2. Access the admin dashboard at `/admin/login`
3. Log in with your admin credentials
4. Start creating client galleries!

## Usage Guide

### Creating a Client Gallery

1. Log in to the admin dashboard at `/admin/login`
2. Click on the "Upload New" tab
3. Fill in client details and gallery name
4. Upload photos by dragging and dropping or clicking the upload area
5. Click "Upload Gallery" to create the gallery

### Sharing Galleries with Clients

1. From the admin dashboard, locate the client's gallery
2. Click "Share Link" to copy the unique gallery URL
3. Send this URL to your client via email or your preferred method

### Client Access

1. Clients can access their gallery with the provided link
2. No login is required as the link contains a unique gallery ID
3. Clients can view and download individual photos

## Troubleshooting

- If you encounter CORS issues, ensure you've configured Firebase Storage properly
- For authentication problems, check that the admin email is registered in Firebase Authentication
- If gallery uploads fail, verify your Firebase Storage permissions and bucket setup

For additional assistance, refer to the [Firebase documentation](https://firebase.google.com/docs). 