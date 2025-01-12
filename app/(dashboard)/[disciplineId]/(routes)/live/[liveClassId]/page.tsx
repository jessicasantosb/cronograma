import { getLiveClassById } from '@/lib/live';
import { LiveForm } from './_components/form';

export default async function LivePage({
  params,
}: {
  params: Promise<{ liveClassId: string; disciplineId: string }>;
}) {
  const { liveClassId } = await params;

  const live = await getLiveClassById(liveClassId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <LiveForm initialData={live} />
      </div>
    </main>
  );
}
