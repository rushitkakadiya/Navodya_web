import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define the Razorpay window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const { currentUser, setSubscribed } = useAuth();
  
  const initiatePayment = () => {
    if (!currentUser) {
      console.error("User is not logged in");
      return;
    }
    
    const options = {
      key: "rzp_test_0xj6AeHVkI5dGd",
      amount: 59900, // Amount in paisa (₹599)
      currency: "INR",
      name: "EduSpark",
      description: "Premium Subscription",
      image: "https://lovable.dev/opengraph-image-p98pqg.png",
      handler: async function(response: any) {
        console.log("Payment ID: " + response.razorpay_payment_id);
        // Update Firestore subscription dates
        try {
          const now = new Date();
          const oneYearLater = new Date();
          oneYearLater.setFullYear(now.getFullYear() + 1);
          await updateDoc(doc(db, 'users', currentUser.email), {
            subscriptionStart: Timestamp.fromDate(now),
            subscriptionEnd: Timestamp.fromDate(oneYearLater),
          });
          // Fetch user doc and update context
          const userDoc = await getDoc(doc(db, 'users', currentUser.email));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const start = data.subscriptionStart?.toDate?.() || new Date(2000,0,1);
            const end = data.subscriptionEnd?.toDate?.() || new Date(2000,0,1);
            const nowDate = new Date();
            setSubscribed(start <= nowDate && nowDate <= end);
          }
          console.log('Subscription dates updated in Firestore');
        } catch (err) {
          console.error('Failed to update subscription dates in Firestore', err);
        }
      },
      prefill: {
        name: currentUser?.displayName || "",
        email: currentUser?.email || "",
      },
      theme: {
        color: "#9b87f5",
      },
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  
  return { initiatePayment };
};
