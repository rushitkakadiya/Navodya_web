import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, ArrowLeft, Download, Loader2, Video, Clock } from "lucide-react";
import Header from "@/components/Header";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { collection, query, where, orderBy, getDocs, addDoc, Timestamp, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Subject {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
}

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  fileUrl: string;
  thumbnail?: string;
  order: number;
  createdAt: any;
  isPremium: boolean;
}

const UserDataForm = ({ email, onComplete }: { email: string, onComplete: () => void }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await setDoc(doc(db, 'users', email), {
        name,
        city,
        mobile,
        email,
        subscriptionStart: Timestamp.fromDate(new Date(2000, 0, 1)),
        subscriptionEnd: Timestamp.fromDate(new Date(2000, 0, 1)),
        createdAt: serverTimestamp(),
      });
      toast.success('Profile details saved!');
      onComplete();
    } catch (err) {
      toast.error('Failed to save profile details');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save & Continue'}</Button>
      </form>
    </div>
  );
};

const StudyMaterials = () => {
  const { subjectId } = useParams<{ subjectId?: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showUserDataForm, setShowUserDataForm] = useState(false);
  const [subscriptionValid, setSubscriptionValid] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  // Default thumbnail for subjects
  const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1509228468518-180dd4864904";

  React.useEffect(() => {
    // User data and subscription check
    const checkUserProfile = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      const userDoc = await getDoc(doc(db, 'users', currentUser.email));
      if (!userDoc.exists() || !userDoc.data().name || !userDoc.data().city || !userDoc.data().mobile) {
        setShowUserDataForm(true);
        setCheckingProfile(false);
        return;
      }
      setUserProfile(userDoc.data());
      // Subscription check
      const now = new Date();
      const start = userDoc.data().subscriptionStart?.toDate?.() || new Date(2000,0,1);
      const end = userDoc.data().subscriptionEnd?.toDate?.() || new Date(2000,0,1);
      setSubscriptionValid(start <= now && now <= end);
      setCheckingProfile(false);
    };
    checkUserProfile();
  }, [currentUser, navigate]);

  React.useEffect(() => {
    if (!currentUser || showUserDataForm) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        if (subjectId) {
          // Fetch study materials for specific subject
          const materialsQuery = query(
            collection(db, 'studyMaterials'),
            where('subjectId', '==', subjectId),
            orderBy('order', 'asc')
          );
          const materialsSnapshot = await getDocs(materialsQuery);
          const materialsData = materialsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as StudyMaterial[];
          setMaterials(materialsData);
          setError(null);
        } else {
          // Fetch all subjects
          const subjectsQuery = query(
            collection(db, 'subjects'),
            orderBy('order', 'asc')
          );
          const subjectsSnapshot = await getDocs(subjectsQuery);
          const subjectsData = subjectsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Subject[];
          setSubjects(subjectsData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subjectId, currentUser, showUserDataForm]);

  if (checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  if (showUserDataForm && currentUser) {
    return <UserDataForm email={currentUser.email} onComplete={() => window.location.reload()} />;
  }

  if (!subscriptionValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Study Materials</h2>
            <p className="text-gray-600">Subscribe to download study materials and access all premium content.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-gray-700">Download study materials</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Video className="h-5 w-5 text-primary" />
              <span className="text-gray-700">Access recorded lectures</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-gray-700">1 year of unlimited access</span>
            </div>
          </div>
          <div className="mt-8">
            <Button 
              onClick={() => navigate('/subscription')} 
              className="w-full bg-primary hover:bg-primary-600"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddTestMaterial = async () => {
    try {
      if (!subjects.length) {
        toast.error('Subjects not loaded yet.');
        return;
      }
      const idToUse = subjectId || subjects[0].id;
      await addDoc(collection(db, 'studyMaterials'), {
        title: 'Test Study Material',
        description: 'This is a test study material.',
        subjectId: idToUse,
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        thumbnail: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        order: 1,
        createdAt: Timestamp.now(),
        isPremium: false,
      });
      toast.success(`Test study material added for subjectId: ${idToUse}`);
    } catch (err) {
      toast.error('Failed to add test study material');
      console.error(err);
    }
  };

  if (error && !subjectId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="container px-4">
            <div className="text-center text-red-500">
              {error}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container px-4">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            {subjectId && (
              <Link to="/study-materials" className="text-sm text-gray-500 hover:text-primary flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to All Subjects
              </Link>
            )}
            <div className="flex gap-2">
              {!currentUser ? (
                <Link to="/signup">
                  <Button size="sm">Sign Up for Full Access</Button>
                </Link>
              ) : !subscriptionValid && (
                <Link to="/subscription">
                  <Button size="sm">Get Premium Access</Button>
                </Link>
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-6">
            {subjectId
              ? `${(subjects.find(s => s.id === subjectId)?.name || 'Subject')} Study Materials`
              : 'Study Materials'}
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="relative pb-[56.25%]">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))
            ) : subjectId ? (
              materials.length > 0 ? (
                materials.map((material) => (
                  <div key={material.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
                    <div className="relative pb-[56.25%]">
                      <img
                        src={material.thumbnail || DEFAULT_THUMBNAIL}
                        alt={material.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full h-12 w-12 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-2 line-clamp-1">{material.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">{material.description}</p>
                      <div className="mt-auto flex gap-2">
                        {material.isPremium && !subscriptionValid ? (
                          <Link to="/subscription" className="block w-full">
                            <Button className="w-full">Get Premium Access</Button>
                          </Link>
                        ) : (
                          <a
                            href={material.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <Button className="w-full flex items-center gap-2">
                              <FileText className="h-4 w-4" /> View
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  <div className="bg-white rounded-xl shadow-sm border p-8 max-w-2xl mx-auto">
                    <div className="text-gray-500 mb-4">
                      <FileText className="h-12 w-12 mx-auto text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Materials Available Yet</h3>
                    <p className="text-gray-600 mb-4">
                      There are no study materials available for this subject at the moment. Please check back later.
                    </p>
                    <Button
                      onClick={() => navigate('/study-materials')}
                      variant="outline"
                    >
                      Back to Subjects
                    </Button>
                  </div>
                </div>
              )
            ) : (
              subjects.length > 0 ? (
                subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    to={`/study-materials/${subject.id}`}
                    className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative pb-[56.25%]">
                      <img
                        src={subject.image || DEFAULT_THUMBNAIL}
                        alt={subject.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{subject.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{subject.description}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No subjects available at the moment.
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyMaterials;
