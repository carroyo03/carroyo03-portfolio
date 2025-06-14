import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'blog/*.md',
            schema: z.object({
                    date: z.string(),
                    cover: z.string().optional(),
                    title: z.string(),
                    description: z.string().optional(),
                    tags: z.array(z.string()).optional()
                }
            )
        })
    }
})
