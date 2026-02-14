import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar : MatSnackBar
  ) { }

  opensnackbar(msg : string){
    this._snackBar.open(msg , "Close",{
      verticalPosition : 'top',
      horizontalPosition : 'left',
      duration : 3000
    })
  }

}
