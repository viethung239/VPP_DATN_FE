import { ProductService } from './../../../../services/product.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WareHouseService } from '../../../../services/ware-house.service';
import { WareHouseDetailsService } from '../../../../services/ware-house-details.service';
import { SupplierService } from '../../../../services/supplier.service';
import { v4 as uuidv4 } from 'uuid';
import { ItemWareHouseComponent } from '../item-ware-house/item-ware-house.component';
@Component({
  selector: 'app-add-ware-house',
  templateUrl: './add-ware-house.component.html',
  styleUrl: './add-ware-house.component.scss'
})
export class AddWareHouseComponent {

  WareHouseForm: FormGroup;
  hide = true;
  wareHouseId: string;
  wareHouseDetail: WareHouseDetail[] = [];
  displayedColumns: string[] = ['productId','supplierId','quantity','actions'];
  dataSource = new MatTableDataSource<WareHouseDetail>([]);
  Product: any[] =[];
  Supplier: any[] =[];
  constructor(private fb: FormBuilder, private wareHouseService: WareHouseService,
    private wareHouseDetailService : WareHouseDetailsService,
    private productService:ProductService,
    private suppilerService: SupplierService,
    private router: Router, private snackBar: MatSnackBar,
    private dialog: MatDialog,) {
    this.wareHouseId = ''
    this.WareHouseForm = this.fb.group({

      wareHouseName: ['', Validators.required],
      isActive: ['true', Validators.required],
      dateCreated:[this.getCurrentDateTime(), Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.wareHouseId = uuidv4() ?? 'bị null';
    console.log('wareHouseId', this.wareHouseId)

    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.Product = data;
      },
      error: (error: any) => {
        console.error('Error fetching product:', error);
      }
    });
    this.suppilerService.getListSupplier().subscribe({
      next: (data: any) => {
        this.Supplier = data;
      },
      error: (error: any) => {
        console.error('Error fetching supplier:', error);
      }
    });
  }
  getTenSanPham(productId: string): string {
    const product = this.Product.find(c => c.productId === productId);
    return product ? product.productName : '';
  }
  getTenNhaCungCap(supplierId: string): string {
    const supplier = this.Supplier.find(c => c.supplierId === supplierId);
    return supplier ? supplier.supplierName : '';
  }

  openDialog(wareHouseId: string): void {
    const dialogRef = this.dialog.open(ItemWareHouseComponent, {
      width: '800px',
      height: '300px',
      data: { wareHouseId: wareHouseId }
    });

    dialogRef.componentInstance.selectionConfirmed.subscribe((result) => {
      console.log('Dữ liệu:', result);
      if (result) {
        // Kiểm tra xem sản phẩm đã tồn tại trong kho chưa
        const existingIndex = this.wareHouseDetail.findIndex(item =>
          item.productId === result.productId && item.supplierId === result.supplierId);

        if (existingIndex !== -1) {
          // Nếu sản phẩm đã tồn tại, cập nhật số lượng
          this.wareHouseDetail[existingIndex].quantity += result.quantity;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm mới
          this.wareHouseDetail.push(result);
        }

        // Cập nhật lại dataSource
        this.dataSource.data = this.wareHouseDetail;
      }
    });

  }
  deleteItem(element: WareHouseDetail): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm trong kho này không?')) {

      const index = this.wareHouseDetail.findIndex(item => item.wareHouseDetailId === element.wareHouseDetailId);
      if (index !== -1) {
        this.wareHouseDetail.splice(index, 1)
        this.dataSource.data = [...this.wareHouseDetail];
        this.snackBar.open('Xóa thành công', 'Đóng', { duration: 3000 });

      }
    }
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  onSubmit() {
    if (this.WareHouseForm.valid) {
      const newWH = {
        ...this.WareHouseForm.value,
        wareHouseId: this.wareHouseId
      };
      console.log('Dữ liệu trước khi gửi', newWH);
      this.wareHouseService.addWareHouse(newWH).subscribe({
        next: () => {
          console.log('Thêm người dùng thành công');
          this.snackBar.open('Thêm người dùng thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/kho/danh-sach-kho']);

          this.sendWareHouseDetails();

        },
        error: (error) => {
          console.error('Error adding warehouse:', error);
        }
      });
    }
  }
  sendWareHouseDetails(): void {

    this.wareHouseDetail.forEach(ListWareHDT => {
      this.wareHouseDetailService.addWareHouseDetail(ListWareHDT).subscribe({
        next: () => {

          console.log('Thêm sản phẩm trong kho thành công');

        },
        error: (error) => {
          console.error('Error adding user warehousedt:', error, ListWareHDT);

        }
      });
    });
  }

}
export interface WareHouseDetail {

  wareHouseDetailId: string,
  wareHouseId:  string,
  productId: string,
  supplierId: string,
  quantity:number,
  isActive: string,
  dateCreated: string,
  dateUpdated: string,
}
