import { getGrades } from '@/lib/grades';
import { GradesClient } from './_components/client';
import { GradesColumn } from './_components/columns';

interface GradesPageProps {
  params: Promise<{ disciplineId: string }>;
}

export default async function GradesPage({ params }: GradesPageProps) {
  const { disciplineId } = await params;

  const grades = await getGrades(disciplineId);

  const formatedGrades: GradesColumn[] = grades.map((item) => ({
    id: item.id,
    grade: item.grade,
    description: item.description,
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <GradesClient data={formatedGrades} />
      </div>
    </main>
  );
}
