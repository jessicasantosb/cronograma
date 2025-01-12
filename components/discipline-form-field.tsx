import { Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

interface DisciplineFormFieldProps {
  control: Control<
    {
      name: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  isLoading: boolean;
}

export function DisciplineFormField({ control, isLoading }: DisciplineFormFieldProps) {
  return (
    <FormField
      control={control}
      name='name'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome da disciplina</FormLabel>
          <FormControl>
            <Input
              disabled={isLoading}
              placeholder='Digite o nome'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
