import { getSingleCollection } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import React from "react";
import Deletecollection from "../_componants/Deletecollection";
import Journalfilter from "../_componants/journalfilter";

async function Collectionpage({ params }) {
  const { collectionid } = params;
  const entries = await getJournalEntries({ collectionid });
  const collection = await getSingleCollection(collectionid);

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold gradient-title">
            {collectionid === "unorganized"
              ? "Unorganized Entries"
              : collection?.name || "Collection"}
          </h1>
          {collection && (
            <Deletecollection
              collection={collection}
              entriesCount={entries.data.entries.length}
            />
          )}
        </div>

        {collection?.description && (
          <h2 className="font-extralight pl-1">{collection?.description}</h2>
        )}
      </div>
      <Journalfilter entries={entries.data.entries} />
    </div>
  );
}

export default Collectionpage;
