import prisma from './db';

export const getLiveClasses = async (disciplineId: string) => {
  return await prisma.liveClasses.findMany({
    where: { disciplineId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getLiveClassById = async (liveClassId: string) => {
  return await prisma.liveClasses.findUnique({
    where: { id: liveClassId },
  });
};
