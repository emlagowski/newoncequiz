import { QuestionImageCover } from "./components/questionImageCover/QuestionImageCover";
import { Question } from "./GamePage";

interface QuestionSummaryPageParams {
  success: boolean;
  question: Question;
  onNextQuestion: () => void;
}

export const QuestionSummaryPage = (params: QuestionSummaryPageParams) => {
  const { success, question, onNextQuestion } = params;

  return (
    <div>
      <QuestionImageCover url={question.resultImageUri}/>
      {success ? <p>Taak! Mówimy o ...</p> : <p></p>}
      <button>{question.answer}</button>
      <p>Dopisujemy do Twojego konta ....</p>
      <button onClick={onNextQuestion}>KOLEJNE PYTANIE!</button>
    </div>
  );
};
