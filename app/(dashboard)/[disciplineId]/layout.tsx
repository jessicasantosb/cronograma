import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Header } from '@/components/header';
import { getUserDisciplineByDisciplineId } from '@/lib/discipline';

interface Props {
  children: React.ReactNode;
  params: Promise<{ disciplineId: string }>;
}

export default async function DashboardLayout({ children, params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { disciplineId } = await params;

  const store = await getUserDisciplineByDisciplineId({ userId, disciplineId });

  if (!store) redirect('/');

  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
