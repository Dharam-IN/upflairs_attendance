import React, { useContext, useEffect, useState } from "react"
import './mix.css'
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Dashboard = ()=>{

    const {logindata, setLoginData} = useContext(LoginContext)
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

            if(data.status == 401 || !data){
                // console.log("Error page redirect")
                history("*")
            }else{
                // console.log("userverify")
                setLoginData(data)
                history("/dash")
            }
        } catch (error) {
            console.error('Error fetching validuser:', error);
        }
    };

    useEffect(()=>{
        DashboardValid();
    },[])

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

    return(
        <>
            <nav className='container'>
                <div className="row my-3">
                    <div className="col-md-6">
                    <div className="clock-con">
                        <div id="MyClockDisplay" className="clock">
                        {time}
                        </div>
                        <div className="email">
                            <h5>{logindata.ValidUserOne.email}</h5>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6 text-end">
                    <div className="att_btns">
                        <button className="btn btn-primary me-3">In</button>
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
                        <th>Absent</th>
                        <th>Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Employee</td>
                        <td>Monday</td>
                        <td>Yes</td>
                        <td>No</td>
                        </tr>
                        <tr className="active-row">
                        <td>2</td>
                        <td>Employee</td>
                        <td>Tuesday</td>
                        <td>No</td>
                        <td>Yes</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Employee</td>
                        <td>Wednesday</td>
                        <td>No</td>
                        <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Dashboard;
