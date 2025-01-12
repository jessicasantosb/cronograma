import prisma from './db';

export const getLessonsClasses = async (disciplineId: string) => {
  return await prisma.lessons.findMany({
    where: { disciplineId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getLessonsClassById = async (lessonsId: string) => {
  return await prisma.lessons.findUnique({
    where: { id: lessonsId },
  });
};
