'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, TopicsColumn } from './columns';

interface TopicsClientProps {
  data: TopicsColumn[];
}

export function TopicsClient({ data }: TopicsClientProps) {
  const { push } = useRouter();
  const { disciplineId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Tópicos'
          description='Gerencie os tópicos dessa disciplina.'
        />
        <Button onClick={() => push(`/${disciplineId}/topics/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='title' data={data} columns={columns} />
    </>
  );
}
