import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YourCartPage } from './your-cart.page';

describe('YourCartPage', () => {
  let component: YourCartPage;
  let fixture: ComponentFixture<YourCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YourCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
