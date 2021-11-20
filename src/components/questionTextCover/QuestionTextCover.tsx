import "./QuestionTextCover.css"

export const QuestionTextCover = (props: {
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