// src/components/navigation/header.tsx
'use client'; // If you need interactive client state (toggles, mobile menus)

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '../constants';
import { MenuIcon, CloseIcon } from '../icons';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '../ui/menubar';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '../ui/sheet';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // State to track the currently open mobile accordion. Null means all are closed.
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  // Toggle function for the mobile accordion
  const toggleAccordion = (trigger: string) => {
    setOpenMobileAccordion((prev) => (prev === trigger ? null : trigger));
  };

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="xs:px-[4.1%] flex w-full max-w-360 items-center justify-between px-4 lg:px-[4.5%] xl:px-[7.778%] 2xl:mx-auto 2xl:max-w-[84.44%] 2xl:px-0">
        {/* Brand Logo */}
        <Link href="/" className="my-[2.5px] flex items-center gap-2">
          <Image
            src="/ules-logo.png"
            alt="ULES Logo"
            width={276}
            height={60}
            priority
            className="x-[276px] y-15"
          />
        </Link>

        {/* Navigation Menubar */}
        <Menubar className="hidden border-none bg-transparent shadow-none lg:flex">
          {NAV_ITEMS.map((menu) => {
            // Check if this specific item or any of its children are the current active route
            const isSingleActive = menu.href && pathname === menu.href;
            const isParentActive = menu.items?.some((item) => pathname.startsWith(item.href));
            const isActive = isSingleActive || isParentActive;

            return (
              <MenubarMenu key={menu.trigger}>
                <MenubarTrigger
                  // 1. Add "group" to listen for Radix's state changes
                  // 2. Conditionally apply "text-primary" if active
                  className={cn(
                    'group flex cursor-pointer items-center gap-1 transition-colors',
                    'text-center font-sans text-sm font-normal tracking-normal whitespace-nowrap',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                  onClick={() => menu.href && router.push(menu.href)}
                >
                  {menu.trigger}

                  {/* Render the caret ONLY if there are dropdown items */}
                  {menu.items && (
                    <ChevronDown
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                </MenubarTrigger>

                {/* Dropdown Content */}
                {menu.items && (
                  <MenubarContent className="min-w-max">
                    {menu.items.map((item) => {
                      // 1. Split the path and the hash
                      const [itemPath, itemHash] = item.href.split('#');

                      // 2. Check if we are on the base path
                      const isChildActive = pathname === itemPath;

                      // 3. If on the same page, ONLY use the hash. If on a different page, use the full href.
                      const finalHref = isChildActive && itemHash ? `#${itemHash}` : item.href;

                      return (
                        <MenubarItem
                          key={item.href}
                          // Highlight the specific child dropdown item in primary color if active
                          className={cn(
                            'w-full cursor-pointer whitespace-nowrap transition-colors',
                            'font-sans text-sm font-normal tracking-normal',
                            isChildActive
                              ? 'text-primary bg-primary/5 focus:text-primary focus:bg-primary/10'
                              : 'text-foreground focus:bg-muted',
                          )}
                          onClick={() => router.push(finalHref)}
                        >
                          {item.label}
                        </MenubarItem>
                      );
                    })}
                  </MenubarContent>
                )}
              </MenubarMenu>
            );
          })}
        </Menubar>

        {/* Call to Action or Right Section */}
        <Button
          className="hidden px-5 text-white lg:block xl:w-42.5"
          onClick={() => router.push('/contact')}
        >
          Contact Us
        </Button>

        {/* --- MOBILE NAVIGATION (Hidden on >= 1024px) --- */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-primary py-[6.25px] hover:bg-transparent lg:hidden"
              />
            }
          >
            <MenuIcon className="size-6 shrink-0" />
            <span className="sr-only">Toggle mobile menu</span>
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className={cn(
              'flex flex-col gap-6 overflow-y-auto pt-0',
              // Width logic: 100vw below 390px, capped at 390px on larger screens
              'xs:w-97.5 w-full max-w-[100vw]',
              // Padding logic: Matches the header's px spacing
              'xs:px-[4.1%] px-4',
            )}
          >
            {/* Custom Header matching the top bar height and alignment */}
            <div className="flex h-16.25 w-full items-center justify-end border-b border-transparent">
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-primary py-[6.25px] hover:bg-transparent"
                  />
                }
              >
                <CloseIcon className="size-6 shrink-0" />
                <span className="sr-only">Close mobile menu</span>
              </SheetClose>
            </div>

            {/* SheetTitle is required for accessibility, though we can visually hide it if needed */}
            <SheetHeader className="sr-only text-left">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>

            <nav className="mt-2 flex flex-col gap-2">
              {NAV_ITEMS.map((menu) => {
                const isSingleActive = menu.href && pathname === menu.href;
                const isParentActive = menu.items?.some((item) => pathname.startsWith(item.href));
                const isActive = isSingleActive || isParentActive;

                const isOpen = openMobileAccordion === menu.trigger;

                return (
                  <div
                    key={menu.trigger}
                    className="border-border/50 flex flex-col border-b pb-2 last:border-0"
                  >
                    {/* Standard Links or Parent Triggers */}
                    <div
                      className={cn(
                        'flex cursor-pointer items-center justify-between py-3 font-sans text-base font-medium transition-colors',
                        isActive ? 'text-primary' : 'text-foreground',
                      )}
                      onClick={() => {
                        if (menu.href) {
                          router.push(menu.href);
                        } else if (menu.items) {
                          toggleAccordion(menu.trigger);
                        }
                      }}
                    >
                      {menu.trigger}

                      {/* Accordion Caret */}
                      {menu.items && (
                        <ChevronDown
                          className={cn(
                            'text-muted-foreground size-4 transition-transform duration-200',
                            isOpen && 'text-primary rotate-180',
                          )}
                        />
                      )}
                    </div>

                    {/* Mobile Dropdown Children (Fluid Accordion Push) */}
                    {menu.items && (
                      <div
                        className={cn(
                          'flex flex-col overflow-hidden transition-all duration-300 ease-in-out',
                          isOpen ? 'mt-1 mb-2 max-h-100 opacity-100' : 'max-h-0 opacity-0',
                        )}
                      >
                        <div className="border-primary/20 ml-1 flex flex-col gap-4 border-l-2 py-1 pl-4">
                          {menu.items.map((item) => {
                            const isChildActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  'py-1 text-sm transition-colors',
                                  isChildActive
                                    ? 'text-primary font-medium'
                                    : 'text-muted-foreground hover:text-primary',
                                )}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Call to Action */}
            <div className="mt-auto pt-4 pb-8">
              <Button className="w-full text-white" onClick={() => router.push('/contact')}>
                Contact Us
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
