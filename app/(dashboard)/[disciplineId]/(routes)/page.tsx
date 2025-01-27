import { GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <main className='min-h-dvh py-8 px-4 flex flex-col items-center'>
      <>
        <h1 className='text-4xl tracking-tight font-bold text-blue-600'>
          Organize seus estudos e horários de forma prática e eficiente
        </h1>
        <div className='flex items-center gap-1 text-muted-foreground'>
          <p>Ideal para quem estuda em cursos EAD</p>
          <GraduationCap className='size-6' />
        </div>
      </>

      <div className='relative w-full flex-1 flex flex-col-reverse items-center gap-4'>
        <Image
          alt='aula online'
          src={'/assets/Webinar-cuate.svg'}
          fill
          className='absolute object-fill select-none'
        />
        <a href='https://storyset.com/online' className='text-xs mt-4 text-gray-400'>
          Online illustrations by Storyset
        </a>
      </div>
    </main>
  );
}
