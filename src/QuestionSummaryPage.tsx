import { relative } from "path/posix";
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
    <div style={{display: "flex", flexDirection: "column"}}>
      <img src={`/Vector${success ? '2' : '1'}.png`} style={{position: "absolute", left: 0, top: 0, zIndex:-1}}/>
      <div style={{position: "relative"}}>
      <QuestionImageCover url={question.resultImageUri} />
      <div style={{ 
        position: "absolute",
        backgroundColor: "white",
        
        right: -12,
        bottom: -12,
        padding: "12px",
        borderRadius: "100%",
        boxShadow: `4px 4px 0px ${success ? '#1300E8' : '#666'}`
        }}>
          <div style={{
              backgroundImage: `url('/${success ? 'happy' : 'sad'}.png')`,
              backgroundSize: "cover",
              width: "48px",
              height: "48px",
          }}/>
      </div>
      </div>
      {success ? <h2>Taak! Mówimy o ...</h2> : <h2>Nope! mówimy o ...</h2>}
      <button>{question.answer}</button>
      {success ? (
        <p className="primary" style={{flex: 1, marginBottom: "24px"}}>Dopisujemy do Twojego konta ....</p>
      ) : (
        <p className="primary" style={{flex: 1, marginBottom: "24px"}}>Może kolejnym razem Ci się uda! Powodzenia!</p>
      )}
      <button className="primary" onClick={onNextQuestion} style={{marginBottom: "16px"}}>KOLEJNE PYTANIE!</button>
      <button onClick={onNextQuestion}>zobacz ranking (todo)</button>
    </div>
  );
};
