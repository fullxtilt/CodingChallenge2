import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCharacterComponent } from './modify-character.component';

describe('ModifyCharacterComponent', () => {
  let component: ModifyCharacterComponent;
  let fixture: ComponentFixture<ModifyCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
