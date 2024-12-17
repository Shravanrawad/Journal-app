"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from "@/app/lib/schema";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMoodById, MOODS } from "@/app/lib/moods";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import {
  createJournalEntry,
  getDraft,
  getJournalEntry,
  saveDraft,
  updateJorunal,
} from "@/actions/journal";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createCollection, getCollection } from "@/actions/collection";
import CollectionForm from "@/components/collection-dialog";
import { Loader2 } from "lucide-react";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function Writepage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [isCollectionDialogopen, setisCollectionDialogopen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    loading: actionLoading,
    fn: actionFunction,
    data: actionData,
  } = useFetch(isEditMode ? updateJorunal : createJournalEntry);

  const {
    loading: collectionLoading,
    fn: fetchcollection,
    data: collectionData,
  } = useFetch(getCollection);

  const {
    loading: createcollectionLoading,
    fn: createcollection,
    data: createdcollection,
  } = useFetch(createCollection);

  const {
    loading: entryLoading,
    data: existingentry,
    fn: fetchEntry,
  } = useFetch(getJournalEntry);

  const { loading: draftloading, data: draftData, fn: fetchDraft } =
    useFetch(getDraft);

  const { loading: savingDraft, fn: saveDraftfn, data:savedDraft } = useFetch(saveDraft);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors , isDirty},
    getValues,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  useEffect(() => {
    fetchcollection();
    if (editId) {
      setIsEditMode(true)
      fetchEntry(editId);
    } else {
      setIsEditMode(false);
      fetchDraft();
    }
  }, [editId]);

  useEffect(() => {
    if (isEditMode && existingentry) {
      reset({
        title: existingentry.title || "",
        content: existingentry.content || "",
        mood: existingentry.mood || "",
        collectionId: existingentry.collectionId || "",
      });
    } else if (draftData?.success && draftData?.data) {
      reset({
        title: draftData.data.title || "",
        content: draftData.data.content || "",
        mood: draftData.data.mood || "",
        collectionId: "",
      });
    } else {
      reset({
        title: "",
        content: "",
        mood: "",
        collectionId: "",
      });
    }
  }, [draftData, isEditMode, existingentry]);

  useEffect(() => {
    if (actionData) {
      if (!isEditMode) {
        saveDraftfn({ title: "", content: "", mood: "" });
      }
      const collectionId = actionData.collectionId || "unorganized";
      router.push(`/collection/${collectionId}`);
      toast.success(`Entry ${isEditMode ? "Updated" : "created"} successfully`);
    }
  }, [actionData, router]);

  const onSubmit = handleSubmit(async (data) => {
    if (isLoading) return;
    const mood = getMoodById(data.mood);
    actionFunction({
      ...data,
      moodScore: mood.score,
      moodQuery: mood.pixabayQuery,
      ...(isEditMode && { id: editId }),
    });
  });

  useEffect(() => {
    if (createdcollection) {
      setisCollectionDialogopen(false);
      fetchcollection();
      setValue("collectionId", createdcollection.id);
      toast.success(`Collection ${createdcollection.name} created!`);
    }
  }, [createdcollection]);

  const handelCreateCollection = async (data) => {
    createcollection(data);
  };

 const formData = watch();

  const handelSavedraft = async () => {
        if(!isDirty){
           toast.error("No changes to save");
           return;
        }
       await saveDraftfn(formData);
  }

  useEffect(() => {
     if(saveDraft?.success && !savingDraft){
      toast.success('Draft saved');
     }
  }, [savedDraft, savingDraft])

  const isLoading =
    actionLoading ||
    collectionLoading ||
    entryLoading ||
    draftloading ||
    savingDraft;

  return (
    <div className="py-8">
      <form onSubmit={onSubmit} className="space-y-2 mx-auto">
        <h1 className="text-3xl md:text-6xl gradient-title">
          {isEditMode ? "Edit Entry" : "What's in your mind"}
        </h1>

        {isLoading && <BarLoader color="orange" width={"100%"} />}

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            disabled={isLoading}
            className={`py-5 md:text-md ${
              errors.title ? "border-red-500" : ""
            }`}
            {...register("title")}
            placeholder="Give a title to your entry..."
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">How are you feeling?</label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={errors.mood ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a mood" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MOODS).map((mood) => (
                    <SelectItem key={mood.id} value={mood.id}>
                      <span className="flex items-center gap-2">
                        {mood.emoji} {mood.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {getMoodById(getValues("mood"))?.prompt ?? "Write your thoughts..."}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill value={field.value} onChange={field.onChange} theme="snow" />
            )}
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>


      <div className="space-y-2">
          <label className="text-sm font-medium">
           Select collection
          </label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value === "new") {
                    setisCollectionDialogopen(true);
                  } else {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a collection" />
                </SelectTrigger>
                <SelectContent>
                  {collectionData?.map((collection) => {
                    return (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.name}
                      </SelectItem>
                    );
                  })}

                  <SelectItem value="new">
                    <span className="text-orange-600">
                      + Create New Collection
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.collectionId && (
            <p className="text-red-500 text-sm">
              {errors.collectionId.message}
            </p>
          )}
        </div>

        <div className="space-x-4 flex">

          {!isEditMode && (
            <Button
            onClick={handelSavedraft}
            type="button"
            variant="outline"
            disabled={savingDraft || !isDirty}
            >
            {savingDraft && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            Save as Draft
            </Button>
          )}

          <Button type="submit" variant="journal" disabled={isLoading || !isDirty}>
            {isEditMode ? "Update" : "Publish"}
          </Button>
          {isEditMode && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/journal/${existingentry.id}`);
              }}
              variant="destructive"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <CollectionForm
        loading={createcollectionLoading}
        onSuccess={handelCreateCollection}
        open={isCollectionDialogopen}
        setOpen={setisCollectionDialogopen}
      />
       
    </div>
  );
}

export default Writepage;
