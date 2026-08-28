import React, { useState } from "react";
import "./plc.scss";

const Led = ({ active, label }) => {
  return (
    <div className="plc-led-item">
      <span
        className={`plc-led ${active ? "plc-led--on" : ""}`}
      ></span>

      <span className="plc-led-label">
        {label}
      </span>
    </div>
  );
};

const PlcControl = () => {
  const [driverRunning, setDriverRunning] = useState(true);
  const [connected, setConnected] = useState(true);

  const handleStart = () => {
    setDriverRunning(true);
  };

  const handleStop = () => {
    setDriverRunning(false);
  };

  const handleReset = () => {
    setDriverRunning(false);
  };

  const handleEmergency = () => {
    setDriverRunning(false);
  };

  return (
    <div className="plc-control">

      {/* FROM - TO ATAS */}
      <div className="route-row">
        <span>From</span>

        <input type="text" readOnly/>

        <span>To</span>

        <input type="text" readOnly/>
      </div>


      {/* PLC PANEL */}
      <div className="plc-panel">

        {/* KIRI - PLC */}
        <div className="plc-machine">

          <div className="plc-machine-image">

            <div className="plc-slots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

          <div className="plc-name">
            PLC 25-Crane 11 Station
          </div>

        </div>


        {/* LED STATUS */}
        <div className="plc-status">

          <Led
            active={driverRunning}
            label="Driver Running"
          />

          <Led
            active={connected}
            label="Connected"
          />

        </div>


        {/* EMERGENCY */}
        <button
          className="emergency-button"
          onClick={handleEmergency}
        >


          <span className="emergency-circle">
            
          </span>

          <span className="emergency-stop">
           STOP
          </span>
        </button>

      </div>


      {/* BUTTON */}
      <div className="plc-buttons">

        <button onClick={handleStart}>
          Start
        </button>

        <button onClick={handleStop}>
          Stop
        </button>

        <button onClick={handleReset}>
          Reset
        </button>

        <button
          className="estop-button"
          onClick={handleEmergency}
        >
          E-Stop
        </button>

      </div>


      {/* FROM - TO BAWAH */}
      <div className="route-row route-row--bottom">

        <span>From</span>

        <input type="text" readOnly/>

        <span>To</span>

        <input type="text" readOnly />

      </div>

    </div>
  );
};

export default PlcControl;