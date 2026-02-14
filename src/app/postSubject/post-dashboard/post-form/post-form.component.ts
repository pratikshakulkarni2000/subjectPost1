import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iposts } from 'src/app/models/post';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
postForm  !: FormGroup

userIdArr : Array<number> = [1,2,3,4,5,6,7,8]

isInEditMode : boolean = false
editId !: string

  constructor(
    private _postService : PostsService
  ) { }

  // trackById(index : string , post : Iposts){
  //   return post.id
  // }

  ngOnInit(): void {
    this.createForm()

    this.patchData()
  }

  createForm(){
    this.postForm = new FormGroup({
      title : new FormControl(null,[Validators.required],[]),
      content : new FormControl(null,[Validators.required]),
      userId : new FormControl(null,[Validators.required])
    })
  }

  get f(){
    return this.postForm.controls
  }

  onSubmit(){
    if(this.postForm.valid){
      let obj = this.postForm.value
      console.log(obj)

      this._postService.createPost(obj)
          .subscribe({
            next : data => {
              console.log(data);
              this.postForm.reset()

              this._postService.setNewPost(obj)
            },
            error : err => {
              console.log(err)
            }
          })
      }
    }


    patchData(){
      this._postService.editPostObs$.subscribe(res => {
        if(res){
          this.postForm.patchValue(res)
          this.isInEditMode = true
          this.editId = res.id
        }
      })
    }


    onUpdate(){
      if(this.postForm.valid){
        let obj : Iposts = {
          ...this.postForm.value,
          id : this.editId
        }
        console.log(obj);
        
        this._postService.updatePosts(obj).subscribe({
          next : data => {
            console.log(data);
            
            this.postForm.reset()
            this.isInEditMode = false
            this._postService.setPost(data)
          }
        })
      }
    }

  }


