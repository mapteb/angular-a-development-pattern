import { ComponentFixture, getTestBed, inject, TestBed } from '@angular/core/testing';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Product } from '../product.model';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let router, location;
  
  // = {
  //   navigate: jasmine.createSpy('navigate')
  // }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouterModule.forRoot([]),
        RouterTestingModule.withRoutes([]),
    ],
      declarations: [ AddProductComponent ],
      providers: [ { provide: Location, useValue: location } ],

    })
    .compileComponents();
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    router = _router;
    location = _location;
    const prod: Product = new Product(null,'prod_3',1.00);
    const navigationExtras: NavigationExtras = {
      state: {product: prod}
    }
    
    router.navigate(['/add-product'], navigationExtras);
    fixture = TestBed.createComponent(AddProductComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
