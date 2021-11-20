import { useCallback, useState } from "react";
import { QuestionTextCover } from "./components/questionTextCover/QuestionTextCover";
import { Question } from "./GamePage";

interface QuestionPageParams {
  question: Question;
  onSuccess: () => void;
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
      onSuccess();
    } else {
      onFailure();
    }
  }, []);

  return (
    <div>
      <p>pytanie {question.number}</p>

      {
        {
          3: (
            <div>
              <QuestionTextCover text={question.article} />
              <p>pytanie za {questionVariant} punkty</p>
              <h1>O kim mówi artykuł z newonce?</h1>
            </div>
          ),
          2: (
            <div>
              <p>{question.coverUri}</p>
              <p>pytanie za {questionVariant} punkty</p>
              <h1>Kogo to album?</h1>
            </div>
          ),
          1: (
            <div>
              <QuestionTextCover text={question.randomSong} />
              <p>pytanie za {questionVariant} punkty</p>
              <h1>To piosenka...?</h1>
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
