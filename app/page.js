import { getDailyPrompt } from "@/actions/public";
import TestimonialCarousel from "@/components/testimonialCarousel";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Ensure AccordionTrigger and AccordionContent are imported
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, Calendar, ChevronRight, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How can I reset my password?",
    answer: "To reset your password, go to the login page, click on 'Forgot Password', and follow the instructions sent to your email."
  },
  {
    question: "Is there a free version of the app?",
    answer: "Yes, the app has a free version with limited features. You can unlock additional features by upgrading to the premium version."
  },
  {
    question: "How do I delete my account?",
    answer: "To delete your account, go to the settings page and select 'Delete Account'. Please note that this action is permanent."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact customer support by emailing support@example.com or by using the 'Contact Us' feature within the app."
  },
  {
    question: "Can I sync my data across devices?",
    answer: "Yes, you can sync your data across multiple devices by logging in with the same account on each device."
  },
  {
    question: "How do I upgrade to premium?",
    answer: "To upgrade to premium, go to the settings page, select 'Upgrade to Premium', and follow the instructions for payment."
  },
  {
    question: "Can I export my data?",
    answer: "Yes, you can export your data to PDF or CSV format from the settings page."
  }
]

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default async function Landingpage() {

  const advice = await getDailyPrompt();

  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 gradient-title">
          Your Space to Reflect. <br /> Your Story to Tell.
        </h1>
        <p className="text-lg md:text-xl text-orange-800 mb-8">
          Our user-friendly interface makes journaling easy and enjoyable. Start writing your thoughts without any hassle.
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-transparent to-transparent pointer-events-none z-10" />
          <div className="bg-white rounded-2xl p-4 max-full mx-auto">
            <div className="border-b border-orange-100 pb-4 mb-4 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <Calendar className='h-5 w-5 text-orange-600' />
                <span className="text-orange-900 font-medium">
                  Today&rsquo;s Entry
                </span>
              </div>

              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-200" />
                <div className="h-3 w-3 rounded-full bg-orange-300" />
                <div className="h-3 w-3 rounded-full bg-orange-400" />
              </div>

            </div>

            <div className="space-y-4 p-4">
              <h3 className="text-xl font-semibold text-orange-900">{advice ? advice : 'My Thoughts Today'}</h3>
              <Skeleton className='h-4 bg-orange-100 rounded w-3/4' />
              <Skeleton className='h-4 bg-orange-100 rounded w-full' />
              <Skeleton className='h-4 bg-orange-100 rounded w-2/3' />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">

          <Link href='/dashboard'>
            <Button className='px-8 py-6 rounded-full flex items-center gap-2' variant='journal'>Start Writing <ChevronRight className="h-5 w-5" /></Button>
          </Link>

          <Link href='#features'>
            <Button className='px-8 py-6 rounded-full border-orange-600 text-orange-600 hover:bg-orange-100' variant='outline'>Learn More <ChevronRight className="h-5 w-5" /></Button>
          </Link>

        </div>
      </div>

      <section id="features" className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={feature.title} className='shadow-lg'>
            <CardContent className='p-6'>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-xl text-orange-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-orange-700">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <TestimonialCarousel />

      <div className="mt-24">
        <h2 className="text-3xl font-semibold text-center text-orange-900 mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-orange-900 font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-orange-700">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-24">
        <Card className="shadow-lg bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300">
          <CardContent className="text-center p-8">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">
              Start Reflecting on Your Journey Today
            </h2>
            <p className="text-lg text-orange-700 mb-8">
              Begin documenting your thoughts, ideas, and progress with our easy-to-use journaling platform.
            </p>
            <Link href="/dashboard">
              <Button variant='journal' className="px-8 py-4 animate-bounce rounded-full text-white bg-orange-600 hover:bg-orange-700 transition">
                Start Writing Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
