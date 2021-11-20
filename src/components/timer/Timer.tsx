export const Timer = (props:{
    val: number
    min?: number
    max?: number
}) => {
    return (
    <div style={{width: "100%", position: "relative"}}>
        <p style={{ position: "absolute", right: -40 + (props.val * 30), top: -60}}>🍆</p>
    </div>
    )
}