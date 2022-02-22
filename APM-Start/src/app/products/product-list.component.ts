import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IPorduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) { }


  pageTitle = 'Product List!';
  imageWidth = 40;
  imageMargin = 2;
  showImage: boolean = false;
  errorMessage: string = ''
  sub!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value)
    this.filteredProducts = this.performFilter(value)
  }

  filteredProducts: IPorduct[] = [];
  products: IPorduct[] = []

  performFilter(filterBy: string): IPorduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((prduct: IPorduct) => prduct.productName.toLocaleLowerCase().includes(filterBy))
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}