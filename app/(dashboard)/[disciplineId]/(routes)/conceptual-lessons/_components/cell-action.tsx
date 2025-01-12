'use client';

import axios from 'axios';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ConceptualLessons } from '@prisma/client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertModal } from '@/modals/alert-modal';


interface CellActionProps {
  data: ConceptualLessons;
}

export function CellAction({ data }: CellActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { push, refresh } = useRouter();
  const { disciplineId } = useParams();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${disciplineId}/conceptual-lessons/${data.id}`);
      refresh();
      toast.success('Aula deletada!');
    } catch (error) {
      console.log(error);

      toast.error('Algum erro ocorreu.');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='size-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              push(`/${disciplineId}/conceptual-lessons/${data.id}`)
            }>
            <Edit className='size-4 mr-2' />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className='size-4 mr-2' />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
