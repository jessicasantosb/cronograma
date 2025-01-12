'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AlertModal } from '@/modals/alert-modal';
import { calendarFormSchema } from '@/schemas/form-schema';

interface CalendarFormProps {
  initialData: Calendar | null;
}

type CalendarFormValues = z.infer<typeof calendarFormSchema>;

export function CalendarForm({ initialData }: CalendarFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { disciplineId, calendarId } = useParams();
  const { refresh, push } = useRouter();

  const title = initialData ? 'Editar Calendário' : 'Criar Calendário';
  const description = initialData
    ? 'Editar um Calendário'
    : 'Adicionar novo Calendário';
  const toastMessage = initialData
    ? 'Calendário atualizado!'
    : 'Calendário criado!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<CalendarFormValues>({
    resolver: zodResolver(calendarFormSchema),
    defaultValues: initialData || {
      name: '',
      date: '',
    },
  });

  const onSubmit = async (values: CalendarFormValues) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(`/api/${disciplineId}/calendar/${calendarId}`, {
          values,
        });
      } else {
        await axios.post(`/api/${disciplineId}/calendar`, {
          values,
        });
      }
      push(`/${disciplineId}/calendar`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado! Tente novamente!');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${disciplineId}/calendar/${calendarId}`);
      refresh();
      push(`/${disciplineId}/calendar`);
      toast.success('Calendário deletado!');
    } catch (error) {
      console.log(error);

      toast.error('Primeiro remova todas as datas desse calendário.');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={'destructive'}
            size={'icon'}
            disabled={isLoading}
            onClick={() => setIsOpen(true)}>
            <Trash className='size-4' />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'>
          <div className='grid grid-cols-2 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o nome'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o intervalo dessa semana'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={isLoading} className='ml-auto'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
