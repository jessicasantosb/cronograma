import { getDisciplineByUserId } from '@/lib/discipline';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const discipline = await getDisciplineByUserId(userId);
  if (discipline) redirect(`/${discipline.id}`);

  return <main>{children}</main>;
}
