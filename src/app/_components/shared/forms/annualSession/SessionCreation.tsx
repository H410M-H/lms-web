"use client";

import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
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
import dayjs from "dayjs";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  sessionName: z.string({ required_error: "Field is required" }),
  sessionFrom: z.date({
    required_error: "Session From date is required",
  }),
  sessionTo: z.date({
    required_error: "Session To date is required",
  }),
});

export const SessionCreationDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createSession = api.session.createSession.useMutation({
    onSuccess: () => {
      form.reset();
    },
  });

  const formSubmitted = (values: z.infer<typeof formSchema>) => {
    createSession.mutate({
      sessionName: values.sessionName ?? "none",
      sessionFrom: dayjs(values.sessionFrom).format('YYYY-MM-DD'),
      sessionTo: dayjs(values.sessionTo).format('YYYY-MM-DD')
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add Session
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Session</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitted)}
            className="flex flex-col gap-4 p-4"
          >
            <FormField
              control={form.control}
              name="sessionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name of Session"
                      {...field}
                      value={field.value ?? "PPP"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="sessionFrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Session Starting Date:*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
                            <FormField
                control={form.control}
                name="sessionTo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Session Ending Date:*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button
              type="submit"
              disabled={createSession.isPending}
              className="w-full"
            >
              {createSession.isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create Session"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
