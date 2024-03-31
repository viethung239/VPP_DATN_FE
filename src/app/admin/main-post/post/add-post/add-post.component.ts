import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  User: any[] =[];
  PostForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService,
    private userService: UserService,

    private router: Router, private snackBar: MatSnackBar) {

    this.PostForm = this.fb.group({


      userId: ['', Validators.required],
      postName: ['', Validators.required],
      postImg: ['', Validators.required],
      sContent: ['', Validators.required],
      lContent: ['', Validators.required],
      isActive: ['true', Validators.required],
      dateCreated: [this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],

    });
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
  }
  getCurrentDateTime(): string {
    const now = new Date();

    return now.toISOString();
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

    if (this.PostForm.valid) {

      const newPost = this.PostForm.value;

      this.postService.addPost(newPost).subscribe({
        next: () => {

          console.log('Thêm bài viết thành công');
          this.snackBar.open('Thêm bài viết thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/bai-viet']);
        },
        error: (error) => {
          console.error('Error adding post:', error);
        }
      });
    }
  }
}
