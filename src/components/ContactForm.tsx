
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const templateParams = {
        to_name: 'Rushit',
        from_name: data.name,
        reply_to: data.email,
        phone_number: data.phone,
        message: data.message,
        user_email: data.email
      };

      console.log('Sending email with params:', templateParams);
      
      const response = await emailjs.send(
        'service_Navodaya',
        'template_b222d0p',
        templateParams
      );
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error: any) {
      console.error('Error sending email:', error);
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error?.status === 412) {
        errorMessage = 'Email service needs reconnection. Please contact the administrator.';
        console.error('EmailJS Gmail API authentication error. Please reconnect the Gmail service in EmailJS dashboard.');
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Have Questions?</h2>
      <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="What would you like to know?" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary-700 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
