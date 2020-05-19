import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  navigateTo(route: string, target: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([route])
    );

    console.log(url);

    window.open('#' + url, target);
  }
}
