
import "./Dashboard.scss";
import { TabView, TabPanel } from 'primereact/tabview';
import CraneStore from '../components/cranestore';
import CraneStatus from '../components/cranestatus';
import Conveyor from "../components/conveyor";
import PlcControl from "../components/plc";
import Crane from "../components/crane";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Dashboard() {
    const [cr, setCr] = useState([]);
    const [crStn, setCrStn] = useState([]);
    const [plc, setPlc] = useState([]);
    const [cv, setCv] = useState([]);
    const apiUrl = "https://scada.skripsiin.workers.dev/api/"

    useEffect (()=>{
        const loadData = async ()=>{
            try{
                //axios.method(apiUrl:string, payload:object, header:object)
                const response = await axios.post(`${apiUrl}status`,
                    {
                        cv : {idx : [1,2,3,4,5,6,7,8,9,10,11,12]},
                        cr : {idx : [1,2,3]},
                        plc : {idx :[1,2,3,4,5,6]},
                        crStn : {idx : [1,2]}
                    },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                )

                if(response.data.success){
                    setCv(response.data.data.cv)
                    setCr(response.data.data.cr)
                    setPlc(response.data.data.plc)
                    setCrStn(response.data.data.crStn)
                }
            }
            catch(error){
                console.log(error)
            }
        }

        loadData();
    },[])

    return (
        <div className="page">
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Dashboard</p>
                    <h1>Crane Control Page</h1>
                </div>
            </div>

             <TabView>
                <TabPanel header="Crane 1" className="tab-panel">
                    <CraneStore data={crStn?.[0]} label="Crane 1 Store-in Station" type="in"/>
                    <CraneStatus label="Crane 1 Status" data={cr?.[0]}/>
                    <CraneStore data={crStn?.[1]} label="Crane 1 Store-Out Station" type="out" />
                        <PlcControl data={plc?.[0]}/>
                        <div className="roller">
                            <div>
                                <Conveyor data = {cv?.[0]}rollerNum={7}/>
                                <Conveyor data = {cv?.[1]} rollerNum={7}/>
                            </div>
                            <div>
                                <Crane data={cr?.[0]} label="1"/>
                            </div>
                            <div>
                                <Conveyor data = {cv?.[2]} rollerNum={7} className={'rotate-180'}/>
                                <Conveyor data = {cv?.[3]} rollerNum={7} className={'rotate-180'}/>
                            </div>
                        </div>
                        <PlcControl data={plc?.[1]} />
                </TabPanel>
                <TabPanel header="Crane 2" className="tab-panel">
                    <CraneStore data={crStn?.[2]} label="Crane 2 Store-in Station" type="in"/>
                    <CraneStatus label="Crane 2 Status" data={cr?.[1]}/>
                    <CraneStore data={crStn?.[3]} label="Crane 2 Store-Out Station" type="out" />
                        <PlcControl data={plc?.[2]}/>
                        <div className="roller">
                            <div>
                                <Conveyor data = {cv?.[4]}rollerNum={7}/>
                                <Conveyor data = {cv?.[5]} rollerNum={7}/>
                            </div>
                            <div>
                                <Crane data={cr?.[1]} label="2"/>
                            </div>
                            <div>
                                <Conveyor data = {cv?.[6]} rollerNum={7} className={'rotate-180'}/>
                                <Conveyor data = {cv?.[7]} rollerNum={7} className={'rotate-180'}/>
                            </div>
                        </div>
                        <PlcControl data={plc?.[3]} />
                </TabPanel>
                <TabPanel header="Crane 3" className="tab-panel">
                    <CraneStore data={crStn?.[4]} label="Crane 3 Store-in Station" type="in"/>
                    <CraneStatus label="Crane 3 Status" data={cr?.[2]}/>
                    <CraneStore data={crStn?.[5]} label="Crane 3 Store-Out Station" type="out" />
                        <PlcControl data={plc?.[4]}/>
                        <div className="roller">
                            <div>
                                <Conveyor data = {cv?.[8]}rollerNum={7}/>
                                <Conveyor data = {cv?.[9]} rollerNum={7}/>
                            </div>
                            <div>
                                <Crane data={cr?.[2]} label="3"/>
                            </div>
                            <div>
                                <Conveyor data = {cv?.[10]} rollerNum={7} className={'rotate-180'}/>
                                <Conveyor data = {cv?.[11]} rollerNum={7} className={'rotate-180'}/>
                            </div>
                        </div>
                        <PlcControl data={plc?.[5]} />
                </TabPanel>
            </TabView>   
         
        </div>
    );
}