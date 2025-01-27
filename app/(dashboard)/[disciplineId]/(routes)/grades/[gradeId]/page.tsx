import { getGradeById } from '@/lib/grades';
import { GradesForm } from './_components/form';

export default async function GradesPage({
  params,
}: {
  params: Promise<{ gradeId: string; disciplineId: string }>;
}) {
  const { gradeId } = await params;

  const grade = await getGradeById(gradeId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <GradesForm initialData={grade} />
      </div>
    </main>
  );
}
