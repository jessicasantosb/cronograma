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
  },
  {
    accessorKey: 'deadline',
    header: 'Prazo',
    cell: ({ row }) => row.original.deadline,
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
