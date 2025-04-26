
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What age group is this course designed for?",
    answer: "This course is specifically designed for Class 5 students, typically between 10-11 years old. The content and teaching methods are age-appropriate and aligned with the Class 5 geometry curriculum."
  },
  {
    question: "How long does the complete course take to finish?",
    answer: "The complete course is designed to be completed in about 14 weeks, with 2-3 lessons per week. However, students can learn at their own pace, and access to course materials is available for a full year from enrollment."
  },
  {
    question: "Do I need to purchase any additional materials for this course?",
    answer: "No, all necessary learning materials are provided with the course. Students only need basic stationery like pencils, rulers, and a compass for the practical exercises. All worksheets and activity sheets can be downloaded and printed."
  },
  {
    question: "How will my child's progress be tracked?",
    answer: "The course includes regular assessments, quizzes, and exercises that help track progress. Parents receive monthly progress reports highlighting strengths and areas that need improvement."
  },
  {
    question: "Can my child access the course materials after completion?",
    answer: "Yes, students have access to all course materials for a full year from the date of enrollment, allowing them to revisit topics and practice as needed."
  },
  {
    question: "Is there any homework assigned in this course?",
    answer: "Yes, each lesson includes practice exercises and activities to reinforce learning. These are designed to be engaging and typically take 15-20 minutes to complete."
  }
];

const FAQsSection = () => {
  return (
    <section className="py-20 bg-geometry-50" id="faqs">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our Class 5 Geometry course.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left font-medium py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="py-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
