import "./conveyor.scss"


const Conveyor = ({rollerNum, className}) => {

  return (
    
    
    <div
      className={`conveyor ${className}`}
      data-running={"backward"}
    >
          {Array.from({length: rollerNum}, (_, i) => <span key={`roller-${i}`}></span>)}
    </div>

  );
};

export default Conveyor;