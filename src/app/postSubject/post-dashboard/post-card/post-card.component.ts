import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Iposts } from 'src/app/models/post';
import { PostsService } from 'src/app/service/posts.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() data !: Iposts



  constructor(
    private _postService : PostsService,
    private _dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  onRemove(){
    let matConfig = new MatDialogConfig()
    matConfig.data = `Are you sure to remove this post with id <strong>${this.data.id}</strong>`
    matConfig.width = "500px"

    let matRef = this._dialog.open(GetConfirmComponent,matConfig)
    matRef.disableClose = true
    matRef.afterClosed().subscribe(res => {
      if(res){
        this._postService.removePosts(this.data.id).subscribe({
          next :data => {
            console.log(data);
            this._postService.setRemove(this.data.id)
          },
          error : err => {
            console.log(err)
          }
        })
      }
    })
  }


  onEdit(){
    this._postService.setEditPost(this.data)
  }

}
