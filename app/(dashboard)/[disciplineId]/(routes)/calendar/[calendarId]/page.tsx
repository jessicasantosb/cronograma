import { getCalendarById } from '@/lib/calendar';
import { CalendarForm } from './_components/form';

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ calendarId: string; disciplineId: string }>;
}) {
  const { calendarId } = await params;

  const calendar = await getCalendarById(calendarId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CalendarForm initialData={calendar} />
      </div>
    </main>
  );
}
