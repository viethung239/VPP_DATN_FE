import { Component } from '@angular/core';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

}
export interface CategoryData {


  categoryId: string,
  categoryGroupId:  string,
  categoryName:  string,
  categoryImg:  string,
  isActive: string,
  dateCreated:  string,
  dateUpdated: string
}
