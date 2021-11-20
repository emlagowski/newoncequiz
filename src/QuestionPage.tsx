import { useCallback, useState } from "react";
import { QuestionImageCover } from "./components/questionImageCover/QuestionImageCover";
import { QuestionTextCover } from "./components/questionTextCover/QuestionTextCover";
import { Question } from "./GamePage";

interface QuestionPageParams {
  question: Question;
  onSuccess: (points: number) => void;
  onFailure: () => void;
}

export const QuestionPage = (params: QuestionPageParams) => {
  const { question, onSuccess, onFailure } = params;
  const [questionVariant, setQuestionVaraint] = useState(3);

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
        <p>pytanie {question.number}</p>
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
              <QuestionImageCover url={question.coverUri}/>
              <p>pytanie za {questionVariant} punkty</p>
              <h2>Kogo to album?</h2>
            </div>
          ),
          1: (
            <div>
              <QuestionTextCover text={question.randomSong} />
              <p>pytanie za {questionVariant} punkty</p>
              <h2>To piosenka...?</h2>
            </div>
          ),
        }[questionVariant]
      }

      {question.possibleAnswers.map((possibleAnswer) => {
        return (
          <button onClick={() => onAnswerSelected(possibleAnswer)}>
            {possibleAnswer}
          </button>
        );
      })}
      {questionVariant > 1 && (
        <button className="primary" onClick={onEasier}>
          YYY... PODPOWIEDŹ!
        </button>
      )}
    </div>
  );
};
