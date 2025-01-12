import { getConceptualLessons } from '@/lib/conceptual-lessons';
import { ConceptualLessonsClient } from './_components/client';
import { ConceptualLessonsColumn } from './_components/columns';

interface ConceptualLessonsPageProps {
  params: Promise<{ disciplineId: string }>;
}

export default async function ConceptualLessonsPage({
  params,
}: ConceptualLessonsPageProps) {
  const { disciplineId } = await params;

  const conceptualLessons = await getConceptualLessons(disciplineId);

  const formatedConceptualLessons: ConceptualLessonsColumn[] =
    conceptualLessons.map((item) => ({
      id: item.id,
      day: item.day,
      name: item.name,
    }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <ConceptualLessonsClient data={formatedConceptualLessons} />
      </div>
    </main>
  );
}
