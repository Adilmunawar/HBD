// AnimateHappyBirthdayBannerWithAI: animates a 'Happy Birthday Miss Samina' banner using AI to determine a visually appealing animation style.
// The flow takes no input and returns a string describing the animation style.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimateHappyBirthdayBannerOutputSchema = z.object({
  animationStyle: z.string().describe('A description of the animation style for the Happy Birthday banner, that will catch the user\'s eye and enhance the festive atmosphere.'),
});

export type AnimateHappyBirthdayBannerOutput = z.infer<typeof AnimateHappyBirthdayBannerOutputSchema>;

export async function animateHappyBirthdayBanner(): Promise<AnimateHappyBirthdayBannerOutput> {
  return animateHappyBirthdayBannerFlow({});
}

const prompt = ai.definePrompt({
  name: 'animateHappyBirthdayBannerPrompt',
  output: {schema: AnimateHappyBirthdayBannerOutputSchema},
  prompt: `You are a creative animation director. Please suggest a visually appealing animation style for a "Happy Birthday Miss Samina" banner to enhance the festive atmosphere of a website. Consider elements like color, movement, and special effects to make it eye-catching and joyful. Describe the animation style in detail.`,  
});

const animateHappyBirthdayBannerFlow = ai.defineFlow(
  {
    name: 'animateHappyBirthdayBannerFlow',
    outputSchema: AnimateHappyBirthdayBannerOutputSchema,
    inputSchema: z.object({}),
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
