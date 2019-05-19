import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Restaurant, Review } from '../../models';
import { RestaurantService } from '../../service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  review = {} as Review;
  restaurant: Restaurant;
  errors: String[] = [];
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('restaurant_id')),
        switchMap(id => this.restaurantService.getRestaurant(id))
      )
      .subscribe(restaurant => {
        this.restaurant = restaurant
        console.log('Restaurant', this.restaurant);
      })
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    this.restaurantService.addReview(this.restaurant._id, this.review)
      .subscribe(review => {
        console.log('New review', review);
        this.router.navigate(['/review/list', this.restaurant._id]);
      },
        error => {
          console.log(error)
          this.handleErrors(error)
        })
  }


  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }

}
