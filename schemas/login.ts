import * as z from "zod";

const loginSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export default loginSchema;
