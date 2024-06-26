import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalObservable: Subscription

  constructor() { }

  ngOnInit() {
    // this.intervalObservable = interval(1000).subscribe(count => {
    //   console.log(count);
      
    // })
    const customIntervalObservable = new Observable((observer: Observer<number>) => {
      let count = 0
      setInterval(() => {
        observer.next(count)
        if (count === 2) {
          observer.complete()
        }
        if (count > 2) {
          observer.error(new Error('count > 2'))
        }
        count++
      }, 1000)
    })

    customIntervalObservable

    this.intervalObservable = customIntervalObservable.pipe(filter((data: number) => {
      if (data > 0) {
        return true
      }
    }), 
    map((data: number) => {
      return 'Round: ' + data
    }))
    .subscribe(count => {
      console.log(count);
      
    }, error => {
      console.log(error);
      alert(error.message)
    }, () => {
      console.log('completed');
      
    })
  }

  ngOnDestroy(): void {
    this.intervalObservable.unsubscribe()
  }

}
