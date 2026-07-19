export interface NavItem {
  trigger: string;
  href?: string; // Optional for standalone links
  items?: { label: string; href: string }[]; // Optional dropdown list
}
