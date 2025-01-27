'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type GradesColumn = {
  id: string;
  grade: string;
  description: string;
};

export const columns: ColumnDef<GradesColumn>[] = [
  {
    accessorKey: 'grade',
    header: 'Nota',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => row.original.description,
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
