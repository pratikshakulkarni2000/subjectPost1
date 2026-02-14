import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'subjectPost1';

  isLoading : boolean = false

  constructor(
    private _spinnerService : SpinnerService
  ){}

  ngOnInit(): void {
    this._spinnerService.spinnerObs$.subscribe(res => {
      this.isLoading = res
    })
  }

 

}
