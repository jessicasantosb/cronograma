'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lessons } from '@prisma/client';
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
import { lessonsFormSchema } from '@/schemas/form-schema';

interface LessonsFormProps {
  initialData: Lessons | null;
}

type LessonsFormValues = z.infer<typeof lessonsFormSchema>;

export function LessonsForm({ initialData }: LessonsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { disciplineId, lessonId } = useParams();
  const { refresh, push } = useRouter();

  const title = initialData ? 'Editar Atividade' : 'Criar Atividade';
  const description = initialData
    ? 'Editar uma Atividade'
    : 'Adicionar nova Atividade';
  const toastMessage = initialData
    ? 'Atividade atualizada!'
    : 'Atividade criada!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<LessonsFormValues>({
    resolver: zodResolver(lessonsFormSchema),
    defaultValues: initialData || {
      name: '',
      deadline: '',
    },
  });

  const onSubmit = async (values: LessonsFormValues) => {
    console.log();
    
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(`/api/${disciplineId}/lessons/${lessonId}`, {
          values,
        });
      } else {
        await axios.post(`/api/${disciplineId}/lessons`, {
          values,
        });
      }
      push(`/${disciplineId}/lessons`);
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
      await axios.delete(`/api/${disciplineId}/lessons/${lessonId}`);
      refresh();
      push(`/${disciplineId}/lessons`);
      toast.success('Atividade deletada!');
    } catch (error) {
      console.log(error);

      toast.error('Algo deu errado.');
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
              name='deadline'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prazo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o prazo'
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
