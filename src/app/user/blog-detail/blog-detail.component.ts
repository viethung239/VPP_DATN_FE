import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {

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

  getTenTacGia(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.fullName : '';
  }
  getPostDetail(id: string): void {
    this.postService.getPostById(id).subscribe((data: any) => {
      this.post = data;
    });
  }
}
