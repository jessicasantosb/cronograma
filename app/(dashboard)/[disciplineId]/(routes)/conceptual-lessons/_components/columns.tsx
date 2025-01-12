'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type ConceptualLessonsColumn = {
  id: string;
  day: string;
  name: string;
};

export const columns: ColumnDef<ConceptualLessonsColumn>[] = [
  { accessorKey: 'day', header: 'Dia' },
  {
    accessorKey: 'name',
    header: 'Tema',
    cell: ({ row }) => row.original.name,
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
