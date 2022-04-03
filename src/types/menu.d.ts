export interface MenuItem {
  id: string;
  value: string;
}

export interface Rules {
  [key: string]: number[];
}

export interface Menu {
  menus: MenuItem[][];
  rules: Rules;
}
