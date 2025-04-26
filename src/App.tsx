import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import SubjectDashboard from "./pages/SubjectDashboard";
import TopicDetail from "./pages/TopicDetail";
import StudyMaterial from "./pages/StudyMaterial";
import LiveClass from "./pages/LiveClass";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import RecordedLectures from "@/pages/RecordedLectures";
import StudyMaterials from "./pages/StudyMaterials";
import RecordedVideo from "@/pages/RecordedVideo";
import FeaturedTopicVideo from "@/components/FeaturedTopicVideo";
import { ErrorBoundary } from "react-error-boundary";
import VideoSDKRoom from "@/components/VideoSDKRoom";

// Create a new QueryClient instance with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

const App = () => {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/subjects/:subject" element={<SubjectDashboard />} />
                <Route path="/topics/:subjectId/:topicId" element={
                  <PrivateRoute requiresSubscription={true}>
                    <TopicDetail />
                  </PrivateRoute>
                } />
                <Route path="/study-material/:subjectId/:topicId" element={
                  <PrivateRoute requiresSubscription={true}>
                    <StudyMaterial />
                  </PrivateRoute>
                } />
                <Route path="/live-classes" element={<LiveClass />} />
                <Route path="/live-classes/:subjectId" element={
                  <PrivateRoute requiresSubscription={true}>
                    <LiveClass />
                  </PrivateRoute>
                } />
                <Route path="/live-classes/:subjectId/:classId" element={
                  <PrivateRoute requiresSubscription={true}>
                    <VideoSDKRoom />
                  </PrivateRoute>
                } />
                <Route path="/recorded-lectures" element={<RecordedLectures />} />
                <Route path="/recorded-lectures/:subjectId" element={
                  <PrivateRoute requiresSubscription={true}>
                    <RecordedLectures />
                  </PrivateRoute>
                } />
                <Route path="/recorded-lectures/:subjectId/:lectureId" element={<RecordedVideo />} />
                <Route path="/study-materials" element={<StudyMaterials />} />
                <Route path="/study-materials/:subjectId" element={
                  <PrivateRoute requiresSubscription={true}>
                    <StudyMaterials />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/featured-video/:topicId" element={
                  <PrivateRoute requiresSubscription={true}>
                    <FeaturedTopicVideo />
                  </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
