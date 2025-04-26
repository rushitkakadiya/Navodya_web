import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { auth, createUserWithEmailAndPassword } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eye, EyeOff } from "lucide-react";
import { doc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

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

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [showUserDataForm, setShowUserDataForm] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Account created successfully!");
      setNewUserEmail(data.email);
      setShowUserDataForm(true);
      // Do not navigate yet, wait for user data form
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="text-gray-600 mt-2">Join EduSpark and start learning today</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            {showUserDataForm && newUserEmail ? (
              <UserDataForm email={newUserEmail} onComplete={() => navigate('/')} />
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="you@example.com" 
                            className="h-12 rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              className="h-12 rounded-lg border-gray-300 focus:ring-primary focus:border-primary pr-10"
                              {...field} 
                            />
                          </FormControl>
                          <button 
                            type="button" 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(prev => !prev)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              className="h-12 rounded-lg border-gray-300 focus:ring-primary focus:border-primary pr-10"
                              {...field} 
                            />
                          </FormControl>
                          <button 
                            type="button" 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-medium rounded-lg shadow-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Sign up"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary hover:text-primary-600">
                  Log in
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
