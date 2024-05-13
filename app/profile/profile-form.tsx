"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
// import pdf from "pdf-parse";
// import pdfjs from "pdfjs-dist";
// const pdf = require("pdf-parse");
// import pdfToText from 'react-pdftotext'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const profileFormSchema = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  file: z
    .object({
      // name: z.string(),
      // type: z.string(),
      // size: z.number(),
      // Add more properties as needed
    })
    .optional(),
  bio: z.string().max(160).min(4),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     }),
  //   )
  //   .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  // urls: [
  //   { value: "https://shadcn.com" },
  //   { value: "http://twitter.com/shadcn" },
  // ],
};
interface FileData {
  name: string;
  type: string;
  size: number;
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const formData2 = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      // Append resume file
      console.log("dta;", data.file);

      console.log("hello", Array.isArray(data.file));

      // if (data.file) {
      console.log("hello from file");

      // const fileData = data.file as {
      //   name: string;
      //   type: string;
      //   size: number;
      // };

      // Create a Blob object using the file data
      // const file = new Blob(
      //   [
      //     /* Array of file content */
      //   ],
      //   { type: fileData.type },
      // );

      // Append the Blob object to the FormData
      // @ts-ignore

      formData.append("resume", file);
      // }
      console.log("formData:", formData);
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // const response = await axios.post("/api/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      console.log("response:", response);

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully!",
        // status: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        // status: "error",
      });
    }
    setIsLoading(false);
  }
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  async function onSubmit2(data: any) {
    console.log("hello");

    setIsLoading(true);
    try {
      const formData2 = new FormData();

      console.log("hello");

      console.log("hello", data.file);

      // @ts-ignore
      formData2.append("resume", file);
      // }

      console.log("formData2:", formData2);
      const response = await axios.post(
        "http://localhost:3009/api/text/upload",
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setText(response.data.text);
      console.log("response:", response);

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully!",
        // status: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        // status: "error",
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/prefill");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LastName</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  type="file"
                  // onChange={(event) => {
                  //   console.log(
                  //     "Selected file:",
                  //     event.target.files ? event.target.files[0] : null,
                  //   );
                  //   field.onChange(
                  //     event.target.files ? event.target.files[0] : null,
                  //   );
                  // }}
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <input type="file" accept=".pdf" onChange={handleFileChange} /> */}

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {/* {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Socials
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))} */}
          {/* <Button
            type="button"
            // variant="outline"
            // size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button> */}
        </div>
        <Button type="submit" className="bg-[#adfa1d] text-black">
          Save
        </Button>
      </form>
    </Form>
  );
}
