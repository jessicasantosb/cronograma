'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type CalendarColumn = {
  id: string;
  name: string;
  date: string;
};

export const columns: ColumnDef<CalendarColumn>[] = [
  { accessorKey: 'name', header: 'Semana' },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => row.original.date,
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
