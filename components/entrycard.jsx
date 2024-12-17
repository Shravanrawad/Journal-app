'use client';

import Link from 'next/link';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { format } from 'date-fns';
import { Badge } from './ui/badge';

function Entrycard({ entry }) {
  return (
    <Link href={`/journal/${entry.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
             
              <div className="flex items-center gap-2">
                <span className="text-2xl">{entry.moodData.emoji}</span>
                <h3 className="font-semibold text-lg truncate">{entry.title.length > 30 ? `${entry.title.slice(0, 30)}...` : entry.title}</h3>
              </div>

            
              <div
                className="text-gray-600 text-sm line-clamp-2"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </div>

            
            <time className="text-sm text-gray-500 whitespace-nowrap">
              {format(new Date(entry.createdAt), 'MMM d, yyyy')}
            </time>
          </div>

         
          {entry.collection && (
            <div className="mt-4">
              <Badge variant="outline" className="bg-orange-100 text-orange-800">
                {entry.collection.name}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default Entrycard;
