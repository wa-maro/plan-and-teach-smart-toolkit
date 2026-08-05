import { UrlTree } from '@angular/router';

export interface NavLinkItem {
  url: string | UrlTree;
  title: string;
  icon?: string;
}
