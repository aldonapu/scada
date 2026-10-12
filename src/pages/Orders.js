import { useEffect, useState } from "react";
import axios from "axios";
import Conveyor from "../components/conveyor";
import Crane from "../components/crane";
import PlcControl from "../components/plc";
import "./Orders.scss";

const apiUrl = "https://scada.skripsiin.workers.dev/api/";

export default function Orders() {
    const [cranes, setCranes] = useState([]);
    const [conveyors, setConveyors] = useState([]);
    const [plcs, setPlcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadEquipment = async () => {
            try {
                const response = await axios.post(
                    `${apiUrl}status/all`,
                    {},
                    {
                        headers: { "Content-Type": "application/json" },
                        signal: controller.signal
                    }
                );
                const equipment = response.data?.data;

                if (
                    !Array.isArray(equipment?.cr) ||
                    !Array.isArray(equipment?.cv) ||
                    !Array.isArray(equipment?.plc)
                ) {
                    throw new Error("Data crane, conveyor, dan PLC tidak tersedia.");
                }

                setCranes(equipment.cr);
                setConveyors(equipment.cv);
                setPlcs(equipment.plc);
            } catch (loadError) {
                if (!axios.isCancel(loadError)) {
                    setError(loadError.message || "Gagal memuat status crane, conveyor, dan PLC.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        loadEquipment();
        return () => controller.abort();
    }, []);

    const lineCount = Math.max(cranes.length, Math.ceil(conveyors.length / 4), Math.ceil(plcs.length / 2));

    return (
        <div className="page orders-page">
            <header className="page__header">
                <div>
                    <p className="page__eyebrow">Plant overview</p>
                    <h1>Conveyor &amp; Crane</h1>
                </div>
                <div className="orders-page__summary">
                    <span className="orders-page__summary-dot" />
                    {loading ? "Loading equipment" : error ? "Status unavailable" : "Live equipment status"}
                </div>
            </header>

            {error && (
                <div className="orders-page__message orders-page__message--error" role="alert">
                    <i className="pi pi-exclamation-circle" aria-hidden="true" />
                    <span>{error}</span>
                </div>
            )}

            {loading && !error && (
                <div className="orders-page__message" role="status">
                    <i className="pi pi-spin pi-spinner" aria-hidden="true" />
                    <span>Loading crane, conveyor, and PLC status…</span>
                </div>
            )}

            {!loading && !error && lineCount === 0 && (
                <div className="orders-page__message">
                    No cranes, conveyors, or PLCs were returned by the controller.
                </div>
            )}

            {!loading && !error && lineCount > 0 && (
                <section className="orders-overview" aria-label="All crane, conveyor, and PLC lines">
                    {Array.from({ length: lineCount }, (_, lineIndex) => {
                        const crane = cranes[lineIndex];
                        const lineConveyors = conveyors.slice(lineIndex * 4, lineIndex * 4 + 4);

                        return (
                            <article className="orders-line" key={crane?.idx ?? `line-${lineIndex + 1}`}>
                                <div className="orders-line__heading">
                                    <div>
                                        <span className="orders-line__eyebrow">Material handling line</span>
                                        <h2>{crane ? `Crane ${crane.idx ?? lineIndex + 1}` : `Line ${lineIndex + 1}`}</h2>
                                    </div>
                                    {crane && (
                                        <span className={`orders-line__state ${crane.online ? "is-online" : "is-offline"}`}>
                                            <span />
                                            {crane.online ? "Online" : "Offline"}
                                        </span>
                                    )}
                                </div>

                                <div className="orders-line__plc">
                                    <span className="orders-line__plc-label">
                                        PLC {plcs[lineIndex * 2]?.idx ?? lineIndex * 2 + 1}
                                    </span>
                                    {plcs[lineIndex * 2] ? (
                                        <PlcControl data={plcs[lineIndex * 2]} />
                                    ) : (
                                        <div className="orders-line__plc-placeholder">PLC unavailable</div>
                                    )}
                                </div>

                                <div className="orders-line__diagram">
                                    <div className="orders-line__conveyors orders-line__conveyors--left">
                                        {lineConveyors.slice(0, 2).map((conveyor, index) => (
                                            <div className="orders-conveyor" key={conveyor.idx ?? index}>
                                                <span className="orders-conveyor__label">CV {conveyor.idx ?? lineIndex * 4 + index + 1}</span>
                                                <Conveyor data={conveyor} rollerNum={7} className="" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="orders-line__crane">
                                        {crane ? (
                                            <Crane data={crane} label={crane.idx ?? lineIndex + 1} />
                                        ) : (
                                            <div className="orders-line__crane-placeholder">Crane unavailable</div>
                                        )}
                                    </div>

                                    <div className="orders-line__conveyors orders-line__conveyors--right">
                                        {lineConveyors.slice(2, 4).map((conveyor, index) => (
                                            <div className="orders-conveyor" key={conveyor.idx ?? index + 2}>
                                                <span className="orders-conveyor__label">CV {conveyor.idx ?? lineIndex * 4 + index + 3}</span>
                                                <Conveyor data={conveyor} rollerNum={7} className="rotate-180" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="orders-line__plc">
                                    <span className="orders-line__plc-label">
                                        PLC {plcs[lineIndex * 2 + 1]?.idx ?? lineIndex * 2 + 2}
                                    </span>
                                    {plcs[lineIndex * 2 + 1] ? (
                                        <PlcControl data={plcs[lineIndex * 2 + 1]} />
                                    ) : (
                                        <div className="orders-line__plc-placeholder">PLC unavailable</div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </section>
            )}
        </div>
    );
}
