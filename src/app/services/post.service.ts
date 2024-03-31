import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private authService: AuthService) {

  }
  getListPost(): Observable<any>{
      return this.authService.sendProtectedRequestGet('https://localhost:7287/api/Post')

  }
  deletePost(postId: string): Observable<any> {
    const url = `https://localhost:7287/api/Post/${postId}`;
    return this.authService.sendProtectedRequestDelete(url);
  }

  updatePost(postId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7287/api/Post/`+ postId;
    console.log('Cập nhật với postId:', postId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addPost(newPostData: any): Observable<any> {
    const url = 'https://localhost:7287/api/Post';
    return this.authService.sendProtectedRequestPost(url, newPostData);
  }
  getPostById(postId: string): Observable<any> {
    const url = `https://localhost:7287/api/Post/${postId}`;
    return this.authService.sendProtectedRequestGetById(url);
  }
}
