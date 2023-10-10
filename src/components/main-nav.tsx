'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { LogoBoostSEO } from '@/components/logo';
import { MobileNav } from '@/components/mobile-nav';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ExtendedWebsiteView } from '@/packages/apigen';

import { MainNavItem } from '@/types';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  websiteDetails: ExtendedWebsiteView | undefined;
  basePath?: string;
}

export function MainNav({
  items,
  children,
  websiteDetails,
  basePath,
}: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className='flex w-full justify-between'>
      <div className='flex gap-6 md:gap-10'>
        <a
          href={websiteDetails?.url}
          className='hidden items-center space-x-2 md:flex'
        >
          <LogoBoostSEO />
          <span className='hidden text-lg font-semibold sm:inline-block'>
            {websiteDetails?.name}
          </span>
        </a>
        {items?.length ? (
          <nav className='hidden gap-6 md:flex'>
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'hover:text-foreground/80 flex items-center text-lg font-medium transition-colors sm:text-sm',
                  item.href.toString().startsWith(`${segment}`)
                    ? 'text-foreground'
                    : 'text-foreground/60',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                {item.title}
              </Link>
            ))}

            {/* Tags */}
            {websiteDetails?.tags && websiteDetails?.tags?.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className='hover:text-foreground/80 text-foreground/60 flex items-center text-lg font-medium transition-colors sm:text-sm'>
                    Categories
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuLabel>Discover Topics</DropdownMenuLabel>
                  <DropdownMenuSeparator /> */}
                  {websiteDetails.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`${basePath || ''}/category/${tag.slug}`}
                    >
                      <DropdownMenuItem>{tag.name}</DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        ) : null}
        <button
          className='flex items-center space-x-2 md:hidden'
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <LogoBoostSEO />}
          <span className='font-bold'>Menu</span>
        </button>
        {showMobileMenu && items && (
          <MobileNav
            items={items}
            basePath={basePath}
            websiteDetails={websiteDetails}
          >
            {children}
          </MobileNav>
        )}
      </div>

      <a href='https://www.boostseo.ai/'>
        <Button size='sm' variant='default'>
          Get AI Blogs
        </Button>
      </a>
    </div>
  );
}
