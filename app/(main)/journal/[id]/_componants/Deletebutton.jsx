'use client';

import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { deleteJorunal } from "@/actions/journal";

function Deletejorunal({ entryId }) {

  const [deleteDialogOpen, setdeleteDialogOpen] = useState(false);
  const router = useRouter();

  const {
    loading: isDeleting,
    fn: deletejournalFn,
    data: deletedEntry,
  } = useFetch(deleteJorunal);

  useEffect(() => {
    if (deletedEntry && !isDeleting) {
      setdeleteDialogOpen(false);
      toast.error("journal entry deleted successfully")
      router.push(`
        /collection/${deletedEntry.collectioId ? deletedEntry.collectioId : 'unorganized'}
      `);
    }
  }, [deletedEntry, isDeleting]);

  const handleDelete = () => {
    deletejournalFn(entryId);
  };

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setdeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
           Are you Absolutely sure ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete Entry"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Deletejorunal;
