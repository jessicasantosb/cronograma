import { getConceptualLessonById } from '@/lib/conceptual-lessons';
import { ConceptualLessonsForm } from './_components/form';

export default async function ConceptualLessonsPage({
  params,
}: {
  params: Promise<{ conceptualLessonsId: string; disciplineId: string }>;
}) {
  const { conceptualLessonsId } = await params;

  const conceptualLessons = await getConceptualLessonById(conceptualLessonsId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ConceptualLessonsForm initialData={conceptualLessons} />
      </div>
    </main>
  );
}
