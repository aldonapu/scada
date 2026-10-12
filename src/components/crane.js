
import "./crane.scss"

const Crane = ({label, data}) =>{

    const status = (
        data?.dvrSts && data?.comSts && data?.online && data?.err ? "RED"
        : data?.dvrSts && data?.comSts && data?.online ? "GREEN"
        : data?.dvrSts && data?.comSts ? "YELLOW"
        : data?.dvrSts ? "GRAY"
        : "WHITE"
      )

    return(
    <div className="cranenumber">
        <span>Crane {label}</span>
        <div className="cranemodel" data-status={status}>
            <div className="batang1"></div>
            <div className="batang2"><span>{label}</span></div>
            <div className="batang3"></div>
        </div>
    </div>
    )
}

export default Crane