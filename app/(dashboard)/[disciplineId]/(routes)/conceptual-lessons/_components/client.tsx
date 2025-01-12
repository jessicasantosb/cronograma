'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, ConceptualLessonsColumn } from './columns';

interface ConceptualLessonsClientProps {
  data: ConceptualLessonsColumn[];
}

export function ConceptualLessonsClient({
  data,
}: ConceptualLessonsClientProps) {
  const { push } = useRouter();
  const { disciplineId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Aulas conceituais'
          description='Gerencie as suas aulas conceituais.'
        />
        <Button onClick={() => push(`/${disciplineId}/conceptual-lessons/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='day' data={data} columns={columns} />
    </>
  );
}
