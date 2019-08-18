import { Component } from '@angular/core';
import { MessageService } from "../message/message.service";
import { Result } from "../../shared/models/result.model";
import { AnswerService } from "../../shared/services/answer.service";
import { StateService } from "../../shared/services/state.service";
import { State } from "../../shared/models/state.model";
import { Router } from "@angular/router";
import { GuessType } from "../../shared/models/guess-type.model";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent {
  private baseUrl = 'api/answer';
  private imageDirectory: string = 'assets/images';
  private result = new Result();
  private isQuestionPicture = true;

  constructor(private answerService: AnswerService, private stateService: StateService, private router: Router, private messageService: MessageService) {
    answerService.getResult()
      .subscribe(data => {
        this.result = data;
        this.isQuestionPicture = GuessType.GuessNameType === this.result.guessType;
      })
  }

  restart() {
    this.stateService.setState(State.StartState)
      .subscribe(date => {
          this.router.navigateByUrl('/start');
        }
      );
  }

  isSkippedVisible() {
    return this.result.skippedAnswers > 0;
  }

  isErrorDetailsListVisible() {
    return this.result.errorDetailsList && (this.result.errorDetailsList.length > 0);
  }
}
