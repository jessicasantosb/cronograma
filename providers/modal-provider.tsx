'use client';

import { useEffect, useState } from 'react';

import { DisciplineModal } from '@/modals/discipline-modal';

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <DisciplineModal />
    </>
  );
}
