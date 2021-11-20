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
    var timeoutVal = 20
    const timeout = setInterval(() => {
      timeoutVal -= 0.01
      setTimer(timeoutVal)
      if(timeoutVal<0){
        clearTimeout(timeout)
        onFailure()
      }
    },10)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const onEasier = useCallback(() => {
    setQuestionVaraint(questionVariant - 1);
  }, [questionVariant]);

  const onAnswerSelected = useCallback((selectedValue) => {
    if (selectedValue === question.answer) {
      onSuccess(questionVariant);
    } else {
      onFailure();
    }
  }, []);

  return (
    <div className="answers">
      <div style={{display: "flex", flexDirection: "row-reverse"}}>
        <p>pytanie {question.number}/{questionsCount}</p>
      </div>
      {
        {
          3: (
            <div>
              <QuestionTextCover text={question.article} />
              <div className="row primary"><p>pytanie za {questionVariant} punkty</p></div>
              <h2>O kim mówi artykuł z newonce?</h2>
            </div>
          ),
          2: (
            <div>
              <QuestionImageCover url={question.coverUri} blurred={true}/>
              <div className="row primary"><p>pytanie za {questionVariant} punkty</p></div>
              <h2>Kogo to album?</h2>
            </div>
          ),
          1: (
            <div>
              <QuestionTextCover text={question.randomSong} />
              <div className="row primary"><p>pytanie za {questionVariant} punkty</p></div>
              <h2>To piosenka...?</h2>
            </div>
          ),
        }[questionVariant]
      }

      <div className="row"><p style={{ fontSize: "24px" }}>{timer.toFixed(2).replace('.',':')}</p></div>
      {questionVariant > 1 && (
        <button className="primary" onClick={onEasier}>
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
