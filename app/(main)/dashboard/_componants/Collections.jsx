"use client";

import React, { useEffect, useState } from "react";
import Collectionpreview from "./Collectionpreview";
import CollectionForm from "@/components/collection-dialog";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";
import { createCollection } from "@/actions/collection";


function Collections({ collections = [], entriesByCollection }) {
  const [isCollectionDialogopen, setIsCollectionDialogopen] = useState(false);

  const {
    loading: createcollectionLoading,
    fn: createcollection,
    data: createdcollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if(createdcollection){
     setIsCollectionDialogopen(false);
     toast.success(`Collection ${createdcollection.name} created!`)
    }
 }, [createdcollection])


  const handelCreateCollection = async (data) => {
        createcollection(data);
  }

  if(collections.length === 0) return <></>

  return (
    <section id="collection" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
   
        <Collectionpreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogopen(true)}
        />

        {entriesByCollection?.unorganized?.length > 0 && (
          <Collectionpreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
          />
        )}

        {collections?.map((colletion) => (
          <Collectionpreview
            key={colletion.id}
            id={colletion.id}
            name={colletion.name}
            entries={entriesByCollection[colletion.id] || []}
          />
        ))}
        
        <CollectionForm
          loading={createcollectionLoading}
          onSuccess={handelCreateCollection}
          open={isCollectionDialogopen}
          setOpen={setIsCollectionDialogopen}
        />

      </div>
    </section>
  );
}

export default Collections;
