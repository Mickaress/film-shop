import * as z from 'zod';

// sign in schema
export const signInSchema = z.object({
  email: z.string().nonempty('Пустое поле').email('Неправильный формат почты'),
  password: z
    .string()
    .nonempty('Пустое поле')
    .min(8, 'Пароль должен быть минимум 8 символов'),
});

export type SignInType = z.infer<typeof signInSchema>;
