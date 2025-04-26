import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Video, ArrowLeft, Loader2, FileText, Clock } from "lucide-react";
import Header from "@/components/Header";
import { useLiveClasses } from '@/hooks/use-subjects';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const LiveClass = () => {
  const { subjectId } = useParams<{ subjectId?: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { data: liveClasses, isLoading, error } = useLiveClasses(subjectId);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [showUserDataForm, setShowUserDataForm] = React.useState(false);
  const [subscriptionValid, setSubscriptionValid] = React.useState(false);
  const [checkingProfile, setCheckingProfile] = React.useState(true);

  // Default thumbnail for live classes
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Live Classes</h2>
            <p className="text-gray-600">Subscribe to join live classes and access all premium content.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Video className="h-5 w-5 text-primary" />
              <span className="text-gray-700">Join live interactive classes</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-gray-700">Access study materials</span>
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

  const getClassThumbnail = (liveClass: LiveClass) => {
    if (liveClass.thumbnail && liveClass.thumbnail.startsWith('http')) {
      return liveClass.thumbnail;
    }
    return DEFAULT_THUMBNAIL;
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="container px-4">
            <div className="text-center text-red-500">
              Error loading live classes. Please try again later.
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
              <Link to="/live-classes" className="text-sm text-gray-500 hover:text-primary flex items-center gap-2">
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
            {subjectId ? `${subjectId} Live Classes` : 'Live Classes'}
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
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
            ) : liveClasses && liveClasses.length > 0 ? (
              liveClasses.map((liveClass: LiveClass) => (
                <div key={liveClass.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
                  <div className="relative pb-[56.25%]">
                    <img
                      src={getClassThumbnail(liveClass)}
                      alt={liveClass.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Error loading thumbnail:', liveClass.thumbnail);
                        (e.target as HTMLImageElement).src = DEFAULT_THUMBNAIL;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full h-12 w-12 flex items-center justify-center">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    {liveClass.status === 'live' && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full flex items-center gap-1">
                        <span className="animate-pulse h-2 w-2 bg-white rounded-full"></span>
                        LIVE
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                      {liveClass.duration}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{liveClass.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">{liveClass.description}</p>
                    <div className="mt-auto">
                      {subscriptionValid ? (
                        <Button
                          onClick={() => navigate(`/live-classes/${liveClass.subjectId}/${liveClass.id}`)}
                          className="w-full"
                        >
                          {liveClass.status === 'live' ? 'Join Now' : 'View Details'}
                        </Button>
                      ) : (
                        <Link to="/subscription" className="block">
                          <Button className="w-full">Get Premium Access</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No live classes available at the moment.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveClass;
