import { getLessonsClassById } from '@/lib/lessons';
import { LessonsForm } from './_components/form';

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ lessonId: string; disciplineId: string }>;
}) {
  const { lessonId } = await params;

  const lesson = await getLessonsClassById(lessonId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <LessonsForm initialData={lesson} />
      </div>
    </main>
  );
}
