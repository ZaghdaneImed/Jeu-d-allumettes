import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { HelpComponent } from './help/help.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,FormsModule,ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        GameComponent,
        HelpComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('name player 1 field validity', () => {
    let errors = {};
    let name = component.form.controls['p1']; 
    errors = name.errors || {};
    expect(name.valid).toBeFalsy(); 
    expect(errors['required']).toBeTruthy(); 
  });

  it('name player 2 field validity', () => {
    let errors = {};
    let name = component.form.controls['p2']; 
    errors = name.errors || {};
    expect(name.valid).toBeFalsy(); 
    expect(errors['required']).toBeTruthy(); 
  });

  it('submitting the players form', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['p1'].setValue("imed");
    component.form.controls['p2'].setValue("medi");
    expect(component.form.valid).toBeTruthy();
    component.startGame();
    expect(component.start).toBeTruthy();
  });

});
