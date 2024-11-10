import { MenuItem } from '../models/ui models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'HR',
      separator: false,
      items: [
        {
          icon: 'fa-solid fa-people-group text-xl mr-4',
          label: 'Users',
          route: '/users',
        },
      ],
    },
  ];
}
