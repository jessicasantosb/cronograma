import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { DisciplineSwitcher } from '@/components/discipline-switcher';
import { Navbar } from '@/components/navbar';
import { getDisciplinesByUserId } from '@/lib/discipline';

export async function Header() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const disciplines = await getDisciplinesByUserId(userId);

  return (
    <header className='px-4 py-4 mb-1 border-b'>
      <div className='pb-4 flex items-center gap-2'>
        <DisciplineSwitcher items={disciplines} />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton />
        </div>
      </div>
      <Navbar />
    </header>
  );
}
