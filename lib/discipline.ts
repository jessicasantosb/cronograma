import prisma from '@/lib/db';

export const getDisciplinesByUserId = async (userId: string) => {
  return await prisma.discipline.findMany({ where: { userId } });
};

export const getDisciplineByUserId = async (userId: string) => {
  return await prisma.discipline.findFirst({ where: { userId } });
};

type getUserDisciplineByDisciplineIdProps = {
  userId: string;
  disciplineId: string;
};

export const getUserDisciplineByDisciplineId = async ({
  userId,
  disciplineId,
}: getUserDisciplineByDisciplineIdProps) => {
  return await prisma.discipline.findFirst({
    where: { userId, id: disciplineId },
  });
};
