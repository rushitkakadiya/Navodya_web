import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from '@/components/ui/sonner';

interface RecordedLecture {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  order: number;
  createdAt: any;
  isPremium: boolean;
}

const RecordedVideo = () => {
  const { subjectId, lectureId } = useParams<{ subjectId: string; lectureId: string }>();
  const { currentUser, subscribed } = useAuth();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState<RecordedLecture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLecture = async () => {
      if (!lectureId) {
        setError('Invalid lecture ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const lectureDoc = await getDoc(doc(db, 'recordedLectures', lectureId));
        
        if (!lectureDoc.exists()) {
          setError('Lecture not found. It may have been removed or is no longer available.');
          toast.error('Lecture not found');
          return;
        }

        const lectureData = {
          id: lectureDoc.id,
          ...lectureDoc.data()
        } as RecordedLecture;

        // Check if user has access
        if (lectureData.isPremium && !subscribed) {
          navigate('/subscription');
          return;
        }

        setLecture(lectureData);
        setError(null);
      } catch (err) {
        console.error('Error fetching lecture:', err);
        setError('Failed to load lecture. Please try again later.');
        toast.error('Failed to load lecture');
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lectureId, subscribed, navigate]);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse w-full max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!lecture) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      {/* Square back button with rounded corners and grey background */}
      <button
        onClick={() => navigate(`/recorded-lectures/${subjectId}`)}
        className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-gray-700/80 hover:bg-gray-600/80 rounded-lg transition-colors"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5 text-white" />
      </button>
      <iframe
        src={lecture.videoUrl}
        title={lecture.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: 'black'
        }}
      />
    </div>
  );
};

export default RecordedVideo; 