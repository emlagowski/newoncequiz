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
      <QuestionImageCover url={question.resultImageUri} />
      {success ? <p>Taak! Mówimy o ...</p> : <p>Nope! mówimy o ...</p>}
      <button>{question.answer}</button>
      {success ? (
        <p>Dopisujemy do Twojego konta ....</p>
      ) : (
        <p>Może kolejnym razem Ci się uda! Powodzenia!</p>
      )}
      <button className="primary" onClick={onNextQuestion}>KOLEJNE PYTANIE!</button>
    </div>
  );
};
