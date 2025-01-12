import prisma from './db';

export const getConceptualLessons = async (disciplineId: string) => {
  return await prisma.conceptualLessons.findMany({
    where: { disciplineId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getConceptualLessonById = async (conceptualLessonsId: string) => {
  return await prisma.conceptualLessons.findUnique({
    where: { id: conceptualLessonsId },
  });
};
