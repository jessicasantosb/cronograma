'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, LessonsColumn } from './columns';

interface LessonsClientProps {
  data: LessonsColumn[];
}

export function LessonsClient({ data }: LessonsClientProps) {
  const { push } = useRouter();
  const { disciplineId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Atividades'
          description='Gerencie as suas atividades.'
        />
        <Button onClick={() => push(`/${disciplineId}/lessons/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' data={data} columns={columns} />
    </>
  );
}
