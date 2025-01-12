import { getCalendars } from '@/lib/calendar';

import { CalendarClient } from './_components/client';
import { CalendarColumn } from './_components/columns';

interface CalendarPageProps {
  params: Promise<{ disciplineId: string }>;
}

export default async function CalendarPage({ params }: CalendarPageProps) {
  const { disciplineId } = await params;

  const calendar = await getCalendars(disciplineId);

  const formatedCalendar: CalendarColumn[] = calendar.map((item) => ({
    id: item.id,
    name: item.name,
    date: item.date,
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <CalendarClient data={formatedCalendar} />
      </div>
    </main>
  );
}
