import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Restaurant, Review } from '../../models';


@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {
  restaurant = {} as Restaurant;
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getReview();
  }

  getReview() {
    this.route.paramMap
      .pipe(
        map(params => params.get('restaurant_id')),
        switchMap(id => this.restaurantService.getReviews(id))
      )
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        console.log('Restaurant', this.restaurant);
      })
  }
  deleteReview(review: Review) {
    this.restaurantService.deleteReview(review._id)
      .subscribe(removedReview => {
        console.log("Removed review", removedReview);
        this.getReview();
      })
  }
}
