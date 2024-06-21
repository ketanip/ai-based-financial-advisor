import z from "zod";

const SignIn = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const SignUp = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

export default {
    SignIn,
    SignUp
}