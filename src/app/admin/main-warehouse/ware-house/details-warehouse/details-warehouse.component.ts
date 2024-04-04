import { WareHouseService } from './../../../../services/ware-house.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { WareHouseDetailsService } from '../../../../services/ware-house-details.service';
import { ProductService } from '../../../../services/product.service';
import { SupplierService } from '../../../../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ItemWareHouseComponent } from '../item-ware-house/item-ware-house.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-details-warehouse',
  templateUrl: './details-warehouse.component.html',
  styleUrl: './details-warehouse.component.scss'
})
export class DetailsWarehouseComponent {
  WareHouseForm!: FormGroup;
  wareHouseId: string |null;
  wareHouseDetail: WareHouseDetail[] = [];
  displayedColumns: string[] = ['productId','supplierId','quantity','actions'];
  wareHouseDetailId: string |null;
  Product: any[] =[];
  Supplier: any[] =[];
  isEditClicked: boolean = false;
  ngayTaoOriginal: string | null = null;
  constructor(private fb: FormBuilder, private wareHouseService: WareHouseService,
    private wareHouseDetailService : WareHouseDetailsService,
    private productService:ProductService,
    private suppilerService: SupplierService,
    private router: Router, private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    this.wareHouseId = null;
    this.wareHouseDetailId = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {

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
    this.wareHouseId= this.route.snapshot.paramMap.get('id')!;
    this.WareHouseForm = this.fb.group({

      wareHouseId :this.wareHouseId,
      wareHouseName: ['', Validators.required],
      isActive: ['true', Validators.required],
      dateUpdated: [this.getCurrentDateTime(), Validators.required],
    });
    this.loadDataForEdit();
    this.getWHDTbyId(this.wareHouseId);
  }

  //WareHouse
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.wareHouseId !== null) {
      this.wareHouseService.getWareHouseById(this.wareHouseId).subscribe({
        next: (whData) => {
          if (whData) {
            this.ngayTaoOriginal = whData.dateCreated;
            this.WareHouseForm.patchValue({
              wareHouseName: whData. wareHouseName,
              isActive: whData.isActive,


            });
          } else {
            console.error('Không tìm thấy kho với id:', this.wareHouseId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu với id là null.');
    }
  }

  onSubmit() {
    if (!this.wareHouseId) {
      console.error('Không thể cập nhật Id là null.');
      return;
    }

    if (this.WareHouseForm.valid) {
      const updateWH = {
        ...this.WareHouseForm.value,
        dateCreated: this.ngayTaoOriginal,

      };

      this.wareHouseService.updateWareHouse(this.wareHouseId, updateWH).subscribe({
        next: () => {
          console.log('Cập nhật thông tin thành công');
          this.snackBar.open('Sửa thông tin thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/kho/danh-sach-kho']);
          this.sendWHDTs();
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');

    }
  }
  //WareHouseDetails
  sendWHDTs(): void {

    const newWHDTs = this.wareHouseDetail.filter(whdt => !whdt.wareHouseDetailId);

    newWHDTs.forEach(ListWHDT => {
      this.wareHouseDetailService.addWareHouseDetail(ListWHDT).subscribe({
        next: () => {
          console.log('Thêm sản phẩm trong kho thành công');
        },
        error: (error) => {
          console.error('Error adding user role:', error, ListWHDT);
        }
      });
    });
  }
  deleteItem(element: WareHouseDetail): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm trong kho này không?')) {
      this.wareHouseDetailService.deleteWareHouseDetail(String(element.wareHouseDetailId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa xóa phẩm trong khothành công', 'Đóng', {
            duration: 3000,
          });
          this.wareHouseDetail = this.wareHouseDetail.filter(whdt => whdt !== element);
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

  getWHDTbyId(id: string): void {
    this.wareHouseDetailService.getListWareHouseDetail().subscribe((data: any[]) => {
      this.wareHouseDetail = data.filter(detail => detail.wareHouseId === id);

    });
  }
  openDialogEdit(wareHouseDetailId :string): void {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '200px',
      height: '150px',
      data: { wareHouseDetailId: wareHouseDetailId }
    });
    dialogRef.componentInstance.dataUpdated.subscribe(() => {

      this.getWHDTbyId(this.wareHouseId!);
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

        const existingIndex = this.wareHouseDetail.findIndex(item =>
          item.productId === result.productId && item.supplierId === result.supplierId);

        if (existingIndex !== -1) {

          this.wareHouseDetail[existingIndex].quantity += result.quantity;
        } else {

          this.wareHouseDetail.push(result);
          this.wareHouseDetail = [...this.wareHouseDetail];
        }



      }
    });

  }
  toggleEdit() {
    this.isEditClicked = !this.isEditClicked;
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
