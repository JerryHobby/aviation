import {z} from "zod";

export const newArticleSchema = z.object({
    title: z.string()
        .min(3, "Title is required")
        .max(255),
    userId: z.string()
        .min(3, "UserID is required")
        .max(255),
    summary: z.string()
        .min(3, "Summary is required")
        .max(255),
    text: z.string()
        .min(3, "Description is required")
        .max(255),
    categoryId: z.string()
        .min(1, "Category is required")
        .max(255)
        .default('7'),
});

