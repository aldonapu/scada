import "./conveyor.scss"


const Conveyor = ({rollerNum, className, data}) => {
//dvrSts=1, comsts=1, online=1
  const status = (
    data?.dvrSts && data?.comSts && data?.online && data?.err ? "RED"
    : data?.dvrSts && data?.comSts && data?.online ? "GREEN"
    : data?.dvrSts && data?.comSts ? "YELLOW"
    : data?.dvrSts ? "GRAY"
    : "WHITE"
  )

  return (
    <div
      className={`conveyor ${className}`}
      data-running={data?.runFwd === 1 ? "forward" : data?.runBwd === 1 ? "backward" : null}
      data-status={status}
    >
          {Array.from({length: rollerNum}, (_, i) => <span key={`roller-${i}`}></span>)}
    </div>

  );
};

export default Conveyor;