import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Restaurant } from '../models';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  restaurant = {} as Restaurant;
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.firstChild.params['restaurant_id'];
    this.restaurantService.getRestaurant(id)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        console.log('Restaurant', this.restaurant);
      })
  }
}
