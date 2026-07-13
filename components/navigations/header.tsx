// src/components/navigation/header.tsx
'use client'; // If you need interactive client state (toggles, mobile menus)

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import MenuIcon from '../ui/hamburger';
import CloseIcon from '../ui/close';

// Define a strict TypeScript interface for your menu items
interface NavItem {
  trigger: string;
  href?: string; // Optional for standalone links
  items?: { label: string; href: string }[]; // Optional dropdown list
}

const NAV_ITEMS: NavItem[] = [
  {
    trigger: 'Home',
    href: '/', // Direct link navigation
  },
  {
    trigger: 'About Us',
    items: [
      { label: 'About ULES', href: '/about/ules' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'FAQs', href: '/about/faqs' },
    ],
  },
  {
    trigger: 'Activities',
    items: [
      { label: 'Events', href: '/activities/events' },
      { label: 'Projects', href: '/activities/projects' },
      { label: 'Gallery', href: '/activities/gallery' },
    ],
  },
  {
    trigger: 'Stories',
    items: [
      { label: 'News', href: '/stories/news' },
      { label: 'Blog', href: '/stories/blog' },
      { label: 'Newsletters', href: '/stories/newsletters' },
    ],
  },
  {
    trigger: 'Associations',
    items: [
      { label: 'Sub Bodies', href: '/associations/sub' },
      { label: 'Departmental Bodies', href: '/associations/departmental' },
    ],
  },
  {
    trigger: 'Student Aids',
    items: [
      { label: 'Resources', href: '/student-aids/resources' },
      { label: 'CGPA Calculator', href: '/student-aids/cgpa-calculator' },
      { label: 'Feedback', href: '/student-aids/feedback' },
    ],
  },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // State to track the currently open mobile accordion. Null means all are closed.
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  // Toggle function for the mobile accordion
  const toggleAccordion = (trigger: string) => {
    setOpenMobileAccordion(prev => prev === trigger ? null : trigger);
  };

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className=" max-w-360 2xl:max-w-[84.44%] 2xl:mx-auto px-4 xs:px-[4.1%] lg:px-[4.5%] xl:px-[7.778%] 2xl:px-0 w-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center my-[2.5px] gap-2">
          <Image src="/ules-logo.png" alt="ULES Logo" width={276} height={60} className="x-[276px] y-15" />
        </Link>

        {/* Navigation Menubar */}
        <Menubar className="border-none bg-transparent shadow-none hidden lg:flex">
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
                    "group cursor-pointer flex items-center gap-1 transition-colors",
                    "font-sans text-sm font-normal tracking-normal text-center whitespace-nowrap",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
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
                      const isChildActive = pathname === item.href;
                      
                      return (
                        <MenubarItem 
                          key={item.href} 
                          // Highlight the specific child dropdown item in primary color if active
                          className={cn(
                            "w-full cursor-pointer transition-colors whitespace-nowrap",
                            "font-sans text-sm font-normal tracking-normal",
                            isChildActive 
                              ? "text-primary bg-primary/5 focus:text-primary focus:bg-primary/10"
                              : "text-foreground focus:bg-muted"
                          )}
                          onClick={() => router.push(item.href)}
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
        <Button className="hidden lg:block text-white xl:w-42.5 px-5" onClick={() => router.push('/contact')}>
          Contact Us
        </Button>

        {/* --- MOBILE NAVIGATION (Hidden on >= 1024px) --- */}
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon-xs" className="lg:hidden text-primary hover:bg-transparent py-[6.25px]" />
            }
          >
            <MenuIcon className="size-6 shrink-0" />
            <span className="sr-only">Toggle mobile menu</span>
          </SheetTrigger>
          
          <SheetContent 
            side="right" 
            showCloseButton={false} 
            className={cn(
              "flex flex-col gap-6 pt-0 overflow-y-auto",
              // Width logic: 100vw below 390px, capped at 390px on larger screens
              "w-full xs:w-97.5 max-w-[100vw]",
              // Padding logic: Matches the header's px spacing
              "px-4 xs:px-[4.1%]"
            )}
          >
            {/* Custom Header matching the top bar height and alignment */}
            <div className="w-full flex items-center justify-end h-16.25 border-b border-transparent">
               <SheetClose
                 render={
                   <Button variant="ghost" size="icon-xs" className="text-primary hover:bg-transparent py-[6.25px]" />
                 }
               >
                 <CloseIcon className="size-6 shrink-0" />
                 <span className="sr-only">Close mobile menu</span>
               </SheetClose>
            </div>
            
            {/* SheetTitle is required for accessibility, though we can visually hide it if needed */}
            <SheetHeader className="text-left sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-2 mt-2">
              {NAV_ITEMS.map((menu) => {
                const isSingleActive = menu.href && pathname === menu.href;
                const isParentActive = menu.items?.some((item) => pathname.startsWith(item.href));
                const isActive = isSingleActive || isParentActive;
                
                const isOpen = openMobileAccordion === menu.trigger;

                return (
                  <div key={menu.trigger} className="flex flex-col border-b border-border/50 last:border-0 pb-2">
                    {/* Standard Links or Parent Triggers */}
                    <div 
                      className={cn(
                        "flex items-center justify-between py-3 font-sans text-base font-medium transition-colors cursor-pointer",
                        isActive ? "text-primary" : "text-foreground"
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
                            "size-4 transition-transform duration-200 text-muted-foreground",
                            isOpen && "rotate-180 text-primary"
                          )} 
                        />
                      )}
                    </div>

                    {/* Mobile Dropdown Children (Fluid Accordion Push) */}
                    {menu.items && (
                      <div 
                        className={cn(
                          "flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
                          isOpen ? "max-h-100 opacity-100 mb-2 mt-1" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="flex flex-col pl-4 gap-4 border-l-2 border-primary/20 ml-1 py-1">
                          {menu.items.map((item) => {
                            const isChildActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "text-sm transition-colors py-1",
                                  isChildActive 
                                    ? "text-primary font-medium" 
                                    : "text-muted-foreground hover:text-primary"
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
            <div className="mt-auto pb-8 pt-4">
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