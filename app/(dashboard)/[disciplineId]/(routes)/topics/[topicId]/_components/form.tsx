'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Topics } from '@prisma/client';
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
import { topicsFormSchema } from '@/schemas/form-schema';

interface TopicsFormProps {
  initialData: Topics | null;
}

type TopicsFormValues = z.infer<typeof topicsFormSchema>;

export function TopicsForm({ initialData }: TopicsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { disciplineId, topicId } = useParams();
  const { refresh, push } = useRouter();

  const title = initialData ? 'Editar Tópico' : 'Criar Tópico';
  const description = initialData
    ? 'Editar um Tópico'
    : 'Adicionar novo Tópico';
  const toastMessage = initialData
    ? 'Tópico atualizado!'
    : 'Tópico criado!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<TopicsFormValues>({
    resolver: zodResolver(topicsFormSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (values: TopicsFormValues) => {   
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(`/api/${disciplineId}/topics/${topicId}`, {
          values,
        });
      } else {
        await axios.post(`/api/${disciplineId}/topics`, {
          values,
        });
      }
      push(`/${disciplineId}/topics`);
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
      await axios.delete(`/api/${disciplineId}/topics/${topicId}`);
      refresh();
      push(`/${disciplineId}/topics`);
      toast.success('Tópico deletado!');
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
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o título'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite a descrição'
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
