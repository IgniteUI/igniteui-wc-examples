import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent);

export class Sample {
  private dataService: GridLiteDataService;
  private formatter: Intl.NumberFormat;

  constructor() {
    this.dataService = new GridLiteDataService();
    this.formatter = new Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency: 'EUR'
    });

    const gridLite = document.getElementById('grid-lite') as any;
    const data: ProductInfo[] = this.dataService.generateProducts(50);
    
    const columns = [
      { 
        key: 'name', 
        headerText: 'Product Name' 
      },
      {
        key: 'price',
        headerText: 'Price',
        type: 'number',
        cellTemplate: (params: any) => {
          const span = document.createElement('span');
          span.textContent = this.formatter.format(params.value);
          return span;
        }
      },
      { 
        key: 'sold', 
        type: 'number', 
        headerText: 'Units sold' 
      },
      { 
        key: 'total', 
        headerText: 'Total sold',
        cellTemplate: (params: any) => {
          const span = document.createElement('span');
          span.textContent = this.formatter.format(params.value);
          return span;
        }
      },
      {
        key: 'rating',
        type: 'number',
        headerText: 'Customer rating',
        cellTemplate: (params: any) => {
          const rating = document.createElement('igc-rating');
          rating.setAttribute('readonly', '');
          rating.setAttribute('step', '0.01');
          rating.setAttribute('value', params.value.toString());
          return rating;
        }
      }
    ];

    gridLite.columns = columns;
    gridLite.data = data;
  }
}

export function initialize() {
  return new Sample();
}