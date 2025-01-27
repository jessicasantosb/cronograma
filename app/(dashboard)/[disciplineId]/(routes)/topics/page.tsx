import { getTopics } from '@/lib/topic';
import { TopicsClient } from './_components/client';
import { TopicsColumn } from './_components/columns';

interface TopicsPageProps {
  params: Promise<{ disciplineId: string }>;
}

export default async function TopicsPage({ params }: TopicsPageProps) {
  const { disciplineId } = await params;

  const topics = await getTopics(disciplineId);

  const formatedTopics: TopicsColumn[] = topics.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <TopicsClient data={formatedTopics} />
      </div>
    </main>
  );
}
