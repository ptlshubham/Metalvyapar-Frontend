import { Component, OnInit } from '@angular/core';
import ls from 'localstorage-slim';
import { EventService } from 'src/app/core/services/event.service';
import { LAYOUT_MODE, LAYOUT_POSITION, LAYOUT_WIDTH, SIDEBAR_COLOR, SIDEBAR_SIZE, TOPBAR } from 'src/app/layouts/layouts.model';

@Component({
  selector: 'app-header-right',
  templateUrl: './header-right.component.html',
  styleUrls: ['./header-right.component.scss']
})
export class HeaderRightComponent implements OnInit {
  layout!: string | null;
  mode: string | undefined;
  width: string | undefined;
  position: string | undefined;
  topbar: string | undefined;
  sidebarcolor: string | undefined;
  sidebarsize: string | undefined;
  isUser: any;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.isUser = ls.get('UserId', { decrypt: true });

    this.mode = LAYOUT_MODE;
    this.width = LAYOUT_WIDTH;
    this.topbar = TOPBAR;
    this.sidebarcolor = SIDEBAR_COLOR;
    this.sidebarsize = SIDEBAR_SIZE;
    this.position = LAYOUT_POSITION;

    /**
     * horizontal-vertical layput set
     */
    this.layout = document.body.getAttribute('data-layout');
    const vertical = document.getElementById('is-layout');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (this.layout == 'horizontal') {
      vertical?.removeAttribute('checked');
    }
  }
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }
  changeLayout(layout: any) {
    // this.eventService.broadcast('changeLayout', layout);
    if (layout.target.checked == true)
      this.eventService.broadcast('changeLayout', 'vertical');
    else
      this.eventService.broadcast('changeLayout', 'horizontal');
  }

  /**
   * Change the Mode onclick
   * @param mode Change the layout
   */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  /**
   * Change the Width onclick
   * @param Width Change the layout
   */
  changeWidth(width: string) {
    this.width = width;
    this.eventService.broadcast('changeWidth', width);
  }

  /**
   * Change the Position onclick
   * @param Position Change the layout
   */
  changePosition(scrollable: string) {
    this.position = scrollable;
    this.eventService.broadcast('changePosition', scrollable);
  }

  /**
   * Change the Topbar onclick
   * @param topbar Change the layout
   */
  changeTopbar(topbar: string) {
    this.topbar = topbar;
    this.eventService.broadcast('changeTopbar', topbar);
  }

  /**
   * Change the Sidebar Color onclick
   * @param Sidebar Color Change the layout
   */
  changeSidebarColor(sidebarcolor: string) {
    this.sidebarcolor = sidebarcolor;
    this.eventService.broadcast('changeSidebarColor', sidebarcolor);
  }

  /**
   * Change the Sidebar Size onclick
   * @param Sidebar Size Change the layout
   */
  changeSidebarSize(sidebarsize: string) {
    this.sidebarsize = sidebarsize;
    this.eventService.broadcast('changeSidebarSize', sidebarsize);
  }

}

