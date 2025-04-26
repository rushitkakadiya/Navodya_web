import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRazorpay } from "@/lib/razorpay";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Subscription = () => {
  const { initiatePayment } = useRazorpay();
  const { currentUser, subscribed } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (subscribed) {
      toast.success("You already have an active subscription!");
    }
  }, [subscribed]);
  
  const handlePurchase = () => {
    if (!currentUser) {
      toast.error("Please log in to purchase a subscription");
      navigate("/login");
      return;
    }
    initiatePayment();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Unlock Premium Learning</h1>
            <p className="text-lg text-gray-600">
              Get full access to all courses, study materials, and recorded lectures to excel in your exams.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="bg-primary text-white p-6 text-center">
              <h2 className="text-2xl font-bold">Complete Access Package</h2>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-3xl font-bold">₹599</span>
                <span className="ml-2 text-white/80">one-time payment</span>
              </div>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Full access to all courses in Maths, Mental Ability, and Gujarati Language</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Access to recorded lectures and tutorials for 1 year</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Downloadable study materials and practice exercises</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Access to live classes and Q&A sessions for 1 year</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Exam preparation guides and tips</span>
                </li>
              </ul>
              
              <div className="mt-8">
                {subscribed ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-green-700 font-medium flex items-center justify-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      You already have active access!
                    </p>
                    <Button 
                      onClick={() => navigate("/")} 
                      className="mt-4 bg-green-600 hover:bg-green-700"
                    >
                      Start Learning
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handlePurchase} 
                    className="w-full bg-primary hover:bg-primary-700 py-6 text-lg"
                  >
                    Buy Access Now
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Secure payment processed by Razorpay. No recurring charges.
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold">How long does my access last?</h3>
                <p className="mt-2 text-gray-600">Your access is valid for 1 year from the date of purchase.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold">Can I download the study materials?</h3>
                <p className="mt-2 text-gray-600">Yes, all PDF study materials can be downloaded for offline use.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold">Do you offer refunds?</h3>
                <p className="mt-2 text-gray-600">We offer a 7-day money-back guarantee if you're not satisfied with the content.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold">How can I access live classes?</h3>
                <p className="mt-2 text-gray-600">Live classes can be accessed from the Live Classes page according to the schedule.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
