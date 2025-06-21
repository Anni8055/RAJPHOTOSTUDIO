import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDXdXjqm_Amlk6U52-o4bt-JFC-tM1yWE",
  authDomain: "raj-photo-studio-90493.firebaseapp.com",
  projectId: "raj-photo-studio-90493",
  storageBucket: "raj-photo-studio-90493.firebasestorage.app",
  messagingSenderId: "598294774651",
  appId: "1:598294774651:web:8b84151e1b8ccbf25833de",
  measurementId: "G-2RHVNN6JWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Initialize Analytics with a safe wrapper
const analyticsInstance = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Create a safer version of analytics that won't break if not loaded
export const analytics = {
  logEvent: (eventName: string, eventParams?: Record<string, any>) => {
    if (analyticsInstance) {
      try {
        firebaseLogEvent(analyticsInstance, eventName, eventParams);
      } catch (error) {
        console.error('Analytics error:', error);
      }
    }
  }
};

export default app; 