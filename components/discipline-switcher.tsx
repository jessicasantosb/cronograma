'use client';

import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDisciplineModal } from '@/hooks/use-discipline-modal';
import { cn } from '@/lib/utils';
import { Discipline } from '@prisma/client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface DisciplineSwitcherProps extends PopoverTriggerProps {
  items: Discipline[];
}

export function DisciplineSwitcher({
  className,
  items = [],
}: DisciplineSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const disciplineModal = useDisciplineModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const currentDiscipline = formattedItems.find(
    ({ value }) => value === params.disciplineId,
  );

  const onDisciplineSelect = (discipline: { label: string; value: string }) => {
    setIsOpen(false);
    router.push(`/${discipline.value}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          role='combobox'
          aria-expanded={isOpen}
          aria-label='selecione uma disciplina'
          className={cn('justify-between', className)}>
          <StoreIcon className='size-4 mr-2' />
          {currentDiscipline?.label}
          <ChevronsUpDown className='size-4 ml-auto shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder='Pesquisar discipline...' />
            <CommandEmpty>Nenhuma disciplina encontrada</CommandEmpty>
            <CommandGroup heading='Disciplina'>
              {formattedItems.map((discipline) => (
                <CommandItem
                  key={discipline.value}
                  onSelect={() => onDisciplineSelect(discipline)}
                  className='text-sm'>
                  <StoreIcon className='size-4 mr-2' />
                  {discipline.label}
                  <Check
                    className={cn(
                      'size-4 ml-auto',
                      currentDiscipline?.value === discipline.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  disciplineModal.onOpen();
                }}>
                <PlusCircle className='size-5 mr-2' />
                Criar Disciplina
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
