import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';


const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const p1 = fg.get('p1').value;
  const p2 = fg.get('p2').value;
  return p1 !== p2
    ? null
    : { range: true };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  computer :boolean;
  help :boolean;
  items: number[] = [];
  nbAllumettes : number;
  p1 : String;
  p2 : String;
  start:boolean = false;
  form: FormGroup;
  eventsSubject: EventEmitter<any> = new EventEmitter();

constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      p1: ['', [Validators.required]],
      p2: ['', [Validators.required]],
      nbAllumettes: ['', [Validators.required]]
    },{validator: MyAwesomeRangeValidator})  // key is to validate on the form group)
    this.form.controls['nbAllumettes'].setValue(6);
  }

  startGame(){

    this.p1 = this.form.get("p1").value;
    this.p2 = this.form.get("p2").value;
    this.nbAllumettes = this.form.get("nbAllumettes").value;
    this.start = true;
    this.help = false;
    this.items = [];
    this.items = this.createRange();
    if(this.computer){
      setTimeout(() => {
        console.log('Test');
        this.eventsSubject.next()
      }, 1000);
    }
  }

  vsComputer(){
    this.form.controls['p2'].setValue("Computer");
    this.computer = true;
    this.help = false;
    this.start = false;
  }

  helper(){
    this.help = true;
    this.start = false;

  }

  multiP(){
    this.form.controls['p2'].setValue("");
    this.start = false;
    this.computer = false;
    this.help = false;
  }

  createRange(){
    for(var i = 1; i <= this.nbAllumettes; i++){
      this.items.push(i);
    }
    return this.items;
  }
}
