'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, TestsColumn } from './columns';

interface TestsClientProps {
  data: TestsColumn[];
}

export function TestsClient({ data }: TestsClientProps) {
  const { push } = useRouter();
  const { disciplineId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Prova'
          description='Gerencie a data da prova dessa disciplina.'
        />
        <Button onClick={() => push(`/${disciplineId}/tests/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='topic' data={data} columns={columns} />
    </>
  );
}
