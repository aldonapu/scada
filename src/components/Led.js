import "./led.scss";
const LedIndicator = ({ status, label }) => {
  return (
    <div className="led-indicator">
      
      <div
        className={`led`}
        data-status={status}

      >
        <span></span>
      </div>

      <div className="led-label">
        {label}
      </div>

    </div>
  );
};

export default LedIndicator;