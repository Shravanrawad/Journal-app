import { getCollection } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import React from "react";
import Collections from "./_componants/Collections";
import MoodAnalytics from "./_componants/MoodAnalytics";

async function Dashboard() {
  
  const collections = await getCollection();
  const entriesData = await getJournalEntries();

  const entriesByCollection = entriesData?.data.entries.reduce((acc, entry) => {
    const collectionId = entry.collectionId || "unorganized";
    if (!acc[collectionId]) {
      acc[collectionId] = [];
    }
    acc[collectionId].push(entry);
    return acc;
  }, {});

  return (
    <div className="px-4 py-8 space-y-8">
      <section className="space-y-4">
              <MoodAnalytics/>
      </section>

      <Collections
        collections={collections}
        entriesByCollection={entriesByCollection}
      />

    </div>
  );
}

export default Dashboard;
