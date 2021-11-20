import { QuestionImageCover } from "./components/questionImageCover/QuestionImageCover";
import { Question } from "./GamePage";

interface QuestionSummaryPageParams {
  success: boolean;
  question: Question;
  onNextQuestion: () => void;
  questionPoints: number;
}

export const QuestionSummaryPage = (params: QuestionSummaryPageParams) => {
  const { success, question, onNextQuestion, questionPoints } = params;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img
        src={`/Vector${success ? "2" : "1"}.png`}
        style={{ position: "absolute", left: 0, top: 0, zIndex: -1 }}
        alt=""
      />
      <div style={{ position: "relative" }}>
        <QuestionImageCover url={question.resultImageUri} />
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            right: -12,
            bottom: -12,
            padding: "12px",
            borderRadius: "100%",
            boxShadow: `4px 4px 0px ${success ? "#1300E8" : "#666"}`,
          }}
        >
          <div
            style={{
              backgroundImage: `url('/${success ? "happy" : "sad"}.png')`,
              backgroundSize: "cover",
              width: "24px",
              height: "24px",
            }}
          />
        </div>
        {success && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: "120px",
              height: "120px",
              left: -24,
              top: -24,
              borderRadius: "100%",
              boxShadow: "4px 4px 0px #1300E8",
              display: "flex",
              justifyContent: "center",
              fontSize: "44px",
              color: "rgb(19, 0, 232)",
              lineHeight: "128px",
            }}
          >
            + {questionPoints}
          </div>
        )}
      </div>
      <h2>{success ? "Taak! Mówimy o ..." : "Nope! mówimy o ..."}</h2>
      <button>{question.answer}</button>
      {success ? (
        <p className="primary" style={{ flex: 1, marginBottom: "24px" }}>
          Dopisujemy do Twojego konta ....
        </p>
      ) : (
        <p className="primary" style={{ flex: 1, marginBottom: "24px" }}>
          Może kolejnym razem Ci się uda! Powodzenia!
        </p>
      )}
      <button
        className="primary"
        onClick={onNextQuestion}
        style={{ marginBottom: "16px" }}
      >
        KOLEJNE PYTANIE!
      </button>
    </div>
  );
};
