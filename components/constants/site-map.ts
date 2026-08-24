import type { NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  {
    trigger: 'Home',
    href: '/', // Direct link navigation
  },
  {
    trigger: 'About Us',
    items: [
      { label: 'About ULES', href: '/about/ules' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'FAQs', href: '/about/ules#faqs' },
    ],
  },
  {
    trigger: 'Activities',
    items: [
      { label: 'Events', href: '/activities/events' },
      // { label: 'Projects', href: '/activities/projects' },
      { label: 'Gallery', href: '/activities/gallery' },
    ],
  },
  {
    trigger: 'Stories',
    items: [
      { label: 'News', href: '/stories/news' },
      { label: 'Blog', href: '/stories/blog' },
      { label: 'Newsletters', href: 'https://ulesblog.substack.com' },
    ],
  },
  {
    trigger: 'Associations',
    items: [
      { label: 'Departmental Bodies', href: '/associations#departmental' },
      { label: 'Sub Bodies', href: '/associations#sub' },
    ],
  },
  {
    trigger: 'Student Aids',
    items: [
      // { label: 'Resources', href: '/student-aids/resources' },
      { label: 'CGPA Calculator', href: 'https://gpai.com.ng' },
      // { label: 'Feedback', href: '/student-aids/feedback' },
    ],
  },
];

export const QUICK_LINKS: NavItem[] = [
  { trigger: 'Home', href: '/' },
  { trigger: 'About Us', href: '/about/ules' },
  { trigger: 'EXCO', href: '/about/leadership' },
  { trigger: 'Associations', href: '/associations' },
];

export const RESOURCES: NavItem[] = [
  // { trigger: 'Past Questions', href: '/student-aids/PQs' },
  { trigger: 'CGPA Calculator', href: 'https://gpai.com.ng' },
  { trigger: 'Contact Us', href: '/contact' },
  // { trigger: 'Feedback', href: '/student-aids/feedback' },
];

export const ACTIVITIES: NavItem[] = [
  // { trigger: 'Projects', href: '/activities/projects' },
  { trigger: 'Gallery', href: '/activities/gallery' },
  { trigger: 'Events', href: '/activities/events' },
  { trigger: 'Blog', href: '/stories/blog' },
  { trigger: 'News', href: '/stories/news' },
];
