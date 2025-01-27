import { getTests } from '@/lib/test';
import { TestsClient } from './_components/client';
import { TestsColumn } from './_components/columns';

interface TestsPageProps {
  params: Promise<{ disciplineId: string }>;
}

export default async function TestsPage({ params }: TestsPageProps) {
  const { disciplineId } = await params;

  const tests = await getTests(disciplineId);

  const formatedTests: TestsColumn[] = tests.map((item) => ({
    id: item.id,
    day: item.day,
    topic: item.topic,
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <TestsClient data={formatedTests} />
      </div>
    </main>
  );
}
