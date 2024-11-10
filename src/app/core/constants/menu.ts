import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'HR',
      separator: false,
      items: [
        {
          icon: 'fa-solid fa-people-group',
          label: 'Users',
          route: '/users',
        },
      ],
    },
  ];
}
