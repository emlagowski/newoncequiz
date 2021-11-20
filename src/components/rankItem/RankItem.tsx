import "./RankItem.css"

export const RankItem = (props: {
    name: string,
    place: number,
    points: number,
    active?: boolean
    price?: boolean
}) => {
    const act = props.active ? "active" : ""

    return (
        <div className={`wrapper ${act}`}>
            <div className={`place ${act}`}>{props.place} miejsce</div>
            {props.price &&
                <div className={`price ${act}`}>szansa na nagrodę</div>
            }
            {/* {props.price &&
                <div
                    style={{
                        position: "absolute",
                        backgroundColor: "white",
                        right: -24,
                        top: -72,
                        padding: "24px",
                        borderRadius: "100%",
                        boxShadow: `4px 4px 0px #1300E8`,
                        border: "1px solid #1300E8",
                        zIndex: -1,
                    }}
                >
                    <div
                        style={{
                            backgroundImage: `url('/coolicon.png')`,
                            backgroundSize: "cover",
                            width: "32px",
                            height: "32px",
                            
                        }}
                    />
                </div>
            } */}
            <div className="flexrow"><p>{props.name}</p><p>{props.points}</p></div>
        </div>
    )
}