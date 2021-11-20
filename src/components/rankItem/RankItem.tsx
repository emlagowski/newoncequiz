import "./RankItem.css"

export const RankItem = (props: {
    name: string,
    place: number,
    points: number,
    active?: boolean
}) => {
    const act = props.active ? "active" : ""

    return (
        <div className={`wrapper ${act}`}>
            <div className={`place ${act}`}>{props.place} miejsce</div>
            <div className="flexrow"><p>{props.name}</p><p>{props.points}</p></div>
        </div>
    )
}