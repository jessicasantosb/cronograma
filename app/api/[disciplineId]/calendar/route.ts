import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { date } from 'zod';

import prisma from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { disciplineId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, billboardId } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!name) return new NextResponse('Name is required', { status: 400 });
    if (!billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }
    if (!params.disciplineId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const calendar = await prisma.calendar.create({
      data: { label, date, disciplineId: params.disciplineId },
    });

    return NextResponse.json(calendar);
  } catch (error) {
    if (error instanceof Error) console.log('[CALENDAR_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { disciplineId: string } },
) {
  try {
    if (!params.disciplineId) {
      return new NextResponse('Discipline id is required', { status: 400 });
    }

    const categories = await prisma.calendar.findMany({
      where: { disciplineId: params.disciplineId },
    });

    return NextResponse.json(categories);
  } catch (error) {
    if (error instanceof Error) console.log('[CALENDAR_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
