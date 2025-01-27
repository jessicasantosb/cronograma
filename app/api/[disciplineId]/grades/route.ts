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

    const { grade, description } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!grade) return new NextResponse('Grade is required', { status: 400 });
    if (!description)
      return new NextResponse('Description is required', { status: 400 });
    if (!params.disciplineId) {
      return new NextResponse('Discipline id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const newGrade = await prisma.grades.create({
      data: { grade, description, disciplineId: params.disciplineId },
    });

    return NextResponse.json(newGrade);
  } catch (error) {
    if (error instanceof Error) console.log('[GRADES_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { gradesId: string } },
) {
  try {
    if (!params.gradesId)
      return new NextResponse('Grades id is required', { status: 400 });

    const grade = await prisma.grades.findUnique({
      where: { id: params.gradesId },
    });

    return NextResponse.json(grade);
  } catch (error) {
    if (error instanceof Error) console.log('[GRADES_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string; gradesId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { grade, description } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!grade) return new NextResponse('Grade is required', { status: 400 });
    if (!description) {
      return new NextResponse('Description is required', { status: 400 });
    }
    if (!params.gradesId) {
      return new NextResponse('Grades id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const gradeUpdated = await prisma.grades.updateMany({
      where: { id: params.gradesId },
      data: { grade, description },
    });

    return NextResponse.json(gradeUpdated);
  } catch (error) {
    if (error instanceof Error) console.log('[GRADES_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string; gradesId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.gradesId)
      return new NextResponse('Grades id is required', { status: 400 });

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const grade = await prisma.grades.deleteMany({
      where: { id: params.gradesId },
    });

    return NextResponse.json(grade);
  } catch (error) {
    if (error instanceof Error) console.log('[GRADES_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
