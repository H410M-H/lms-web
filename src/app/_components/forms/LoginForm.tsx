/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  username: z.string({ required_error: "Field is required" }),
  password: z.string({ required_error: "Field is required" }),
});

export const LoginForm = () => {

  const router = useRouter()
  const [alert, setAlert] = useState<boolean>(false);
  const [submiting, setSubmiting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const formSubmitted = async (values : z.infer<typeof formSchema>)=>{

    try {
      setAlert(() => false);
      setSubmiting(() => true);
      const signInData = await signIn("credentials", {
        email: values.username,
        password: values.password,
        redirect: false,
      });
      if (signInData?.error) setAlert(() => true);
      else router.push("/revenue");
    } finally {
      setSubmiting(() => false);
    } 
  }
  return (
    <Form {...form} >
      <form className="grid gap-2" onSubmit={form.handleSubmit(formSubmitted)}>
      {alert && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the username"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the password"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submiting}>
        {submiting ? "Login..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};
