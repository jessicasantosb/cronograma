'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { CalendarColumn, columns } from './columns';

interface CalendarClientProps {
  data: CalendarColumn[];
}

export function CalendarClient({ data }: CalendarClientProps) {
  const { push } = useRouter();
  const { disciplineId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Calendário'
          description='Gerencie a sua semana acadêmica.'
        />
        <Button onClick={() => push(`/${disciplineId}/calendar/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' data={data} columns={columns} />
    </>
  );
}
