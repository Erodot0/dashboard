import { NavItem } from 'types';

export type Customer = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    requireAdmin: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Clienti',
    url: '/dashboard/customers',
    icon: 'user',
    shortcut: ['p', 'p'],
    isActive: false,
    requireAdmin: false,
    items: [] // No child items
  },
  {
    title: 'Abbonamenti',
    url: '/dashboard/subscriptions',
    icon: 'subscription',
    shortcut: ['s', 's'],
    isActive: false,
    requireAdmin: false,
    items: [] // No child items
  },
  {
    title: 'Attività',
    url: '/dashboard/tasks',
    icon: 'task',
    shortcut: ['k', 'k'],
    isActive: false,
    requireAdmin: false,
    items: [] // No child items
  },
  {
    title: 'Dipendenti',
    url: '/dashboard/users', // Placeholder as there is no direct link for the parent
    icon: 'employee',
    isActive: false,
    requireAdmin: true,
    items: [] // No child items
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
