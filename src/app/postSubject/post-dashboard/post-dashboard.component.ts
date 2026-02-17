import { Component, OnInit } from '@angular/core';
import { Iposts } from 'src/app/models/post';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  posts : Array<Iposts> = []

  constructor(
    private _postService : PostsService
  ) { }
  trackById(index : number,d : Iposts){
    return d.id
  }

  ngOnInit(): void {
    this.fetchData()
    this.getPosts()
    this.deletePost()
    this.updatePost()
  }

  fetchData(){
    this._postService.fetchPosts().subscribe({
      next : data => {
        console.log(data);
        this.posts = data
      },
      error : err => {
        console.log(err)
      }
    })
  }

  getPosts(){
    this._postService.newPostObs$.subscribe(data => {
      this.posts.unshift(data)
    })
  }

  deletePost(){
    this._postService.removePostObs$.subscribe(id => {
      let getIndex = this.posts.findIndex(r => r.id === id)
      this.posts.splice(getIndex,1)

    })
  }

  updatePost(){
    this._postService.updatePostObs$.subscribe(res => {
      let getIndex = this.posts.findIndex(u => u.id === res.id)
        this.posts[getIndex] = res
     
    })
  }

}
