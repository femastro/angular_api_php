import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  constructor(
    private route: Router
    ) { }

  public user;

  ngOnInit(): void {
  }

  logOut(){
    this.route.navigate(['/']);
  }

}
