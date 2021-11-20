import "./QuestionImageCover.css"

export const QuestionImageCover = (props: {
    url: string
    blurred?: boolean 
}) => {
    return (
        <div className="row">
            <div className={"question-cover-wrapper"} style={{
                backgroundImage: `url(${props.url})`,
                backgroundPosition: "center",
                backgroundSize: "cover", 
                filter: props.blurred ? "blur(10px)" : ""
                }}/>
        </div>
    )
}