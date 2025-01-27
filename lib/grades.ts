import prisma from './db';

export const getGrades = async (disciplineId: string) => {
  return await prisma.grades.findMany({
    where: { disciplineId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getGradeById = async (gradeId: string) => {
  return await prisma.grades.findUnique({
    where: { id: gradeId },
  });
};
