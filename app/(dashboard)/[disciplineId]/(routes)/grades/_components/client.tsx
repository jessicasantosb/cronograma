'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, GradesColumn } from './columns';

interface GradesClientProps {
  data: GradesColumn[];
}

export function GradesClient({ data }: GradesClientProps) {
  const { push } = useRouter();
  const { disciplineId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Notas'
          description='Gerencie as notas dessa disciplina.'
        />
        <Button onClick={() => push(`/${disciplineId}/grades/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='grade' data={data} columns={columns} />
    </>
  );
}
