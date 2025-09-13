"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generatePersonalizedBirthdayMessage } from "@/ai/flows/generate-personalized-birthday-message";
import { useState } from "react";
import { Gift, Heart, Loader2 } from "lucide-react";

const formSchema = z.object({
  keywords: z.string().min(3, "Add a few keywords to make the message special!"),
});

type FormValues = z.infer<typeof formSchema>;

export function MessageGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setMessage("");
    try {
      const result = await generatePersonalizedBirthdayMessage(values);
      setMessage(result.message);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "Could not generate a birthday message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-2">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Gift className="text-primary" />A Message from the Heart
        </CardTitle>
        <CardDescription className="font-body">
          Add some fun keywords or inside jokes, and let AI craft a unique birthday message!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headline">Keywords (e.g., "our trip to the beach", "that funny hat")</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter keywords here..."
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : "Generate Message"}
            </Button>
            {message && (
              <Card className="w-full bg-primary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Heart className="text-primary" />
                    For You, Samina:
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-foreground whitespace-pre-wrap">{message}</p>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
