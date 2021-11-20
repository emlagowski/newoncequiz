import "./QuestionCover.css"

export const QuestionCover = (props: {
    text: string
}) => {
    return (
        <div className="row">
        <div className={"question-cover-wrapper"}>
            <p>"{props.text}"</p>
        </div>
        </div>
    )
}