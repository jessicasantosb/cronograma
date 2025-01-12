'use client';

import { useDisciplineModal } from '@/hooks/use-discipline-modal';
import { useEffect } from 'react';

export default function SetupPage() {
  const { onOpen, isOpen } = useDisciplineModal((state) => state);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
