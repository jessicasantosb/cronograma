import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { disciplineId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { deadline, name } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!deadline) return new NextResponse('Deadline is required', { status: 400 });
    if (!name) return new NextResponse('Name is required', { status: 400 });
    if (!params.disciplineId) {
      return new NextResponse('Discipline id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const lessons = await prisma.lessons.create({
      data: { deadline, name, disciplineId: params.disciplineId },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[LESSONS_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { lessonId: string } },
) {
  try {
    if (!params.lessonId)
      return new NextResponse('Lessons id is required', {
        status: 400,
      });

    const lessons = await prisma.lessons.findUnique({
      where: { id: params.lessonId },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[LESSONS_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string; lessonId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { deadline, name } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!deadline) return new NextResponse('Deadline is required', { status: 400 });
    if (!name) return new NextResponse('name is required', { status: 400 });
    if (!params.lessonId) {
      return new NextResponse(' Lessons id is required', {
        status: 400,
      });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const lessons = await prisma.lessons.updateMany({
      where: { id: params.lessonId },
      data: { deadline, name },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[LESSONS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string; lessonId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.lessonId)
      return new NextResponse('Lessons id is required', {
        status: 400,
      });

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const lessons = await prisma.lessons.deleteMany({
      where: { id: params.lessonId },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[LESSONS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
