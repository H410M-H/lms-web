"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const formSchema = z.object({
  feeName: z.string().min(1, "Fee name is required"),
  feeTuition: z.number().nonnegative("Tuition fee must be non-negative"),
  feePaper: z.number().nonnegative("Paper fund must be non-negative"),
  feeSport: z.number().nonnegative("Sports fund must be non-negative"),
  feeIdcard: z.number().nonnegative("ID card fee must be non-negative"),
  feeComm: z.number().nonnegative("INFO & CALLS fee must be non-negative"),
});

export const FeeCreationDialog: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createFee = api.fee.createFee.useMutation({
    onSuccess: () => {
      form.reset();
    },
  });

  const formSubmitted = (values: z.infer<typeof formSchema>) => {
    createFee.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Set Fee</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Fee Structure</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmitted)} className="flex flex-col gap-4 p-4">
            <FormField
              control={form.control}
              name="feeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fee of Class" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {['feeTuition', 'feePaper', 'feeSport', 'feeIdcard', 'feeComm'].map((feeField) => (
              <FormField
                key={feeField}
                control={form.control}
                name={feeField as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{feeField.replace('fee', '').charAt(0).toUpperCase() + feeField.slice(1)} Fee</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter room price"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            (/^\d+$/.test(value) && parseInt(value) > 0)
                          ) {
                            field.onChange(value === "" ? "" : parseInt(value));
                          }
                        }}
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={createFee.isPending} className="w-full">
              {createFee.isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create Fee"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
