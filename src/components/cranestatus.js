
import { Card } from "primereact/card";
import "./cranestatus.scss";
import LedIndicator from "./Led";

const CraneStatus = ({ label, data }) => {
  console.log(data)
  return (
    <Card className="C-CraneStatus">
      {/* Header */}
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        <span className="metric-value">[AUTOMATIC]</span>
        <span className="metric-value">{data?.idx}</span>
      </div>



      {/* Indicators */}
      <div className="indicator-section">
        <LedIndicator status={data?.dvrSts === 1? true : false} label="Driver Running" />
        <LedIndicator status={true} label="Connected" />
        <LedIndicator status={data?.online === 1? true : false} label="Online" />
        <LedIndicator status={data?.run === 1 ? true : false} label="Running" />
        <LedIndicator status={data?.err === 1 ? true : false} label="Error" />
      </div>

      {/* Transaction Information */}
      <div className="transaction-grid">

        {/* Transaction ID */}
        <div className="field-group">
          <label>Transaction ID</label>
          <input type="text" value={data?.transId} readOnly />
        </div>

        {/* Source */}
        <div className="field-group label-short">
          <label>Source</label>
          <div className="multi-input">
            <input type="text" value={data?.srcBay} readOnly />
            <input type="text" value={data?.srcLvl} readOnly />
            <input type="text" value={data?.srcRow} readOnly />
          </div>
        </div>

        {/* Pallet ID */}
        <div className="field-group">
          <label>Pallet ID</label>
          <input type="text" value={data?.pltId} readOnly />
        </div>

        {/* Destination */}
        <div className="field-group label-short">
          <label>Destination</label>
          <div className="multi-input">
            <input type="text" value={data?.destBay} readOnly />
            <input type="text" value={data?.destLvl} readOnly />
            <input type="text" value={data?.destRow} readOnly />
          </div>
        </div>

        {/* Current Position */}
        <div className="field-group-1">
          <label>Current Pos(mm)</label>
          <div className="multi-input">
            <input type="text" value="092" readOnly />
            <input type="text" value="10" readOnly />
            <input type="text" value="0" readOnly />
          </div>
        </div>

        {/* Current Position 2 */}
        <div className="field-group label-short">
          <label>Current Poss</label>
          <div className="multi-input">
            <input type="text" value="16480" readOnly />
            <input type="text" value="16590" readOnly />
            <input type="text" value="Center" readOnly />
          </div>
        </div>

        {/* Task */}
        <div className="field-group task-group">
          <label>Task No / Stage</label>

          <div className="task-input">
            <input type="text" value={data?.taskNo} readOnly />
            <input type="text" value={data?.stage} readOnly className="standby"/>
          </div>
        </div>
      </div>

      {/* Bottom Indicators */}
      <div className="bottom-section">
        <div className="indicator-section bottom-indicator">
          <LedIndicator status={false} label="Load Present" />
          <LedIndicator status={data?.pickFinish === 1 ? true : false} label="Pick Finish" />
          <LedIndicator status={false} label="Delivery Finsih" />
          <LedIndicator status={data?.taskFinish === 1 ? true : false} label="Task Finish" />
  
        </div>

        <div className="counter-section">
          <input type="text" value="0" readOnly />
          <input type="text" value="0" readOnly />
        </div>
      </div>

      {/* Error Status */}
      <div className="transaction-status">
        <input type="text" value="0" readOnly />
        <input type="text" value="No Error" readOnly />
      </div>
    </Card>
  );
};

export default CraneStatus;

