import { url } from "inspector"
import "./QuestionImageCover.css"

export const QuestionImageCover = (props: {
    url: string
}) => {
    return (
        <div className="row">
        <div className={"question-cover-wrapper"} style={{backgroundImage: `url(${props.url})`, backgroundPosition: "center", backgroundSize: "cover"}}>
        </div>
        </div>
    )
}