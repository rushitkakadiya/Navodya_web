
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSubjectById } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Video, FileText, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SubjectDashboard = () => {
  const { subject: subjectId } = useParams<{ subject: string }>();
  const { currentUser, subscribed } = useAuth();
  const subject = getSubjectById(subjectId ?? "");

  if (!subject) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Subject Not Found</h1>
            <p className="text-gray-600 mb-6">The subject you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container">
          {/* Subject Header */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <Link to="/" className="text-sm text-gray-500 hover:text-primary">
                ← Back to Home
              </Link>
              {!currentUser ? (
                <Link to="/signup">
                  <Button size="sm">Sign Up for Full Access</Button>
                </Link>
              ) : !subscribed ? (
                <Link to="/subscription">
                  <Button size="sm">Get Premium Access</Button>
                </Link>
              ) : null}
            </div>
            <h1 className="text-3xl font-bold mb-4">{subject.name}</h1>
            <p className="text-lg text-gray-600 max-w-3xl">{subject.description}</p>
          </div>

          {/* Topics List */}
          <div className="grid gap-6">
            {subject.topics.map((topic, index) => (
              <div key={topic.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 aspect-[16/9] md:aspect-auto relative">
                    <img
                      src={topic.thumbnail || `https://img.youtube.com/vi/${topic.videoId}/maxresdefault.jpg`}
                      alt={topic.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/30 rounded-full h-12 w-12 flex items-center justify-center">
                        <Video className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                      {topic.duration}
                    </div>
                    {!subscribed && (
                      <div className="absolute top-0 right-0 bg-primary px-2 py-1 text-xs text-white rounded-bl">
                        <Lock className="h-3 w-3 inline-block mr-1" />
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col">
                    <div className="mb-4">
                      <span className="text-xs bg-primary-50 text-primary px-2 py-1 rounded">
                        Topic {index + 1}
                      </span>
                      <h2 className="text-xl font-bold mt-2">{topic.title}</h2>
                      <p className="text-gray-600 mt-2">{topic.description}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-3">
                      <Link to={`/topics/${subject.id}/${topic.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Video className="h-4 w-4" /> Watch Lecture
                        </Button>
                      </Link>
                      <Link to={`/study-material/${subject.id}/${topic.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" /> Study Material
                        </Button>
                      </Link>
                      {/* Additional course buttons could go here */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA if not subscribed */}
          {!subscribed && (
            <div className="bg-primary-50 mt-12 p-8 rounded-lg border border-primary-100 text-center">
              <h2 className="text-2xl font-bold mb-4">Unlock All Content</h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Get full access to all lectures, study materials, and more with our premium subscription.
              </p>
              <Link to="/subscription">
                <Button className="bg-primary hover:bg-primary-700">Get Premium Access</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectDashboard;
