import { RankItem } from "./components/rankItem/RankItem"

export const RankPage = (props: {}) => {
    return (
        <div>
            <h2 className="primary">W rankingu dziennym zajmujesz:</h2>
            <div>
            <RankItem
                name="Karol"
                place={1}
                points={534523} />
            </div>
            <h2>...</h2>
            <div style={{width: "90%"}}></div>
            <RankItem
                name="Karol"
                place={234}
                points={42425}/>
            <div style={{width: "80%"}}>
            <RankItem
                active={true}
                name="Marcin"
                place={233}
                points={2345} />
                </div>
            <div style={{width: "60%"}}>
            <RankItem
                name="Karol"
                place={234}
                points={42425} />
                </div>
        </div>
    )
}