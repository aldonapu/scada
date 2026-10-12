

import "./plc.scss";

const modules = (data) => {return [
  { id: 1, name: "Driver", type: "dvrSts", status: data?.dvrSts },
  { id: 2, name: "COM", type: "communication", status: data?.comSts },
  { id: 3, name: "Online", type: "Online", status: data?.online },
  { id: 4, name: "Error", type: "Error", status: data?.err },
]}

    

function PLC({ data, style }) {
  const status = (
        data?.dvrSts && data?.comSts && data?.online && data?.err ? "RED"
        : data?.dvrSts && data?.comSts && data?.online ? "GREEN"
        : data?.dvrSts && data?.comSts ? "YELLOW"
        : data?.dvrSts ? "GRAY"
        : "WHITE"
      )

  return (
    <div className="plc-wrapper" style={{...style}} data-status={status}>
      <div className="plc-rack">
        <div className="plc-modules">
          {modules(data).map((module) => (
            <div
              className={`plc-module ${module.type}`}
              key={module.id}
            >
              <div className="module-top">
                <span>{module.name}</span>
                <span
                  className={`module-led ${
                    module.status ? "active" : "inactive"
                  }`}
                />
              </div>

              <div className="module-body">
                <div className="module-label">
                  {module.id.toString().padStart(2, "0")}
                </div>

                <div className="module-slots">
                  {Array.from({ length: 12 }, (_, index) => (
                    <span
                      key={index}
                      className={`slot ${
                        module.status && index % 3 === 0
                          ? "slot-active"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="module-bottom" />
            </div>
          ))}
        </div>

        <div className="plc-bottom-rail" />
      </div>
    </div>
  );
}

export default PLC;