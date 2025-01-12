import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
});

export const calendarFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  date: z.string().min(1, { message: 'A data é obrigatória' }),
});

export const liveFormSchema = z.object({
  day: z.string().min(1, { message: 'O dia é obrigatório' }),
  hour: z.string().min(1, { message: 'O horário é obrigatório' }),
});
