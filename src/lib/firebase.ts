import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  DocumentReference,
  DocumentData,
  query,
  where,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApxEcepLmmewMkyCe4ZGW_1gckKwitM_c",
  authDomain: "navodaya-education-portal.firebaseapp.com",
  projectId: "navodaya-education-portal",
  storageBucket: "navodaya-education-portal.firebasestorage.app",
  messagingSenderId: "766779375233",
  appId: "1:766779375233:web:7cae92b845d05dce4d9780",
  measurementId: "G-KC8N4WW1HF"
};

// Initialize Firebase with error handling
let app;
let auth;
let db;

try {
  console.log('Initializing Firebase...');
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
  
  auth = getAuth(app);
  console.log('Auth initialized successfully');
  
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Get a single document by reference
export const getDocument = async <T = DocumentData>(ref: DocumentReference): Promise<T> => {
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()) {
    throw new Error('Document not found');
  }
  return { id: docSnap.id, ...docSnap.data() } as T;
};

// Get all documents from a collection with error handling
export const getCollection = async <T = DocumentData>(collectionPath: string): Promise<T[]> => {
  try {
    console.log('Fetching collection:', collectionPath);
    const colRef = collection(db, collectionPath);
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching collection ${collectionPath}:`, error);
    throw error;
  }
};

// Video related functions
export const getVideoDocument = async (videoId: string) => {
  const videoRef = doc(db, 'videos', videoId);
  return getDocument(videoRef);
};

export const getFeaturedTopics = async () => {
  try {
    console.log('Fetching featured topics...');
    const topics = await getCollection('featuredTopics');
    console.log('Featured topics fetched:', topics);
    return topics;
  } catch (error) {
    console.error('Error fetching featured topics:', error);
    throw error;
  }
};

export const getSubjects = async () => {
  return getCollection('subjects');
};

// Helper function to get document reference
export const getDocRef = (collectionPath: string, docId: string) => {
  return doc(db, collectionPath, docId);
};

interface LiveClass {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  subjectId: string;
  roomUrl: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'ended';
}

interface LiveClassDocument {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  subjectId: string;
  roomUrl: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'ended';
}

export const getLiveClasses = async (subjectId?: string): Promise<LiveClass[]> => {
  try {
    console.log('🔍 Checking database for classes...');
    
    // Get reference to the collection
    const colRef = collection(db, 'liveClasses');
    console.log('📚 Collection path:', colRef.path);
    
    let q;
    if (subjectId) {
      q = query(colRef, where('subjectId', '==', subjectId));
    } else {
      q = colRef;
    }
    
    const snapshot = await getDocs(q);
    console.log('✅ Found documents:', snapshot.docs.length);
    
    // Log each document
    snapshot.docs.forEach((doc, index) => {
      const data = doc.data() as LiveClassDocument;
      console.log(`📄 Class ${index + 1}:`, {
        id: doc.id,
        title: data.title,
        subjectId: data.subjectId
      });
    });
    
    const data = snapshot.docs.map(doc => {
      const docData = doc.data() as LiveClassDocument;
      return {
        id: doc.id,
        title: docData.title || '',
        description: docData.description || '',
        thumbnail: docData.thumbnail || '',
        duration: docData.duration || '',
        subjectId: docData.subjectId || '',
        roomUrl: docData.roomUrl || '',
        startTime: docData.startTime || '',
        status: docData.status || 'upcoming'
      };
    });
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching classes:', error);
    throw error;
  }
};

// Function to add a sample live class
export const addSampleLiveClass = async () => {
  try {
    const liveClassesRef = collection(db, 'liveClasses');
    const sampleClasses = [
      {
        title: "Introduction to Geometry",
        description: "Learn the basics of geometry including points, lines, and shapes",
        thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
        duration: "60 minutes",
        subjectId: "mathematics",
        roomUrl: "https://rushit-livestream-1710.app.100ms.live/streaming/meeting/wle-tyij-kdd",
        startTime: new Date().toISOString(),
        status: "live",
        createdAt: serverTimestamp()
      },
      {
        title: "Advanced Algebra Concepts",
        description: "Deep dive into advanced algebraic concepts and problem solving",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
        duration: "45 minutes",
        subjectId: "mathematics",
        roomUrl: "https://rushit-livestream-1710.app.100ms.live/streaming/meeting/adv-algebra",
        startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        status: "upcoming",
        createdAt: serverTimestamp()
      },
      {
        title: "Physics Fundamentals",
        description: "Understanding basic physics principles and mechanics",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
        duration: "90 minutes",
        subjectId: "physics",
        roomUrl: "https://rushit-livestream-1710.app.100ms.live/streaming/meeting/physics-101",
        startTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        status: "ended",
        createdAt: serverTimestamp()
      }
    ];

    const results = await Promise.all(
      sampleClasses.map(sampleClass => addDoc(liveClassesRef, sampleClass))
    );

    console.log('Added sample live classes with IDs:', results.map(doc => doc.id));
    return results.map(doc => doc.id);
  } catch (error) {
    console.error('Error adding sample live classes:', error);
    throw error;
  }
};

export { 
  app, 
  auth, 
  db,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};

export type { User };
