import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			loop: z.enum(['work', 'capture', 'review', 'improve', 'measure']).optional(),
		}),
});

const sessions = defineCollection({
	loader: glob({ base: './src/content/sessions', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		sessionId: z.number(),
		work: z.string(),
		capture: z.string(),
		review: z.string(),
		improve: z.string(),
		measure: z.string().optional(),
	}),
});

export const collections = { blog, sessions };
