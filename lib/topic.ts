import prisma from './db';

export const getTopics = async (disciplineId: string) => {
  return await prisma.topics.findMany({
    where: { disciplineId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getTopicById = async (topicId: string) => {
  return await prisma.topics.findUnique({
    where: { id: topicId },
  });
};
