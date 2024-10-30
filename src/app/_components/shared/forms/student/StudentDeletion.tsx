"use client";

import { api } from "~/trpc/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"

export const StudentDeletionDialog = ({ studentIds }: { studentIds: string[] }) => {
    const deleteStudents = api.student.deleteStudentsByIds.useMutation()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={studentIds.length === 0}>
                    Delete selected
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the selected
                        student(s) and remove their data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button 
                            variant="destructive"
                            onClick={() => deleteStudents.mutate({ studentIds: studentIds })}
                            disabled={deleteStudents.isPending}
                        >
                            {deleteStudents.isPending ? "Deleting..." : "Confirm"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};