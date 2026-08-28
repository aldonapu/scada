
import "./crane.scss"

const Crane = ({label}) =>{
    return(
    <div className="cranenumber">
        <span>Crane {label}</span>
        <div className="cranemodel">
            <div className="batang1"></div>
            <div className="batang2"><span>{label}</span></div>
            <div className="batang3"></div>
        </div>
    </div>
    )
}

export default Crane