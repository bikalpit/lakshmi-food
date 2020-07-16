import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuccessOrderPage } from './success-order.page';

describe('SuccessOrderPage', () => {
  let component: SuccessOrderPage;
  let fixture: ComponentFixture<SuccessOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
