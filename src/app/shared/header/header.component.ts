import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Input() currentPage: string = '';
  @Output() onCloseSidenav:EventEmitter<boolean> = new EventEmitter();
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean) {
    if (logout === true) {
      // @ts-ignore
      this.onLogout.emit(logout);
    }
    this.onCloseSidenav.emit(true);
  }
}
