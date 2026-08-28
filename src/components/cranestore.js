import { Card } from "primereact/card";
import "./cranestore.scss";
import LedIndicator from "./Led";

const CraneStore = ({label,data, type}) => {



  return (
    <Card className="C-CraneStore">
        <div className="metric-header">
          <span>{label}</span>
          <span className="metric-value">{data?.idx}</span>
        </div>

   
        <div className="metric-content">
          <div className="status">
            <span>{data?.idx}</span>

            <div className="info">
              <span>{data?.idx}</span>
              <button className="status-button">
                Reset
              </button>
            </div>
          </div>

        <div className="indikator">

                <LedIndicator
                    status={data?.enable === 1 ? true : false}
                    label="Stn Enable"
                />

                <LedIndicator
                    status={data?.pltRdy === 1 ? true : false}
                    label= {data?.pltRdy === 1 ? "Pallet Ready" : "No Pallet"}
                />

                <LedIndicator
                    status={type === "in" ? (data?.storeInRdy === 1 ? true : false ) : (data?.storeOutRdy === 1 ? true : false)}
                    label={type === "in" ? "Store-in Ready" : "Store-out Ready"}
                />

        </div>

    </div>
    <div className="transaction-info">
        <div className="transaction-ID">
            <span>Transaction Id</span>
            <input type="text" value={data?.transId} readOnly    />
        </div>
        <div className="transaction-ID">
            <span>Source</span>
            <input type="text" value={data?.src} readOnly    />
        </div>
    </div>
        <div className="transaction-info">
        <div className="transaction-ID">
            <span>Pallet ID</span>
            <input type="text" value={data?.pltId} readOnly    />
        </div>
        <div className="transaction-ID">
            <span>Destination</span>
            <input type="text" value={data?.dest} readOnly    />
        </div>
    </div>
    <div className="transaction-status-store">
        <input type="text" value={data?.errDesc} readOnly    />
    </div>
      </Card>
  );
};

export default CraneStore;