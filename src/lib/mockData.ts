export interface Subject {
  id: string;
  name: string;
  description: string;
  image: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  videoId: string;
  pdfUrl: string;
  duration: string;
  thumbnail?: string;
  mxdropUrl?: string;
}

export const subjects: Subject[] = [
  {
    id: "maths",
    name: "Maths",
    description: "Comprehensive maths course for students of all levels.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    topics: [
      {
        id: "math-topic-1",
        title: "Introduction to Algebra",
        description: "Learn the basics of algebraic expressions and equations.",
        videoId: "1077466257",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "15 minutes",
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        mxdropUrl: "//mxdrop.to/e/wldwn6r3b7em7z"
      },
      {
        id: "math-topic-2",
        title: "Geometry Fundamentals",
        description: "Explore the fundamental concepts of geometry.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "20 minutes",
        thumbnail: "/images/topics/geometry.webp",
        mxdropUrl: "//mxdrop.to/e/wldwn6r3b7em7z"
      },
      {
        id: "math-topic-3",
        title: "Calculus Basics",
        description: "An introduction to the core concepts of calculus.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "18 minutes",
        mxdropUrl: "//mxdrop.to/e/wldwn6r3b7em7z"
      },
    ],
  },
  {
    id: "mental-ability",
    name: "Mental Ability",
    description: "Sharpen your mental skills with our comprehensive course.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    topics: [
      {
        id: "mental-topic-1",
        title: "Logical Reasoning",
        description: "Enhance your logical reasoning skills.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "12 minutes",
        thumbnail: "/images/topics/reasoning.webp",
      },
      {
        id: "mental-topic-2",
        title: "Problem Solving",
        description: "Improve your problem-solving abilities.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "22 minutes",
        thumbnail: "/images/topics/problem-solving.webp",
      },
      {
        id: "mental-topic-3",
        title: "Aptitude Training",
        description: "Train your aptitude with our expert tutorials.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "16 minutes",
      },
    ],
  },
  {
    id: "gujarati",
    name: "Gujarati",
    description: "Learn Gujarati language and literature with ease.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    topics: [
      {
        id: "gujarati-topic-1",
        title: "Gujarati Grammar",
        description: "Master the grammar of the Gujarati language.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "14 minutes",
        thumbnail: "/images/topics/grammar.webp",
      },
      {
        id: "gujarati-topic-2",
        title: "Gujarati Literature",
        description: "Explore the rich literature of Gujarat.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "25 minutes",
        thumbnail: "/images/topics/literature.webp",
      },
    ],
  },
  {
    id: "english",
    name: "English",
    description: "Enhance your English language skills.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    topics: [
      {
        id: "english-topic-1",
        title: "English Grammar",
        description: "Master the grammar of the English language.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "14 minutes",
        thumbnail: "/images/topics/grammar.webp",
      },
      {
        id: "english-topic-2",
        title: "English Literature",
        description: "Explore the rich literature of English.",
        videoId: "V_xro1bcAuA",
        pdfUrl: "/pdfs/sample.pdf",
        duration: "25 minutes",
        thumbnail: "/images/topics/literature.webp",
      },
    ],
  },
];

export const getSubjectById = (id: string) => subjects.find((subject) => subject.id === id);

export const getTopicById = (subjectId: string, topicId: string) => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return null;
  
  const topic = subject.topics.find(t => t.id === topicId);
  if (topic) {
    topic.videoId = '1077466257'; // Set the Vimeo video ID
  }
  
  return topic || null;
};

export const getAllTopics = () => {
  const allTopics = subjects.flatMap(subject => 
    subject.topics.map(topic => ({
      subjectId: subject.id,
      topic
    }))
  );
  return allTopics;
};
