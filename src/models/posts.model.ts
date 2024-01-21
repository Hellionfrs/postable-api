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

export const PostSchemaContentEdit = PostSchemaContent.pick({
  content: true,
}).partial().refine((data) => {
  // Verificar que al menos un campo esté presente en el objeto
  return Object.keys(data).length > 0;
}, {
  message: 'Intenta con content',
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
export type Post = z.infer<typeof PostSchemaWithDates> & withId & {userid: number, likescount: number}
const parsePositiveInt = (value: number | string): number => {
  const parsedValue = typeof value === "string" ? parseInt(value, 10) : value;
  return parsedValue > 0 ? parsedValue : 1;
};
export const QuerySchema = z.object({
  page: z.string().transform(parsePositiveInt).refine((value) => value >= 0, {
    message: 'La página debe ser un número entero positivo o cero.',
  }).transform(parsePositiveInt).default("1"),
  limit: z.string().transform(parsePositiveInt).refine((value) => value >= 5, {
    message: 'El límite debe ser un número entre 10 y 5.',
  }).transform(parsePositiveInt).default("10"),
  username: z.string().optional(),
  orderBy: z.enum(["createdat", "likescount"]).optional().default("createdat"),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
}).transform((data) => {
  // Crear un nuevo objeto solo con los campos deseados
  const filteredData = {
    page: data.page,
    limit: data.limit,
    username: data.username,
    orderBy: data.orderBy,
    order: data.order,
  };

  return filteredData;
});

export type QueryParams = z.infer<typeof QuerySchema>
export type PostFilter = {
  username?: string;
};

export type PostFilterId = {
  userid?: number;
};



