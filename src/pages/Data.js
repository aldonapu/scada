import "./Data.scss";
import { useState, useEffect  } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
        
import axios from "axios";

export default function Data() {
    const [plc, setPlc] = useState([]);
    const [conveyor, setConveyor] = useState([]);
    const [crane, setCrane] = useState([]);
    const [crStn, setCrStn] = useState([]);
    const [selectPlc, setSelectPlc] = useState({});
    const [selectConveyor, setSelectConveyor] = useState({});
    const [selectCrane, setSelectCrane] = useState({});
    const apiUrl = "https://scada.skripsiin.workers.dev/api/"
    useEffect(() => {
        axios.post(`${apiUrl}status/all`,
            {
                header: { 'Content-Type': 'application/json' }
            }
        )
            .then(response => {
                setPlc(response.data.data.plc);
                setConveyor(response.data.data.cv);
                setCrane(response.data.data.cr);
                setCrStn(response.data.data.crStn);

                setSelectPlc(response.data.data.plc?.[0]);
                setSelectConveyor(response.data.data.cv?.[0]);
                setSelectCrane(response.data.data.cr?.[0]);
            })
            .catch(error => {
                console.error('Error fetching PLC data:', error);
            });
    }, []);

    const confirm = (event, type, field) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleData(type, field),
            
        });
    };

    const handleData = async (type, field) => {
        const payload = {};
        if(type === 'plc'){
            payload.plc = [
                    {...selectPlc,
                        [field]: !selectPlc?.[field] 
                    }
                ]
        }
        if(type === 'cv'){
            payload.cv = [
                {...selectConveyor,
                    [field]: !selectConveyor?.[field]
                }   
            ]
        }
        if(type === 'cr'){
            const currentValue = selectCrane?.[field];
            const nextValue = typeof currentValue === "number" ? Number(!currentValue) : !currentValue;

            payload.cr = [
                {...selectCrane,
                    [field]: nextValue
                }
            ]
        }

        try{
            await axios.post(`${apiUrl}update`, payload,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            
            .then(prev => {
                if(type === 'plc'){
                    setSelectPlc(prev => ({
                        ...prev,
                        [field]: !prev?.[field]
                    }));
                    setPlc(prevPlc => prevPlc.map(plcItem => 
                    plcItem.idx === selectPlc.idx ? { ...plcItem, [field]: !plcItem?.[field] } : plcItem
                ));
                }
                if(type === 'cv'){
                    setSelectConveyor(prev => ({
                        ...prev,
                        [field]: !prev?.[field]
                    }));
                    setConveyor(prevConveyor => prevConveyor.map(conveyorItem => 
                        conveyorItem.idx === selectConveyor.idx ? { ...conveyorItem, [field]: !conveyorItem?.[field] } : conveyorItem
                    ));
                }
                if(type === 'cr'){
                    setSelectCrane(prev => prev.idx === selectCrane.idx
                        ? { ...prev, [field]: payload.cr[0][field] }
                        : prev
                    );
                    setCrane(prevCrane => prevCrane.map(craneItem =>
                        craneItem.idx === selectCrane.idx ? { ...craneItem, [field]: payload.cr[0][field] } : craneItem
                    ));
                }
            })
        }catch(err) {
            console.log(err)
        }
        
    }


    return (
         <div className="page">
            <ConfirmPopup />
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Monitoring</p>
                    <h1>Data</h1>
                </div>
            </div>

            {/* GRID CARD PLC */}
            <div className="plc-grid">

                {/* CARD PLC 1 */}
                <Card className="plc-card">
                    <div className="plc-card__header">
                        <div>
                            <p className="plc-card__eyebrow">
                                PLC Controller
                            </p>

                            <h2>PLC {selectPlc?.idx}</h2>
                        </div>

                        <span className="plc-card__badge">
                            <span className="dot"></span>
                            {selectPlc?.online ? 'Online' : 'Offline'}
                        </span>
                    </div>

                    <div className="plc-card__controls">
                        <Button label="PLC1" className="btn btn--start" onClick={() => setSelectPlc(plc?.[0])}/>
                        <Button label="PLC2" className="btn btn--start" onClick={() => setSelectPlc(plc?.[1])}/>
                        <Button label="PLC3" className="btn btn--start" onClick={() => setSelectPlc(plc?.[2])}/>
                        <Button label="PLC4" className="btn btn--start" onClick={() => setSelectPlc(plc?.[3])}/>
                        <Button label="PLC5" className="btn btn--start" onClick={() => setSelectPlc(plc?.[4])}/>
                        <Button label="PLC6" className="btn btn--start" onClick={() => setSelectPlc(plc?.[5])}/>
                    </div>

                    <div className="plc-card__status">
                        <div className="status-title">
                        <i className="pi pi-chart-line"></i>
                        <span>PLC Status</span>
                    </div>

                        <div className="status-list">

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator online"></span>
                                    <span>{selectPlc?.online ? 'Online' : 'Offline'}</span>
                                </div>

                                <span className="status-value online-text">
                                    {selectPlc?.online ? 'Active' : 'Inactive'}
                                </span>

                                <button name="online" className="status-button" onClick={(e) => confirm(e,"plc", 'online')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator error"></span>
                                    <span>{selectPlc?.err ? 'Error' : 'Normal'}</span>
                                </div>

                                <span className="status-value error-text">
                                    {selectPlc?.err ? 'Error' : 'Normal'}
                                </span>

                                <button name="error" className="status-button" onClick={(e) => confirm(e, "plc", 'err')}>
                                    <i className="pi pi-power-off"></i> 
                                </button>
                            </div>

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator running"></span>
                                    <span>Driver</span>
                                </div>

                                <span className="status-value running-text">
                                    {selectPlc?.dvrSts ? 'Running' : 'Stopped'}
                                </span>

                                <button name="running" className="status-button" onClick={(e) => confirm(e, "plc", 'dvrSts')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator warning"></span>
                                    <span>Communication</span>
                                </div>

                                <span className="status-value warning-text">
                                    {selectPlc?.comSts ? 'Connected' : 'Disconnected'}
                                </span>

                                <button name="warning" className="status-button" onClick={(e) => confirm(e, "plc", 'comSts')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="plc-card">
                    <div className="plc-card__header">
                        <div>
                            <p className="plc-card__eyebrow">
                                Conveyor Controller
                            </p>

                            <h2>Conveyor {selectConveyor?.idx}</h2>
                        </div>

                        <span className="plc-card__badge">
                            <span className="dot"></span>
                            {selectConveyor?.online ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>

                    <div className="plc-card__controls_conveyor">
                        <Button label="Cvr1" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[0])} />
                        <Button label="Cvr2" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[1])} />
                        <Button label="Cvr3" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[2])} />
                        <Button label="Cvr4" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[3])} />
                        <Button label="Cvr5" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[4])} />
                        <Button label="Cvr6" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[5])} />
                        <Button label="Cvr7" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[6])} />
                        <Button label="Cvr8" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[7])} />
                        <Button label="Cvr9" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[8])} />
                        <Button label="Cvr10" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[9])} />
                        <Button label="Cvr11" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[10])} />
                        <Button label="Cvr12" className="btn btn--reset" onClick={() => setSelectConveyor(conveyor?.[11])} />
                    </div>

                    <div className="plc-card__status">
                        <div className="status-title">
                        <i className="pi pi-chart-line"></i>
                        <span>Conveyor Status</span>
                    </div>

                        <div className="status-list">

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator online"></span>
                                    <span>{selectConveyor?.online ? 'Online' : 'Offline'}</span>
                                </div>

                                <span className="status-value online-text">
                                    {selectConveyor?.online ? 'Active' : 'Inactive'}
                                </span>

                                <button className="status-button" onClick={(e)=> confirm(e, 'cv', 'online')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator error"></span>
                                    <span>{selectConveyor?.err? 'Error' : 'No Error'}</span>
                                </div>

                                <span className="status-value error-text">
                                    {selectConveyor?.err ? 'Error' : 'No Error'}
                                </span>

                                <button className="status-button" onClick={(e)=> confirm(e, 'cv', 'err')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>

                            {/* <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator running"></span>
                                    <span>Running Forward</span>
                                </div>

                                <span className="status-value running-text">
                                    {selectConveyor?.runFwd ? 'Running' : 'Stopped'}
                                </span>

                                <button className="status-button" onClick={(e)=> confirm(e, 'cv', 'runFwd')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div> */}

                            {/* <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator warning"></span>
                                    <span>Running Backward</span>
                                </div>

                                <span className="status-value warning-text">
                                    {selectConveyor?.runBwd ? 'Running' : 'Stopped'}
                                </span>

                                <button className="status-button" onClick={(e)=> confirm(e, 'cv', 'runBwd')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div> */}
                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator running"></span>
                                    <span>Driver</span>
                                </div>

                                <span className="status-value running-text">
                                    {selectConveyor?.dvrSts ? 'Running' : 'Stopped'}
                                </span>

                                <button name="running" className="status-button" onClick={(e) => confirm(e, "cv", 'dvrSts')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>
                                <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator warning"></span>
                                    <span>Communication Status</span>
                                </div>

                                <span className="status-value warning-text">
                                    {selectConveyor?.comSts ? 'Connected' : 'Disconnected'}
                                </span>

                                <button className="status-button" onClick={(e)=> confirm(e, 'cv', 'comSts')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
                            <Card className="plc-card">
                    <div className="plc-card__header">
                        <div>
                            <p className="plc-card__eyebrow">
                                Crane Controller
                            </p>

                            <h2>Crane {selectCrane?.idx}</h2>
                        </div>

                        <span className="plc-card__badge">
                            <span className="dot"></span>
                            {selectCrane?.online ? 'Online' : 'Offline'}
                        </span>
                    </div>

                    <div className="plc-card__controls">
                        <Button label="Crane 1" className="btn btn--start" onClick={() => setSelectCrane(crane?.[0])}/>
                        <Button label="Crane 2" className="btn btn--start" onClick={() => setSelectCrane(crane?.[1])}/>
                        <Button label="Crane 3" className="btn btn--start" onClick={() => setSelectCrane(crane?.[2])}/>
                        <Button label="Crane 4" className="btn btn--start" onClick={() => setSelectCrane(crane?.[3])}/>
                        <Button label="Crane 5" className="btn btn--start" onClick={() => setSelectCrane(crane?.[4])}/>
                        <Button label="Crane 6" className="btn btn--start" onClick={() => setSelectCrane(crane?.[5])}/>
                    </div>

                    <div className="plc-card__status">
                        <div className="status-title">
                        <i className="pi pi-chart-line"></i>
                        <span>Crane Status</span>
                    </div>

                        <div className="status-list">

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator online"></span>
                                    <span>{selectCrane?.online ? 'Online' : 'Offline'}</span>
                                </div>

                                <span className="status-value online-text">
                                    {selectCrane?.online ? 'Active' : 'Inactive'}
                                </span>

                                <button name="online" className="status-button" onClick={(e) => confirm(e,"cr", 'online')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator error"></span>
                                    <span>{selectCrane?.err ? 'Error' : 'Normal'}</span>
                                </div>

                                <span className="status-value error-text">
                                    {selectCrane?.err ? 'Error' : 'Normal'}
                                </span>

                                <button name="error" className="status-button" onClick={(e) => confirm(e, "cr", 'err')}>
                                    <i className="pi pi-power-off"></i> 
                                </button>
                            </div>

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator running"></span>
                                    <span>Driver</span>
                                </div>

                                <span className="status-value running-text">
                                    {selectCrane?.dvrSts ? 'Running' : 'Stopped'}
                                </span>

                                <button name="running" className="status-button" onClick={(e) => confirm(e, "cr", 'dvrSts')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>

                            <div className="status-item">
                                <div className="status-info">
                                    <span className="status-indicator warning"></span>
                                    <span>Communication</span>
                                </div>

                                <span className="status-value warning-text">
                                    {selectCrane?.comSts ? 'Connected' : 'Disconnected'}
                                </span>

                                <button name="warning" className="status-button" onClick={(e) => confirm(e, "cr", 'comSts')}>
                                    <i className="pi pi-power-off"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
                

            </div>

        </div>
    );
}