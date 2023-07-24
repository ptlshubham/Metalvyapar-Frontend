import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {
  isCondensed = false;

  constructor() { }

  ngOnInit(): void {
    document.body.setAttribute('data-layout', 'horizontal');
    document.body.setAttribute("data-layout", "boxed");
    document.body.removeAttribute('data-sidebar');
  }
  /**
   * on settings button clicked from topbar
   */
   onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

  /**
   * Mobile Toggle Menu
   */
  onToggleMobileMenu() {
    const element = document.getElementById('topnav-menu-content');
    element?.classList.toggle('show');
  }
}
