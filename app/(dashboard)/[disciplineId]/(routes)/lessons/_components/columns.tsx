'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type LessonsColumn = {
  id: string;
  name: string;
  deadline: string;
};

export const columns: ColumnDef<LessonsColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => row.original.name,
  },
  { accessorKey: 'deadline', header: 'Prazo' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
