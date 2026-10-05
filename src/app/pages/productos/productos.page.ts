import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
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
    RouterLink,
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

  readonly pageSize = 10;

  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  error = signal('');
  currentPage = signal(1);

  totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize)));

  // Indicadores del dashboard (sobre los productos de la página actual)
  totalUnits = computed(() =>
    this.products().reduce((sum, p) => sum + p.stock, 0)
  );

  totalValue = computed(() =>
    this.products().reduce((sum, p) => sum + this.stockValue(p), 0)
  );

  averageRating = computed(() => {
    const list = this.products();
    if (list.length === 0) {
      return 0;
    }
    const avg = list.reduce((sum, p) => sum + p.rating, 0) / list.length;
    return Math.round(avg * 100) / 100;
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    const skip = (this.currentPage() - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
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

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.loadProducts();
    }
  }

  // Stock valorado = unidades * precio, menos el descuento aplicable
  stockValue(product: Product): number {
    const total = product.stock * product.price;
    return total - (total * product.discountPercentage / 100);
  }
}