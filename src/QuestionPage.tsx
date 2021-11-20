import { useCallback, useEffect, useState } from "react";
import { QuestionImageCover } from "./components/questionImageCover/QuestionImageCover";
import { QuestionTextCover } from "./components/questionTextCover/QuestionTextCover";
import { Question } from "./GamePage";

interface QuestionPageParams {
  question: Question;
  questionsCount: number;
  onSuccess: (points: number) => void;
  onFailure: () => void;
}

export const QuestionPage = (params: QuestionPageParams) => {
  const { question, onSuccess, onFailure, questionsCount } = params;
  const [questionVariant, setQuestionVaraint] = useState(3);
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    var timeoutVal = 20;
    const timeout = setInterval(() => {
      timeoutVal -= 0.01;
      setTimer(timeoutVal);
      if (timeoutVal < 0) {
        clearTimeout(timeout);
        onFailure();
      }
    }, 10);

    return () => {
      clearTimeout(timeout);
    };
  }, [onFailure]);

  const onEasier = useCallback(() => {
    setQuestionVaraint(questionVariant - 1);
  }, [questionVariant]);

  const onAnswerSelected = useCallback((selectedValue) => {
    if (selectedValue === question.answer) {
      onSuccess(questionVariant);
    } else {
      onFailure();
    }
  }, [onFailure, onSuccess, question.answer, questionVariant]);

  return (
    <div className="answers">
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{
            fontSize: "24px",
            color: timer < 7  ?'red' : 'black'
          }}>
            {timer.toFixed(2).replace('.', ':')} s.
          </p>
        </div>
        <div>
          <p>pytanie {question.number}/{questionsCount}</p>
        </div>


      </div>
      {
        {
          3: (
            <div>
              <QuestionTextCover text={question.article} />
              <div className="row primary"><p>pytanie za {questionVariant} punkty</p></div>
              <h2 style={{margin: "2px"}} >O kim mówi artykuł z newonce?</h2>
            </div>
          ),
          2: (
            <div>
              <QuestionImageCover url={question.coverUri} blurred={true} />
              <div className="row primary"><p>pytanie za {questionVariant} punkty</p></div>
              <h2 style={{margin: "2px"}} >Kogo to album?</h2>
            </div>
          ),
          1: (
            <div>
              <QuestionTextCover text={question.randomSong} />
              <div className="row primary"><p>pytanie za {questionVariant} punkty</p></div>
              <h2 style={{margin: "2px"}} >To piosenka...?</h2>
            </div>
          ),
        }[questionVariant]
      }

      {questionVariant > 1 && (
        <button className="primary" onClick={onEasier} style={{marginBottom: "16px"}}>
          YYY... PODPOWIEDŹ!
        </button>
      )}

      {question.possibleAnswers.map((possibleAnswer) => {
        return (
          <button key={possibleAnswer} onClick={() => onAnswerSelected(possibleAnswer)}>
            {possibleAnswer}
          </button>
        );
      })}
    </div>
  );
};
