'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type TopicsColumn = {
  id: string;
  title: string;
  description: string;
};

export const columns: ColumnDef<TopicsColumn>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => row.original.description,
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
