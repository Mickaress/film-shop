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

// sign up schema
export const signUpSchema = z.object({
  email: z.string().min(1, 'Пустое поле').email('Некорректная почта'),
  password: z.string().min(1, 'Пустое поле').min(8, 'Минимум 8 символов'),
  fullName: z.string().refine(
    (value) => {
      const fullNamePattern = /^[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+(\s[а-яА-ЯёЁ]+)?$/;

      return fullNamePattern.test(value);
    },
    {
      message: 'Некорректное ФИО',
    },
  ),
  phone: z.string().refine(
    (value) => {
      const phonePattern = /^\+7\d{10}$/;

      return phonePattern.test(value);
    },
    {
      message: 'Некорректный формат: +7xxxxxxxxxx',
    },
  ),
  address: z.string().nonempty('Пустое поле'),
});

export type SignUpType = z.infer<typeof signUpSchema>;

export const profileInfoSchema = z.object({
  fullName: z.string().refine(
    (value) => {
      const fullNamePattern = /^[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+(\s[а-яА-ЯёЁ]+)?$/;

      return fullNamePattern.test(value);
    },
    {
      message: 'Некорректное ФИО',
    },
  ),
  phone: z.string().refine(
    (value) => {
      const phonePattern = /^\+7\d{10}$/;

      return phonePattern.test(value);
    },
    {
      message: 'Некорректный формат: +7xxxxxxxxxx',
    },
  ),
  address: z.string().nonempty('Пустое поле'),
});

export type ProfileInfoType = z.infer<typeof profileInfoSchema>;
