import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        link: '/',
    },
    {
        id: 3,
        label: 'MENUITEMS.CUSTOMERLIST.TEXT',
        icon: 'users',
        link: '/trade-list/customer',
    },
    // {
    //     id: 4,
    //     label: 'Trade Summary',
    //     icon: 'repeat',
    //     link: '/trade-list/trade',
    // },
    {
        id: 8,
        label: 'Master Table',
        icon: 'alert-octagon',
        link: '/trade-list/masterTable',
    },
    {
        id: 8,
        label: 'Rejected KYC',
        icon: 'user-x',
        link: '/trade-list/rejectedKYC',
    },
    {
        id: 5,
        label: 'MENUITEMS.APPS.LIST.INBOX',
        icon: 'message-circle',
        link: '/apps/inbox',
    },
    {
        id: 6,
        label: 'Commission Summary',
        icon: 'activity',
        link: '/trade-list/commission',
    },
    // {
    //     id: 7,
    //     label: 'Grievance Redressal',
    //     icon: 'message-circle',
    //     link: '/apps/grievance-inbox',
    // },
];
export const BUYER: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        link: '/landing/user-home',
    },
    {
        id: 3,
        label: 'Trade Request',
        icon: 'plus',
        link: '/landing/trade-active',
    },
    {
        id: 4,
        label: 'Trade Summary',
        icon: 'repeat',
        link: '/landing/buyer-tradesummary',
    },
    {
        id: 5,
        label: 'Payment Summary',
        icon: 'dollar-sign',
        link: '/landing/buyer-paymentsummary',
    },
    {
        id: 6,
        label: 'Completed Trade',
        icon: 'list',
        link: '/landing/buyer-completed',
    },
    {
        id: 7,
        label: 'Help & Support',
        icon: 'phone',
        link: '/landing/support',
    }
];
export const SELLER: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        link: '/landing/user-home',
    },
    {
        id: 3,
        label: 'Trade Request',
        icon: 'plus',
        link: '/landing/seller-trade-active',
    },
    {
        id: 4,
        label: 'Trade Summary',
        icon: 'repeat',
        link: '/landing/seller-tradesummary',
    },
    {
        id: 5,
        label: 'Payment Summary',
        icon: 'dollar-sign',
        link: '/landing/seller-paymentsummary',
    },
    {
        id: 6,
        label: 'Completed Trade',
        icon: 'list',
        link: '/landing/seller-completed',
    },
    {
        id: 7,
        label: 'Help & Support',
        icon: 'phone',
        link: '/landing/support',
    }
];
