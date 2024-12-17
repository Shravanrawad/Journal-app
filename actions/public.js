'use server'

import { unstable_cache } from "next/cache";

export async function getPixabayImage(query) {
    try {

        const response = await fetch(`https://pixabay.com/api?q=${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`);
        const data = await response.json();
        return data.hits[0]?.largeImageURL || null;

    } catch (error) {
        console.error('Pixabay Api Error', error);
        return null;
    }
}

export const getDailyPrompt = unstable_cache(
    async () => {
        try {
            const response = await fetch('https://api.adviceslip.com/advice', {
                cache: "no-store"
            })
            const data = await response.json();
            return data.slip.advice;
        } catch (error) {
            return {
                success: false,
                data: "What's on your mind today",
            }
        }
    }, ["daily-propmt"],
    {
        revalidate: 86400,
        tags: ["daily-propmt"]
    }
)