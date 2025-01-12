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

    const { day, name } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!day) return new NextResponse('Day is required', { status: 400 });
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

    const conceptualLessons = await prisma.conceptualLessons.create({
      data: { day, name, disciplineId: params.disciplineId },
    });

    return NextResponse.json(conceptualLessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[CONCEPTUALLESSONS_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { conceptualLessonsId: string } },
) {
  try {
    if (!params.conceptualLessonsId)
      return new NextResponse('Conceptual Lessons id is required', {
        status: 400,
      });

    const conceptualLessons = await prisma.conceptualLessons.findUnique({
      where: { id: params.conceptualLessonsId },
    });

    return NextResponse.json(conceptualLessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[CONCEPTUALLESSONS_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string; conceptualLessonsId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { day, name } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!day) return new NextResponse('Day is required', { status: 400 });
    if (!name) return new NextResponse('name is required', { status: 400 });
    if (!params.conceptualLessonsId) {
      return new NextResponse('Conceptual Lessons id is required', {
        status: 400,
      });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const conceptualLessons = await prisma.conceptualLessons.updateMany({
      where: { id: params.conceptualLessonsId },
      data: { day, name },
    });

    return NextResponse.json(conceptualLessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[CONCEPTUALLESSONS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string; conceptualLessonsId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.conceptualLessonsId)
      return new NextResponse('Conceptual Lessons id is required', {
        status: 400,
      });

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const conceptualLessons = await prisma.conceptualLessons.deleteMany({
      where: { id: params.conceptualLessonsId },
    });

    return NextResponse.json(conceptualLessons);
  } catch (error) {
    if (error instanceof Error)
      console.log('[CONCEPTUALLESSONS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
