'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ConceptualLessons } from '@prisma/client';
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
import { conceptualLessonsFormSchema } from '@/schemas/form-schema';

interface ConceptualLessonsFormProps {
  initialData: ConceptualLessons | null;
}

type ConceptualLessonsFormValues = z.infer<typeof conceptualLessonsFormSchema>;

export function ConceptualLessonsForm({
  initialData,
}: ConceptualLessonsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { disciplineId, conceptualLessonsId } = useParams();
  const { refresh, push } = useRouter();

  const title = initialData ? 'Editar Aula' : 'Criar Aula';
  const description = initialData ? 'Editar um Aula' : 'Adicionar nova aula';
  const toastMessage = initialData ? 'Aula atualizado!' : 'Aula criado!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<ConceptualLessonsFormValues>({
    resolver: zodResolver(conceptualLessonsFormSchema),
    defaultValues: initialData || {
      day: '',
      name: '',
    },
  });

  const onSubmit = async (values: ConceptualLessonsFormValues) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${disciplineId}/conceptual-lessons/${conceptualLessonsId}`,
          {
            values,
          },
        );
      } else {
        await axios.post(`/api/${disciplineId}/conceptual-lessons`, {
          values,
        });
      }
      push(`/${disciplineId}/conceptual-lessons`);
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
      await axios.delete(
        `/api/${disciplineId}/conceptual-lessons/${conceptualLessonsId}`,
      );
      refresh();
      push(`/${disciplineId}/conceptual-lessons`);
      toast.success('Aula deletada!');
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
              name='day'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o dia'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o tema'
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
