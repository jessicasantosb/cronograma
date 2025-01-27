import prisma from './db';

export const getTests = async (disciplineId: string) => {
  return await prisma.test.findMany({
    where: { disciplineId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getTestById = async (testId: string) => {
  return await prisma.test.findUnique({
    where: { id: testId },
  });
};
