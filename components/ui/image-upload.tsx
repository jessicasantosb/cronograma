'use client';

import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export function ImageUpload({
  value,
  disabled,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    console.log(result);
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button
                variant={'destructive'}
                size={'icon'}
                onClick={() => onRemove(url)}>
                <Trash className='size-4' />
              </Button>
            </div>
            <Image
              alt='imagem'
              src={url}
              placeholder='blur'
              blurDataURL={url}
              fill
              className='object-cover'
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onSuccess={onUpload} uploadPreset='lakhqwihb'>
        {({ open }) => {
          const onClick = () => open();
          return (
            <Button variant={'secondary'} disabled={disabled} onClick={onClick}>
              <ImagePlus className='size-4 mr-2' />
              Insira uma imagem
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
