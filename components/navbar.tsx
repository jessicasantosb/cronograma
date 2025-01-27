'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavbarProps = React.HTMLAttributes<HTMLElement>;

export function Navbar({ className, ...props }: NavbarProps) {
  const pathname = usePathname();
  const { disciplineId } = useParams();

  const routes = [
    {
      href: `/${disciplineId}`,
      label: 'Dashboard',
      active: pathname === `/${disciplineId}`,
    },
    {
      href: `/${disciplineId}/calendar`,
      label: 'Calendário',
      active: pathname === `/${disciplineId}/calendar`,
    },
    {
      href: `/${disciplineId}/live`,
      label: 'Aulas ao vivo',
      active: pathname === `/${disciplineId}/live`,
    },
    {
      href: `/${disciplineId}/conceptual-lessons`,
      label: 'Aulas conceituais',
      active: pathname === `/${disciplineId}/conceptual-lessons`,
    },
    {
      href: `/${disciplineId}/lessons`,
      label: 'Atividades',
      active: pathname === `/${disciplineId}/lessons`,
    },
    {
      href: `/${disciplineId}/topics`,
      label: 'Tópicos',
      active: pathname === `/${disciplineId}/topics`,
    },
    // {
    //   href: `/${disciplineId}/prova`,
    //   label: 'Prova',
    //   active: pathname === `/${disciplineId}/prova`,
    // },
    // {
    //   href: `/${disciplineId}/notas`,
    //   label: 'Notas',
    //   active: pathname === `/${disciplineId}/notas`,
    // },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map(({ href, label, active }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            active ? 'text-black dark:text-white' : 'text-muted-foreground',
          )}
          {...props}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
