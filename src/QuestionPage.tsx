import { useCallback, useState } from "react";
import { Question } from "./GamePage";

interface QuestionPageParams {
  question: Question;
}

export const QuestionPage = (params: QuestionPageParams) => {
  const [questionVariant, setQuestionVaraint] = useState(3);

  const onEasier = useCallback(() => {
    setQuestionVaraint(questionVariant - 1);
  }, [])

  return (
    <div>
      <p>pytanie {params.question.number}/10</p>
    
      
      <p>{params.question.article}</p>
      <p>pytanie za 3 punkty</p>
      <h1>O kim mówi artykuł z newonce?</h1>

      {params.question.possibleAnswers.map((possibleAnswer) => {
        return <button>{possibleAnswer}</button>;
      })}

      <button className="primary">YYY... PODPOWIEDŹ!</button>
    </div>
  );
};
