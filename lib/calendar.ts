import prisma from './db';

export const getCalendar = async (disciplineId: string) => {
  return await prisma.calendar.findMany({
    where: { disciplineId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getCalendarById = async (calendarId: string) => {
  return await prisma.calendar.findUnique({
    where: { id: calendarId },
  });
};
