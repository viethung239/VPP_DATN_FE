import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { GroupCategoryService } from '../../services/group-category.service';
import { ProductData } from '../../admin/main-product/product/list-product/list-product.component';

interface CategoryNode {
  categoryId?: string;
  Name: string;
  categoryGroupId?: string;
  children?: CategoryNode[];
}
@Component({
  selector: 'app-shop-user',
  templateUrl: './shop-user.component.html',
  styleUrls: ['./shop-user.component.scss']
})
export class ShopUserComponent {
  Category: any[] = [];
  Product: any[] = [];
  p: number = 1;
  itemsPerPage: number = 12;
  searchKeyword: string = '';
  treeControl = new NestedTreeControl<CategoryNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private groupCategoryService: GroupCategoryService
  ) { }

  ngOnInit(): void {
    this.groupCategoryService.getListCategoryGroup().subscribe({
      next: (groupData: any[],) => {
        this.categoryService.getListCategory().subscribe({
          next: (categoryData: any[]) => {
            this.Category = this.buildCategoryTree(groupData, categoryData);
            this.Category.unshift({ Name: 'SẢN PHẨM' });
            this.dataSource.data = this.Category;
            this.Category = categoryData;

          },
          error: (error: any) => {
            console.error('Error fetching categories:', error);
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching category groups:', error);
      }
    });

    this.getDataProduct();
  }

  getTenDanhMuc(categoryId: string): string {
    const category = this.Category.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }

  getDataProduct(): void {
    this.productService.getListProduct().subscribe({
      next: (data) => {
        this.Product = data.filter((product: ProductData) => product.isActive === true);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  hasChild = (_: number, node: CategoryNode) => node.children !== undefined && node.children.length > 0;

  buildCategoryTree(groupData: any[], categoryData: any[]): CategoryNode[] {
    const tree: CategoryNode[] = [];
    groupData.forEach(group => {
      const groupNode: CategoryNode = { Name: group.categoryGroupName, children: [] };
      const children = categoryData.filter(category => category.categoryGroupId === group.categoryGroupId );
      if (children && children.length > 0) {
        children.forEach(child => {
          groupNode.children?.push({ categoryId: child.categoryId, Name: child.categoryName });
        });
      }
      tree.push(groupNode);
    });
    return tree;
  }
  onCategorySelected(node: CategoryNode): void {

    if (node.Name === 'SẢN PHẨM') {
      this.p = 1;
      this.getDataProduct();
    } else {
      if (node.categoryId) {
      this.productService.getListProduct().subscribe({
        next: (data: any[]) => {
           this.p = 1;
          this.Product = data.filter((product: any) => product.categoryId === node.categoryId);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
  }
  searchProducts(): void {
    if (!this.searchKeyword.trim()) {

      this.getDataProduct();
      this.p = 1;
      return;
    }
    this.p = 1;
    this.Product = this.Product.filter(product =>
      product.productName.toLowerCase().includes(this.searchKeyword.trim().toLowerCase())
    );
  }
}
