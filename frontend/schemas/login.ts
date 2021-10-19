import * as z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export default loginSchema;
