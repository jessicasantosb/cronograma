import { getTopicById } from '@/lib/topic';
import { TopicsForm } from './_components/form';

export default async function TopicsPage({
  params,
}: {
  params: Promise<{ topicId: string; disciplineId: string }>;
}) {
  const { topicId } = await params;

  const topic = await getTopicById(topicId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <TopicsForm initialData={topic} />
      </div>
    </main>
  );
}
