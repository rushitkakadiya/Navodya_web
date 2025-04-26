import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTopicById, getSubjectById } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TopicDetail = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const { subscribed } = useAuth();
  
  const subject = getSubjectById(subjectId ?? "");
  const topic = getTopicById(subjectId ?? "", topicId ?? "");

  if (!subject || !topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
            <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist.</p>
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
          {/* Topic Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to={`/subjects/${subject.id}`} className="hover:text-primary">{subject.name}</Link>
              <span>/</span>
              <span className="text-gray-700">{topic.title}</span>
            </div>
          </div>

          {/* Topic Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
            <p className="text-lg text-gray-600">{topic.description}</p>
          </div>

          {/* Secure Video Player */}
          <div className="mb-8 bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9 relative">
              <iframe
                src={`https://player.vimeo.com/video/${topic.videoId}?h=ef6760d731&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&title=0&byline=0&portrait=0&controls=1&show_title=0&share=0&embed=0&pip=0&owner=0`}
                title={topic.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute"
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              ></iframe>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Study Material</h2>
              <p className="text-gray-600 mb-6">
                Download the PDF study material for this topic to study offline.
              </p>
              <Link to={`/study-material/${subject.id}/${topic.id}`}>
                <Button className="w-full flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  View Study Material
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Direct Download</h2>
              <p className="text-gray-600 mb-6">
                Download the PDF directly to your device.
              </p>
              <a href={topic.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  Download PDF
                </Button>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Link to={`/subjects/${subject.id}`}>
              <Button variant="outline">Back to {subject.name}</Button>
            </Link>
            <Link to="/live-classes">
              <Button className="bg-primary hover:bg-primary-700">Join Live Classes</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopicDetail;
