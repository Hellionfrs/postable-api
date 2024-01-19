import { z } from "zod";
import { currentDateFormated } from "../utils/currentDate";

const RoleEnum = z.enum(["user", "admin"], {
  errorMap: (issue, ctx) => {
    return { message: "Role solo puede ser 'user' o 'admin'" };
  },
});

export const UserSchemaRegister = z.object({
  username: z
    .string({
      required_error: "User es requerido",
      invalid_type_error: "User debe ser un string",
    })
    .max(100),
  password: z
    .string({
      required_error: "Password es requerido",
      invalid_type_error: "Password debe ser un string",
    })
    .min(8, "Password debe tener almenos 8 caracteres"),
  email: z
    .string({
      required_error: "Email es requerido. Debe ser user@mail.something",
      invalid_type_error: "Email debe ser un string",
    })
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message:
        "El formato del email no es válido. Debe ser user@mail.something",
    }),
  firstName: z.string({
    required_error: "First name es requerido",
    invalid_type_error: "First name debe ser un string",
  }),
  lastName: z.string({
    required_error: "Last name es requerido",
    invalid_type_error: "Last name debe ser un string",
  }),
  role: RoleEnum.optional().default("user"),
});
function isValidISODate(value: string): boolean {
  // Intenta crear una nueva fecha a partir de la cadena proporcionada
  const date = new Date(value);
  
  // Valida si la fecha es válida y si la cadena coincide con el formato ISO8601
  return !isNaN(date.getTime()) && date.toISOString() === value;
}
export const UserSchema = UserSchemaRegister.extend({
  createdAt: z.string().refine((value) => isValidISODate(value), {
    message: 'El formato de la fecha no es válido. Utiliza el formato ISO8601.',
  }).default(currentDateFormated),
  updatedAt: z.string().refine((value) => isValidISODate(value), {
    message: 'El formato de la fecha no es válido. Utiliza el formato ISO8601.',
  }).default(currentDateFormated),
})

export const UserSchemaLogin = UserSchemaRegister.pick({
  username: true,
  password: true,
  email: true,
})

type withId = {
  id: number;
}
export type UserRegister = z.infer<typeof UserSchemaRegister>
export type UserData = z.infer<typeof UserSchema>
export type User = z.infer<typeof UserSchema> & withId
export type UserLogin = z.infer<typeof UserSchemaLogin>

// const newuser: User = {
//   id: 12,
//   username: "fred",
//   password: "asjdhajksf",
//   email: "fred@mail.com",
//   firstName: "fred",
//   lastName: "rod",
//   role: "admin",
//   createdAt: "asdasd",
//   updatedAt: "azsdasd"
// }