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
    this._postService.removePostObs$.subscribe(res => {
      let getIndex = this.posts.findIndex(r => r.id === res)
      this.posts.splice(getIndex,1)

    })
  }

  updatePost(){
    this._postService.updatePostObs$.subscribe({
      next : data => {
        let getIndex = this.posts.findIndex(u => u.id === data.id)
        this.posts[getIndex] = data
      },
      error : err => {
        console.log(err)
      }
    })
  }

}
