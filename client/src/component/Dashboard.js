import React, { useContext, useEffect, useState } from "react"
import './mix.css'
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext)
    // console.log(logindata.ValidUserOne.email)

    const history = useNavigate();

    const DashboardValid = async () => {
        try {
            let token = localStorage.getItem("usersdatatoken");
            const res = await fetch("http://localhost:5001/validuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            const data = await res.json();
            // console.log(data);

            if (data.status == 401 || !data) {
                // console.log("Error page redirect")
                history("*")
            } else {
                // console.log("userverify")
                setLoginData(data)
                history("/dash")
            }
        } catch (error) {
            console.error('Error fetching validuser:', error);
        }
    };

    useEffect(() => {
        DashboardValid();
    }, [])

    const [time, setTime] = useState('');
    useEffect(() => {
        function showTime() {
            const date = new Date();
            let h = date.getHours(); // 0 - 23
            const m = date.getMinutes(); // 0 - 59
            const s = date.getSeconds(); // 0 - 59
            let session = "AM";

            if (h === 0) {
                h = 12;
            }

            if (h > 12) {
                h -= 12;
                session = "PM";
            }

            const formattedTime = `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s} ${session}`;
            setTime(formattedTime);
        }

        const intervalId = setInterval(showTime, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const [tableRows, setTableRow] = useState([])
    const [day, setDay] = useState(null);
    const [times, setTimes] = useState(null);


    const handleInput = ()=>{
        const today = new Date();
        const options = { weekday: "long", timeZone: "Asia/Kolkata" };
        const day = today.toLocaleDateString("en-IN", options);
        const times = today.getTime

        setDay(day);
        console.log("india")
        const newRow = {
            sn: tableRows.length + 1,
            name: logindata ? logindata.ValidUserOne.fname : "",
            day: day,
            times: time,
            absent: "No",
            present: "Yes"
        }
        console.log(newRow)

        setTableRow((prevRows)=>[...prevRows, newRow])
        console.log(tableRows)
        // console.log("india 2")
    }


    return (
        <>
            <nav className='container'>
                <div className="row my-3">
                    <div className="col-md-6">
                        <div className="clock-con">
                            <div id="MyClockDisplay" className="clock">
                                {time}
                            </div>
                            <div className="email">
                                <h5>{logindata ? logindata.ValidUserOne.email : ""}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-end">
                        <div className="att_btns">
                            <button className="btn btn-primary me-3" onClick={handleInput}>In</button>
                            <button className="btn btn-primary">Out</button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Name</th>
                            <th>Days</th>
                            <th>Time</th>
                            <th>Absent</th>
                            <th>Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row) => (
                            <tr key={row.sn}>
                                <td>{row.sn}</td>
                                <td>{row.name}</td>
                                <td>{row.day}</td>
                                <td>{row.times}</td>
                                <td>{row.absent}</td>
                                <td>{row.present}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Dashboard;
