'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type LiveColumn = {
  id: string;
  day: string;
  hour: string;
};

export const columns: ColumnDef<LiveColumn>[] = [
  { accessorKey: 'day', header: 'Dia' },
  {
    accessorKey: 'hour',
    header: 'Horário',
    cell: ({ row }) => row.original.day,
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
