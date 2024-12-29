"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createReview } from "@/lib/actions/Review.action";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." }),
  lastName: z.string().optional(),
  review: z
    .string()
    .min(2, { message: "Review must be at least 2 characters." })
    .max(200, { message: "Review must be at most 200 characters." }),
});

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", firstName: "", lastName: "", review: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    try {
      await createReview({ ...values, isRead: false } as any);
      toast.success("Review submitted successfully.");
      form.reset();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="contact" className="relative flower-bg-3">
      <section className="mx-auto flex w-full flex-col justify-center items-start p-10">
        {/* Header Image */}
        <picture className="relative z-20 w-[250px] md:w-[300px] lg:w-[450px] h-[50px] lg:h-20 font-semibold mt-32">
          <Image
            src="/assets/contact.webp"
            fill
            className="lg:ml-[255px] object-center drop-shadow-white object-contain"
            alt="Contact"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </picture>

        {/* Form Section */}
        <div className="flex items-center justify-center w-full mx-auto my-10 relative z-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 md:w-1/3 w-full"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Enter your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant={"padseva"}
                type="submit"
                className="w-full bg-[#91373E] hover:bg-[#63262b] disabled:opacity-45 "
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <span>Submit Message</span>
                )}
                <div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
