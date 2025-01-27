'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type TestsColumn = {
  id: string;
  day: string;
  topic: string;
};

export const columns: ColumnDef<TestsColumn>[] = [
  {
    accessorKey: 'day',
    header: 'Dia',
  },
  {
    accessorKey: 'topic',
    header: 'Tópico',
    cell: ({ row }) => row.original.topic,
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
