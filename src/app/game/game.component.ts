import { Component, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  //@Input() nbAllumettes: number;
  @Input() items: number[] = [];
  @Input() p1: string;
  @Input() p2: string;
  @Input() computer: boolean;
  player1:boolean = Math.random() >= 0.5 ? true : false;
  player2:boolean = ! this.player1;

  @Input() events: Observable<void>;
  winner = "";
  computerNb = "";

  ngAfterViewInit()	{
    
    this.events.subscribe(() => {
      if (this.computer && this.player2) {
        this.removeComputer();
      }
    })
  }

  /**
   * removeMatches
   * Funtion that delete matches using the given number
   * @param {number} numb
   */
  removeMatches(numb) {
    for(var i = 1; i <= numb; i++){
      this.items.pop();
    }
    //change the player
    this.player1 = !this.player1;
    this.player2 = !this.player2;
    //condition to get the winner
    if (this.items.length === 0 && this.player2 === true) {
      this.winner = this.p1;
      this.stopGame();
      this.computerNb = "";
    }else{
      if (this.items.length === 0 && this.player1 === true) {
        this.winner = this.p2;
        this.stopGame();
        this.computerNb = "";
      }
    }
    //call removeComputer when computer is playing
    if (this.computer && this.items.length !== 0) {
      setTimeout(() => {
        console.log('Test');
        this.removeComputer();
      }, 2000);
    }
  }

  /**
   * removeComputer
   * Funtion that delete matches when the computer is playing
   */
  removeComputer() {
    let x:number;
    if (this.items.length > 3) {
      x = Math.floor(Math.random() * 3) + 1;
    } else {
      x = Math.floor(Math.random() * this.items.length) + 1;
    }
    for(var i = 1; i <= x; i++){
      this.items.pop();
    }

    //show the choice of the computer
    this.computerNb = "The computer choose : "+ x;
    //change the player
    this.player1 = !this.player1;
    this.player2 = !this.player2;

    //condition to get the winner
    if (this.items.length === 0 && this.player2 === true) {
      this.stopGame();
      this.winner = this.p1;
      this.computerNb = "";
    }
    if (this.items.length === 0 && this.player1 === true) {
      this.winner = this.p2;
      this.stopGame();
      this.computerNb = "";
    }
  }

  stopGame(){
    this.player1 = Math.random() >= 0.5 ? true : false;
    this.player2 = ! this.player1;
  }

}
