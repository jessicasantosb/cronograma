import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { disciplineId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const name = body.values.name;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!name) return new NextResponse('Name is required', { status: 400 });
    if (!params.disciplineId)
      return new NextResponse('Discipline ID is required', { status: 400 });

    const discipline = await prisma.discipline.updateMany({
      where: { id: params.disciplineId, userId },
      data: { name },
    });

    return NextResponse.json(discipline);
  } catch (error) {
    if (error instanceof Error) console.log('[DISCIPLINE_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { disciplineId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.disciplineId)
      return new NextResponse('Discipline ID is required', { status: 400 });

    const discipline = await prisma.discipline.deleteMany({
      where: { id: params.disciplineId, userId },
    });

    return NextResponse.json(discipline);
  } catch (error) {
    if (error instanceof Error) console.log('[DISCIPLINE_DELETE]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
