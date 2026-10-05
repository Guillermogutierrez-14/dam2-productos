import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular';

import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [
    CurrencyPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    this.productService.getProducts().subscribe({
      next: (response: ProductsResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set('No se han podido cargar los productos.');
        this.loading.set(false);
      }
    });
  }
}