import { z } from "zod"
import { currentDateFormated, isValidISODate } from "../utils/currentDate";
import { withId } from "../models/user.model";

// PostContent req.body de Post y Patch
export const PostSchemaContent = z.object({
  content: z.string({
    required_error: "Content es requerido",
    invalid_type_error: "Content debe ser un string",
  })
})

// Para autocompletar el createdat y updateat
export const PostSchemaWithDates = PostSchemaContent.extend({
  createdat: z.string().refine((value) => isValidISODate(value), {
    message: 'El formato de la fecha no es válido. Utiliza el formato ISO8601.',
  }).default(currentDateFormated),
  updatedat: z.string().refine((value) => isValidISODate(value), {
    message: 'El formato de la fecha no es válido. Utiliza el formato ISO8601.',
  }).default(currentDateFormated),
})

// PostContent req.body de Post y Patch
export type PostContent = z.infer<typeof PostSchemaContent>
// typar dentro del service la data
export type PostWithDates = z.infer<typeof PostSchemaWithDates>
export type PostWithDatesAndUserId = PostWithDates & {userid: number}
// typar con Post la respuesta de la DB
export type Post = z.infer<typeof PostSchemaWithDates> & withId