'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { LiveColumn, columns } from './columns';

interface LiveClientProps {
  data: LiveColumn[];
}

export function LiveClient({ data }: LiveClientProps) {
  const { push } = useRouter();
  const { disciplineId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Aulas ao vivo'
          description='Gerencie as suas aulas ao vivo.'
        />
        <Button onClick={() => push(`/${disciplineId}/live/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='day' data={data} columns={columns} />
    </>
  );
}
