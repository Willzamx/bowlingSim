import { Component, OnInit } from '@angular/core';
import FrameScoreData from 'FrameScores.json';

interface BowlingFrame {
  Frame: number;
  Roll1: number;
  Roll2: number;
  Roll3?: number | undefined;
  Score: number;
}

@Component({
  selector: 'app-frame-grid',
  templateUrl: './frame-grid.component.html',
  styleUrls: ['./frame-grid.component.scss']
})
export class FrameGridComponent implements OnInit {

  bowlingFrames: BowlingFrame[] = FrameScoreData; 
  finalScore: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.bowlingFrames.forEach(currentFrame => {
      if(currentFrame.Frame == 10) {
        currentFrame.Score = this.FrameTenCalc(currentFrame);
      }
      else {
        //if strike on current frame add next two rolls
        if(currentFrame.Roll1 == 10) { 
          currentFrame.Score = this.FrameStrikeCalc(currentFrame);
        }
        //if spare add roll1 from next frame
        else if(currentFrame.Roll1 + currentFrame.Roll2 == 10) {
          currentFrame.Score = this.FrameSpareCalc(currentFrame);
        }
        //add roll1 and roll2 for frame score
        else {
          this.finalScore +=  currentFrame.Roll1 + currentFrame.Roll2;
          currentFrame.Score =  this.finalScore;
        }
      }
    })
  }

  FrameTenCalc(currentFrame: BowlingFrame): number {
    //frame 10 to add a third roll if strike or spare in first two rolls
    if(currentFrame.Roll1 == 10 || currentFrame.Roll1 + currentFrame.Roll2 == 10){
      this.finalScore += currentFrame.Roll1 + currentFrame.Roll2 + currentFrame.Roll3!;
    }
    else {
      this.finalScore += currentFrame.Roll1 + currentFrame.Roll2;
    }
    return this.finalScore;
  }

  FrameStrikeCalc(currentFrame: BowlingFrame): number {
    //if multiple strikes add the following frames roll
    if(this.bowlingFrames[currentFrame.Frame].Roll1 == 10) {
      this.finalScore += currentFrame.Roll1 + this.bowlingFrames[currentFrame.Frame].Roll1 + this.bowlingFrames[currentFrame.Frame + 1].Roll1
    }
    else {
      this.finalScore += currentFrame.Roll1 + this.bowlingFrames[currentFrame.Frame].Roll1 + this.bowlingFrames[currentFrame.Frame].Roll2;
    }
    return this.finalScore;
  }

  FrameSpareCalc(currentFrame: BowlingFrame): number {
    this.finalScore +=  currentFrame.Roll1 + currentFrame.Roll2 + this.bowlingFrames[currentFrame.Frame].Roll1;
    return this.finalScore;
  }
}
