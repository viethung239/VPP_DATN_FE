import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  User: any[] =[];
  postId: string | null;
  post: any;

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService, ) {
    this.postId = null;

  }

  ngOnInit(): void {
    this.userService.getListUser().subscribe({
      next: (data: any) => {
        this.User = data;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });
    this.postId = this.route.snapshot.paramMap.get('id')!;

    this.getPostDetail(this.postId);
  }

  getPostDetail(id: string): void {
    this.postService.getPostById(id).subscribe((data: any) => {
      this.post = data;
    });
  }
}
