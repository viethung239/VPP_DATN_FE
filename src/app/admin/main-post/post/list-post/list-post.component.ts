import { Component, ViewChild } from '@angular/core';
import { UserData } from '../../../main-user/user/list-user/list-user.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.scss'
})
export class ListPostComponent {
  User: UserData[] = [];
  displayedColumns: string[] = ['stt', 'userId', 'postName','sContent','postImg', 'dateCreated','dateUpdated','actions'];
  searchKeyword: string = '';
  dataSource = new MatTableDataSource<PostData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private postService: PostService,
    private userService:UserService,
    private snackBar: MatSnackBar,

    ) { }

  ngAfterViewInit() {

    this.userService.getListUser().subscribe({
      next: (data: any) => {
        this.User = data;

      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });

    this.dataSource.paginator = this.paginator;


    this.getDataPost();
  }
  getTenTacGia(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.fullName : '';
  }
  getDataPost(): void {
    this.postService.getListPost().subscribe({
      next: (data) => {
        data.sort((a: PostData, b: PostData) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        data.sort((a: PostData, b: PostData) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: PostData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      this.postService.deletePost(String(element.postId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa bài viết thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataPost();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}
export interface PostData {

  postId: string,
  userId: string,
  postName: string,
  postImg: string,
  sContent: string,
  lContent: string,
  isActive: string,
  dateCreated: string,
  dateUpdated: string
}
