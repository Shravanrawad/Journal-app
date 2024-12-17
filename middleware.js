import arcjet , {shield, detectBot} from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
      '/dashboard(.*)',
      '/collection(.*)',
      '/journal(.*)'    
])

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
     shield({
      mode: "LIVE"
     }),

     detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
     })
  ]
})

const clerk =  clerkMiddleware(async(auth, request) => {
       const {userId, redirectToSignIn} = await auth(); 
       
       if(!userId && isProtectedRoute(request)){
        return redirectToSignIn();
       }

       return NextResponse.next();
});

export default clerkMiddleware(aj,clerk);

export const config = {
  matcher: [
    
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    '/(api|trpc)(.*)',
  ],
};