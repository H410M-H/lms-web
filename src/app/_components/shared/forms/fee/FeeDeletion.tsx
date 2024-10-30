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


export const FeeDeletionDialog = ({ feeIds }: { feeIds: string[] }) => {
    const deleteFees = api.fee.deleteFeesByIds.useMutation()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={feeIds.length == 0}>Delete selected</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction  asChild>
                        <Button variant="destructive"
                            onClick={() => deleteFees.mutate({ feeIds: feeIds })}
                            disabled={deleteFees.isPending}>Confirm</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
