import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IpostRes, Iposts } from '../models/post';
import { map, Observable, Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  BASE_URL : string = environment.BASE_URL
  POST_URL : string = `${this.BASE_URL}/cards.json`

  constructor(
    private _httpClient : HttpClient,
    private _snackBar : SnackbarService
  ) { }

  private newPostSub$ : Subject<Iposts> = new Subject<Iposts>()
  newPostObs$ : Observable<Iposts> = this.newPostSub$.asObservable()
  setNewPost (p : Iposts){
    this.newPostSub$.next(p)
  }

  private editPostSub$ : Subject<Iposts> = new Subject<Iposts>()
  editPostObs$ : Observable<Iposts> = this.editPostSub$.asObservable()
  setEditPost (post : Iposts){
    this.editPostSub$.next(post)
  }

   private updatePostSub$ : Subject<Iposts> = new Subject<Iposts>()
  updatePostObs$ : Observable<Iposts> = this.updatePostSub$.asObservable()
  setPost (post : Iposts){
    this.updatePostSub$.next(post)
  }

  private removePostSub$ : Subject<string> = new Subject<string>()
  removePostObs$ : Observable<string> = this.removePostSub$.asObservable()

  setRemove(r : string){
    this.removePostSub$.next(r)
  }

  fetchPosts() : Observable<Iposts[]>{
    return this._httpClient.get<any>(this.POST_URL).pipe(
      map(obj => {
        let postArr :Array<Iposts> = []
        for(const key in obj){
          postArr.unshift({...obj[key],id:key})
        }
        return postArr
      })
    )
  }

  createPost(post : Iposts) : Observable<IpostRes>{
    this._snackBar.opensnackbar(`Post added successfully!!!`)
      return this._httpClient.post<any>(this.POST_URL,post)
  }

  removePosts(id : string) : Observable<any>{
    let REMOVE_URL = `${this.BASE_URL}/cards/${id}.json`
    this._snackBar.opensnackbar(`This post is removed successfully !!!`)
    
    return this._httpClient.delete(REMOVE_URL)
  }

  updatePosts(up : Iposts) : Observable<Iposts>{
    let UPDATE_URL = `${this.BASE_URL}/cards/${up.id}.json`
    console.log(UPDATE_URL);
    

    this._snackBar.opensnackbar(`This post is updated successfully !!!`)

    return this._httpClient.patch<Iposts>(UPDATE_URL,up)
  }


}
