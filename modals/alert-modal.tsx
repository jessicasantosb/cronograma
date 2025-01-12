'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalsProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AlertModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: AlertModalsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title='Tem certeza?'
      description='Essa ação não pode ser desfeita'
      isOpen={isOpen}
      onClose={onClose}>
      <div className='w-full space-x-2 pt-6 flex items-center justify-end'>
        <Button variant={'outline'} disabled={isLoading} onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant={'destructive'}
          disabled={isLoading}
          onClick={onConfirm}>
          Continuar
        </Button>
      </div>
    </Modal>
  );
}
