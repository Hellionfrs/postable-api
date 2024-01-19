import { number, z } from "zod";
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
    .string()
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message:
        "El formato del email no es válido. Debe ser user@mail.something",
    })
    .nullable(),
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

export const UserSchema = UserSchemaRegister.extend({
  createdAt: z.string().refine((value) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value), {
    message: 'El formato de la fecha no es válido. Utiliza el formato ISO8601.',
  }).default(currentDateFormated),
  updatedAt: z.string().refine((value) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value), {
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