import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { calendarId: string } },
) {
  try {
    if (!params.calendarId)
      return new NextResponse('Calendar id is required', { status: 400 });

    const calendar = await prisma.calendar.findUnique({
      where: { id: params.calendarId },
    });

    return NextResponse.json(calendar);
  } catch (error) {
    if (error instanceof Error) console.log('[CALENDAR_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string; calendarId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, date } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!name) return new NextResponse('Name is required', { status: 400 });
    if (!date) return new NextResponse('Date is required', { status: 400 });

    if (!params.calendarId) {
      return new NextResponse('Calendar id is required', { status: 400 });
    }

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const calendar = await prisma.calendar.updateMany({
      where: { id: params.calendarId },
      data: { name, date },
    });

    return NextResponse.json(calendar);
  } catch (error) {
    if (error instanceof Error) console.log('[CALENDAR_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string; calendarId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.calendarId)
      return new NextResponse('Calendar id is required', { status: 400 });

    const disciplineByUserId = await prisma.discipline.findFirst({
      where: { id: params.disciplineId, userId },
    });

    if (!disciplineByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const calendar = await prisma.calendar.deleteMany({
      where: { id: params.calendarId },
    });

    return NextResponse.json(calendar);
  } catch (error) {
    if (error instanceof Error) console.log('[CALENDAR_DELETE]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
