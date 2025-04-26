
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTopicById, getSubjectById } from "@/lib/mockData";
import { Download, Video } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const StudyMaterial = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  
  const subject = getSubjectById(subjectId ?? "");
  const topic = getTopicById(subjectId ?? "", topicId ?? "");

  if (!subject || !topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Study Material Not Found</h1>
            <p className="text-gray-600 mb-6">The study material you're looking for doesn't exist.</p>
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
          {/* Navigation Breadcrumbs */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to={`/subjects/${subject.id}`} className="hover:text-primary">{subject.name}</Link>
              <span>/</span>
              <Link to={`/topics/${subject.id}/${topic.id}`} className="hover:text-primary">{topic.title}</Link>
              <span>/</span>
              <span className="text-gray-700">Study Material</span>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{topic.title} - Study Material</h1>
            <p className="text-lg text-gray-600">
              Comprehensive study material for {topic.title} in {subject.name}.
            </p>
          </div>

          {/* PDF Embed */}
          <div className="mb-8 bg-white rounded-lg overflow-hidden shadow-lg border">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(topic.pdfUrl)}&embedded=true`}
              title={`${topic.title} PDF`}
              className="w-full h-96 md:h-[600px]"
            ></iframe>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Download PDF</h2>
              <p className="text-gray-600 mb-6">
                Download this study material to your device for offline studying.
              </p>
              <a href={topic.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-primary hover:bg-primary-700 flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  Download PDF
                </Button>
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Watch Video Lecture</h2>
              <p className="text-gray-600 mb-6">
                Return to the video lecture for this topic.
              </p>
              <Link to={`/topics/${subject.id}/${topic.id}`}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Video className="h-5 w-5" />
                  Watch Lecture
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            <Link to={`/subjects/${subject.id}`}>
              <Button variant="outline">Back to {subject.name}</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudyMaterial;
