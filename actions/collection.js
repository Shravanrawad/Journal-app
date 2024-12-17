'use server'

import aj from "@/app/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function createCollection(data) {
  try {

    const { userId } = await auth();
    const req = await request();

    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    })

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          }
        });

        throw new Error("Too many requests. Please try again later.");

      }

      throw new Error("Request Blocked.");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    const collection = await db.collection.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id,
      }
    });

    revalidatePath("/dashboard");
    return collection;

  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCollection() {

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const collections = await db.collection.findMany({
    where: {
      userId: user.id
    },

    orderBy: { createdAt: "desc" }
  });

  return collections;

}

export async function getSingleCollection(collectionId) {

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const collections = await db.collection.findUnique({
    where: {
      userId: user.id,
      id: collectionId,
    },
  });

  return collections;

}

export async function deleteCollection(collectionId) {
       try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
      
        const user = await db.user.findUnique({
          where: {
            clerkUserId: userId,
          }
        });
      
        if (!user) {
          throw new Error("User not found");
        }
      
        const collection = await db.collection.findFirst({
          where: {
            userId: user.id,
            id: collectionId
          },
      
          orderBy: { createdAt: "desc" }
        });

        if(!collection) throw new Error("Collection not found");

        await db.collection.delete({
              where: {
                id: collectionId
              }
        })
      
        return true;
      
       } catch (error) {
         throw new Error(error.message);
       }
}
