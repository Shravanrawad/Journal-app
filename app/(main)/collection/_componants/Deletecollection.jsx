'use client';

import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { deleteCollection } from "@/actions/collection";
import { toast } from "sonner";

function Deletecollection({ collection = {}, entriesCount = 0 }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    loading: isDeleting,
    fn: deleteCollectionFn,
    data: deletedCollection,
  } = useFetch(deleteCollection);

  useEffect(() => {
    if (deletedCollection && !isDeleting) {
      setOpen(false);
      toast.error(
        `Collection "${collection.name}" and all its entries deleted`
      );
      router.push("/dashboard");
    }
  }, [deletedCollection, isDeleting, router, collection.name]);

  const handleDelete = () => {
    deleteCollectionFn(collection.id);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{collection.name}&quot;?
          </AlertDialogTitle>
          <div className="space-y-2 text-muted-foreground text-sm">
            <p>This will permanently delete:</p>
            <ul className="list-disc list-inside">
              <li>The collection &quot;{collection.name}&quot;</li>
              <li>
                {entriesCount} journal{" "}
                {entriesCount === 1 ? "entry" : "entries"}
              </li>
            </ul>
            <p className="font-semibold text-red-600">
              This action cannot be undone.
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete Collection"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Deletecollection;
