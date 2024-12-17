'use client'

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from './ui/card'

const testimonials = [
    {
        "name": "Priya Mehta",
        "role": "Teacher",
        "testimonial": "This app has completely transformed the way I reflect on my day! It's easy to use and helps me stay organized. I love the daily prompts—it makes journaling feel effortless and rewarding!"
    },
    {
        "name": "Rajesh Kumar",
        "role": "Software Developer",
        "testimonial": "I never thought I'd be someone who enjoys journaling, but this app has changed that. The clean interface and customizable themes make writing my thoughts so much more enjoyable. Highly recommend it!"
    },
    {
        "name": "Neha Sharma",
        "role": "Psychologist",
        "testimonial": "This journal app has been a great tool for my mental wellness. I love the privacy features, and the ability to look back at my progress is empowering. It's truly helped me stay grounded."
    },
    {
        "name": "Rohit Singh",
        "role": "Business Owner",
        "testimonial": "A fantastic app for anyone who wants to document their thoughts or keep track of their goals. It’s a great way to build a daily habit of reflection. Plus, the design is beautiful!"
    },
    {
        "name": "Ayesha Ali",
        "role": "Student",
        "testimonial": "I've been using this app for a few months now, and it’s been so therapeutic. I enjoy how easy it is to write down my feelings and look back on my experiences. It’s a wonderful way to stay mindful."
    },
    {
        "name": "Anil Verma",
        "role": "Entrepreneur",
        "testimonial": "The journaling experience is smooth, and the app's features really cater to different styles of journaling. Whether you're recording memories or jotting down ideas, this app covers it all."
    },
    {
        "name": "Kavita Desai",
        "role": "Artist",
        "testimonial": "I love that this app allows me to track my emotions and moods over time. It has become part of my daily routine, and I truly believe it helps me understand myself better."
    },
    {
        "name": "Sameer Patel",
        "role": "Marketing Manager",
        "testimonial": "This journal app is a game-changer! I use it not only for reflection but also for planning my days. The daily reminders help keep me consistent, and I’ve never been more productive."
    }
]

function TestimonialCarousel() {
  return (
    <div className='mt-24'>
        <h2 className='text-3xl font-bold text-center text-orange-900 mb-12'>What Our Writers Say</h2>
        <Carousel plugins={[
            Autoplay({
                delay: 2000
            }),
        ]}>
            <CarouselContent>
                {testimonials.map((testi, index) => {
                    return (
                        <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={index}>
                            <Card className='bg-white/80 backdrop-blur-sm'>

                                <CardContent className='p-6'>
                                    <blockquote className='space-y-4'>
                                        <p className='text-orange-700 italic'>
                                            &quot;{testi.testimonial}&quot;
                                        </p>
                                    </blockquote>
                                    <footer>
                                        <cite className="text-sm text-gray-600">{testi.name}, {testi.role}</cite>
                                    </footer>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex'/>
            <CarouselNext className='hidden md:flex'/>
        </Carousel>    
    </div>
  )
}
 
export default TestimonialCarousel
