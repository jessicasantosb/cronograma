import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { topicId: string } },
) {
  try {
    if (!params.topicId)
      return new NextResponse('Topic id is required', { status: 400 });

    const topic = await prisma.topics.findUnique({
      where: { id: params.topicId },
    });

    return NextResponse.json(topic);
  } catch (error) {
    if (error instanceof Error) console.log('[TOPICS_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string; topicId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { title, description } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!title) return new NextResponse('Title is required', { status: 400 });
    if (!description) return new NextResponse('Description is required', { status: 400 });

    if (!params.topicId) {
      return new NextResponse('Topic id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const topic = await prisma.topics.updateMany({
      where: { id: params.topicId },
      data: { title, description },
    });

    return NextResponse.json(topic);
  } catch (error) {
    if (error instanceof Error)
      console.log('[TOPICS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string; topicId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.topicId)
      return new NextResponse('Topic id is required', { status: 400 });

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const topic = await prisma.topics.deleteMany({
      where: { id: params.topicId },
    });

    return NextResponse.json(topic);
  } catch (error) {
    if (error instanceof Error)
      console.log('[TOPICS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
