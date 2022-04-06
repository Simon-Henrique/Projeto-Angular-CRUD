import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: product = {
    name: '',
    price: Number(null)
  }

  constructor(
    private ProductService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.ProductService.readById(id!).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void{
    const id = this.route.snapshot.paramMap.get('id')
    this.ProductService.delete(id!).subscribe(()=>{
      this.ProductService.showMessage('Produto Deletado com Sucesso!')
      this.router.navigate(['products'])
    })
  }

  cancel(): void{
    this.router.navigate(['products'])
  }

}
