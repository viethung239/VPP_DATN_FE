import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { PostData } from '../../admin/main-post/post/list-post/list-post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  User: any[] =[];
  Post: any[] = [];
  p: number = 1;
  itemsPerPage: number = 3;

  constructor(
    private userService: UserService,
    private postService: PostService,

  ) { }

  ngOnInit(): void {

    this.userService.getListUser().subscribe({
      next: (data: any) => {
        this.User = data;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });

    this.getDataPost();
  }

  getTenTacGia(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.fullName: '';
  }
  getDataPost(): void {
    this.postService.getListPost().subscribe({
      next: (data) => {

        this.Post = data.filter((post: PostData) => post.isActive === true);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
