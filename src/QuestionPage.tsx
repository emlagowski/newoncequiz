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
  }, [])

  return (
    <div>
      <p>pytanie {question.number}</p>

      {
        {
          3: <QuestionTextCover text={question.article}/>,
          2: <p>{question.coverUri}</p>,
          1: <QuestionTextCover text={question.randomSong}/>,
        }[questionVariant]
      }

      <p>pytanie za 3 punkty</p>
      <h1>O kim mówi artykuł z newonce?</h1>

      {question.possibleAnswers.map((possibleAnswer) => {
        return (
          <button onClick={() => onAnswerSelected(possibleAnswer)}>
            {possibleAnswer}
          </button>
        );
      })}

      <button className="primary" onClick={onEasier}>
        YYY... PODPOWIEDŹ!
      </button>
    </div>
  );
};
