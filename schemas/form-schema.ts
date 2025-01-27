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

export const conceptualLessonsFormSchema = z.object({
  day: z.string().min(1, { message: 'O dia é obrigatório' }),
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
});

export const lessonsFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  deadline: z.string().min(1, { message: 'O prazo é obrigatório' }),
});

export const topicsFormSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
});
