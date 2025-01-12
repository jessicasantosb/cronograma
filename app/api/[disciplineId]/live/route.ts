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

    const { day, hour } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!day) return new NextResponse('Day is required', { status: 400 });
    if (!hour) return new NextResponse('Hour is required', { status: 400 });
    if (!params.disciplineId) {
      return new NextResponse('Discipline id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const live = await prisma.liveClasses.create({
      data: { day, hour, disciplineId: params.disciplineId },
    });

    return NextResponse.json(live);
  } catch (error) {
    if (error instanceof Error)
      console.log('[LIVECLASSES_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { liveClassId: string } },
) {
  try {
    if (!params.liveClassId)
      return new NextResponse('Live Class id is required', { status: 400 });

    const live = await prisma.liveClasses.findUnique({
      where: { id: params.liveClassId },
    });

    return NextResponse.json(live);
  } catch (error) {
    if (error instanceof Error) console.log('[LIVECLASSES_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string; liveClassId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { day, hour } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!day) return new NextResponse('Day is required', { status: 400 });
    if (!hour) return new NextResponse('Hour is required', { status: 400 });
    if (!params.liveClassId) {
      return new NextResponse('Live Class id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const live = await prisma.liveClasses.updateMany({
      where: { id: params.liveClassId },
      data: { day, hour },
    });

    return NextResponse.json(live);
  } catch (error) {
    if (error instanceof Error)
      console.log('[LIVECLASSES_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string; liveClassId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.liveClassId)
      return new NextResponse('Live Class id is required', { status: 400 });

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const live = await prisma.liveClasses.deleteMany({
      where: { id: params.liveClassId },
    });

    return NextResponse.json(live);
  } catch (error) {
    if (error instanceof Error)
      console.log('[LIVECLASSES_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
