import { getLiveClasses } from '@/lib/live';

import { LiveClient } from './_components/client';
import { LiveColumn } from './_components/columns';

interface LivePageProps {
  params: Promise<{ disciplineId: string }>;
}

export default async function LivePage({ params }: LivePageProps) {
  const { disciplineId } = await params;

  const live = await getLiveClasses(disciplineId);

  const formatedLive: LiveColumn[] = live.map((item) => ({
    id: item.id,
    day: item.day,
    hour: item.hour,
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <LiveClient data={formatedLive} />
      </div>
    </main>
  );
}
