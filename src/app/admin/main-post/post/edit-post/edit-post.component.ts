import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
  User: any[] =[];
  PostForm!: FormGroup;
  postId: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private fb: FormBuilder, private postService: PostService,
    private userService: UserService,
    private router: Router, private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.postId = null;
    this.ngayTaoOriginal = null;
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

    this.postId = this.route.snapshot.paramMap.get('id');
    this.PostForm = this.fb.group({

      postId: this.postId,
      userId: ['', Validators.required],
      postName: ['', Validators.required],
      postImg: ['', Validators.required],
      sContent: ['', Validators.required],
      lContent: ['', Validators.required],
      isActive: ['', Validators.required],
      isHot: ['', Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],

    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.postId !== null) {
      this.postService.getPostById(this.postId).subscribe({
        next: (postData) => {
          if (postData) {
            this.ngayTaoOriginal = postData.dateCreated;
            this.PostForm.patchValue({

              userId: postData.userId,
              postName: postData.postName,
              postImg: postData.postImg,
              sContent: postData.sContent,
              lContent: postData.lContent,
              isActive: postData.isActive,
              isHot: postData.isHot,
              //

            });
          } else {
            console.error('Không tìm thấy bài viết với id:', this.postId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu bài viết với postId là null.');
    }
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    this.PostForm.patchValue({
      postImg: fileName
    });
  }
  onSubmit() {
    if (!this.postId) {
      console.error('Không thể cập nhật dữ liệu bài viết với postId là null.');
      return;
    }

    if (this.PostForm.valid) {
      const updatedPost = {
        ...this.PostForm.value,
        dateCreated: this.ngayTaoOriginal,
      };

      this.postService.updatePost(this.postId, updatedPost).subscribe({
        next: () => {
          console.log('Cập nhật bài viết thành công');
          this.snackBar.open('Sửa bài viết thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/bai-viet']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');

    }
  }
}
