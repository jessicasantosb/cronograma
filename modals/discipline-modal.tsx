'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DisciplineFormField } from '@/components/discipline-form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Modal } from '@/components/ui/modal';
import { useDisciplineModal } from '@/hooks/use-discipline-modal';
import { formSchema } from '@/schemas/form-schema';
import toast from 'react-hot-toast';

type DisciplineModalFormValues = z.infer<typeof formSchema>;

export function DisciplineModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useDisciplineModal();

  const form = useForm<DisciplineModalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (values: DisciplineModalFormValues) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/discipline', { values });
      window.location.assign(`/${data.id}`);
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado! Tente novamente!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Criar disciplina'
      description='Adicione uma nova disciplina'
      isOpen={isOpen}
      onClose={onClose}>
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DisciplineFormField
                control={form.control}
                isLoading={isLoading}
              />

              <div className='w-full pt-6 space-x-2 flex items-center justify-end'>
                <Button
                  disabled={isLoading}
                  type='button'
                  variant={'outline'}
                  onClick={onClose}>
                  Cancelar
                </Button>
                <Button disabled={isLoading} type='submit'>
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
