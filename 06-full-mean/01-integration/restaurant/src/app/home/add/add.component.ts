import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Restaurant } from '../../models';
import { RestaurantService } from '../../service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  restaurant = {} as Restaurant;
  errors: String[] = [];
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    this.restaurantService.postRestaurant(this.restaurant)
      .subscribe(restaurant => {
        console.log("New restaurant", restaurant);
        this.router.navigateByUrl('/listing');
      },
        error => {
          this.handleErrors(error);
        })
    form.reset();
  }
  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }

}
