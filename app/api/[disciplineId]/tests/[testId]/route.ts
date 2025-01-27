import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { testId: string } },
) {
  try {
    if (!params.testId)
      return new NextResponse('Test id is required', { status: 400 });

    const test = await prisma.test.findUnique({
      where: { id: params.testId },
    });

    return NextResponse.json(test);
  } catch (error) {
    if (error instanceof Error) console.log('[TESTS_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string; testId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { day, topic } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!day) return new NextResponse('Day is required', { status: 400 });
    if (!topic) return new NextResponse('Topic is required', { status: 400 });

    if (!params.testId) {
      return new NextResponse('Test id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const test = await prisma.test.updateMany({
      where: { id: params.testId },
      data: { day, topic },
    });

    return NextResponse.json(test);
  } catch (error) {
    if (error instanceof Error) console.log('[TESTS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string; testId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.testId)
      return new NextResponse('Test id is required', { status: 400 });

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const test = await prisma.test.deleteMany({
      where: { id: params.testId },
    });

    return NextResponse.json(test);
  } catch (error) {
    if (error instanceof Error) console.log('[TESTS_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
