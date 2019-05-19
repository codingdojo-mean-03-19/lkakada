import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../service';
import { Restaurant } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  constructor(private readonly restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurants();
  }
  getRestaurants() {
    this.restaurantService.getRestarants()
      .subscribe(restaurants => {
        this.restaurants = restaurants;
      })
  }
  deleteRestaurant(restaurant: Restaurant) {
    this.restaurantService.deleteRestaurant(restaurant._id)
      .subscribe(removedRestarant => {
        console.log(removedRestarant);
        this.getRestaurants();
      })
  }
}
