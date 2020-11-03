import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComplainOrderPage } from './complain-order.page';

describe('ComplainOrderPage', () => {
  let component: ComplainOrderPage;
  let fixture: ComponentFixture<ComplainOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplainOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
