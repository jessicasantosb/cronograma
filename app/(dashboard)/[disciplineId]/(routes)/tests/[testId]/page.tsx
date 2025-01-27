import { getTestById } from '@/lib/test';
import { TestsForm } from './_components/form';

export default async function TestsPage({
  params,
}: {
  params: Promise<{ testId: string; disciplineId: string }>;
}) {
  const { testId } = await params;

  const test = await getTestById(testId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <TestsForm initialData={test} />
      </div>
    </main>
  );
}
