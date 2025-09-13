// src/ai/flows/generate-personalized-birthday-message.ts
'use server';

/**
 * @fileOverview Generates a personalized birthday message for Miss Samina.
 *
 * - generatePersonalizedBirthdayMessage - A function that generates a personalized birthday message.
 * - GeneratePersonalizedBirthdayMessageInput - The input type for the generatePersonalizedBirthdayMessage function.
 * - GeneratePersonalizedBirthdayMessageOutput - The return type for the generatePersonalizedBirthdayMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedBirthdayMessageInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords or inside jokes to include in the birthday message for Miss Samina.'
    ),
});
export type GeneratePersonalizedBirthdayMessageInput = z.infer<
  typeof GeneratePersonalizedBirthdayMessageInputSchema
>;

const GeneratePersonalizedBirthdayMessageOutputSchema = z.object({
  message: z
    .string()
    .describe('The personalized birthday message for Miss Samina.'),
});
export type GeneratePersonalizedBirthdayMessageOutput = z.infer<
  typeof GeneratePersonalizedBirthdayMessageOutputSchema
>;

export async function generatePersonalizedBirthdayMessage(
  input: GeneratePersonalizedBirthdayMessageInput
): Promise<GeneratePersonalizedBirthdayMessageOutput> {
  return generatePersonalizedBirthdayMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedBirthdayMessagePrompt',
  input: {schema: GeneratePersonalizedBirthdayMessageInputSchema},
  output: {schema: GeneratePersonalizedBirthdayMessageOutputSchema},
  prompt: `You are a birthday message generator. You will generate a funny, loving, and caring birthday message for Miss Samina. Incorporate the following keywords or inside jokes into the message: {{{keywords}}}.`,
});

const generatePersonalizedBirthdayMessageFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedBirthdayMessageFlow',
    inputSchema: GeneratePersonalizedBirthdayMessageInputSchema,
    outputSchema: GeneratePersonalizedBirthdayMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
