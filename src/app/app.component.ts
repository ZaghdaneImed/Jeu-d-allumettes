import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

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
  player1:boolean = true;
  player2:boolean = false;
  turn:string;
constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      p1: ['', [Validators.required]],
      p2: ['', [Validators.required]],
      nbAllumettes: ['', [Validators.required]],
      turn: ['', [Validators.required]]
    },{validator: MyAwesomeRangeValidator})  // key is to validate on the form group)
    this.form.controls['nbAllumettes'].setValue(4);
    this.form.controls['turn'].setValue("1");
  }

  startGame(){
    this.p1 = this.form.get("p1").value;
    this.p2 = this.form.get("p2").value;
    this.nbAllumettes = this.form.get("nbAllumettes").value;
    console.log(this.form.get("turn").value);
    this.start = true;
    this.help = false;
    this.items = [];
    this.items = this.createRange();
    this.player1 = this.form.get("turn").value == "1" ? true : false;
    this.player2 = !this.player1;
  }

  vsComputer(){
    this.form.controls['p2'].setValue("Computer");
    this.computer = true;
    this.help = false;
  }

  helper(){
    this.help = true;
    this.start = false;

  }

  multiP(){
    this.form.controls['p2'].setValue("");
    this.computer = false;
    this.help = false;
  }

  createRange(){
    console.log(this.nbAllumettes);
    
    for(var i = 1; i <= this.nbAllumettes; i++){
      this.items.push(i);
    }
    return this.items;
  }
}
