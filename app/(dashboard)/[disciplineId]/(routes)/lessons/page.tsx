import { getLessonsClasses } from '@/lib/lessons';
import { LessonsClient } from './_components/client';
import { LessonsColumn } from './_components/columns';

interface LessonsPageProps {
  params: Promise<{ disciplineId: string }>;
}

export default async function LessonsPage({ params }: LessonsPageProps) {
  const { disciplineId } = await params;

  const lessons = await getLessonsClasses(disciplineId);

  const formatedLessons: LessonsColumn[] = lessons.map((item) => ({
    id: item.id,
    name: item.name,
    deadline: item.deadline,
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <LessonsClient data={formatedLessons} />
      </div>
    </main>
  );
}
