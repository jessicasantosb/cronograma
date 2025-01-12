'use client';

import { Copy, Server } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { onCopy } from '@/utils/on-copy';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Público',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export function ApiAlert({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) {
  return (
    <Alert>
      <Server className='size-4' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}

        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='mt-4 flex items-center justify-between'>
        <code className='relative rounded px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm bg-muted'>
          {description}
        </code>
        <Button variant={'outline'} size={'icon'} onClick={() => onCopy(description)}>
          <Copy className='size-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
