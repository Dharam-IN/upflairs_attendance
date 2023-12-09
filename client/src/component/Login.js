import React, { useState } from "react";
import './mix.css';
import { NavLink } from "react-router-dom";

const Login = ()=>{

    const [passshow, setpassshow] = useState(false);

    const [inpval, setinpval] = useState({
        email: "",
        password: ""
    });
    
    console.log(inpval)
    const setval = async(e)=>{
        // console.log(e.target.value)

        const {name, value} = e.target;

        setinpval(()=>{
            return{
                ...inpval,
                [name]: value
            }
        })
    }



    return(
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Login</h1>
                        <p>Please fill this empty fields</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Name</label>
                            <input type="email" value={inpval.email} onChange={setval} name="email" id="email" placeholder="Enter Your Name" />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passshow ? "password" : "text"} value={inpval.password} onChange={setval} name="password" id="password" placeholder="Enter Your Password" />
                                <div className="showpass" onClick={()=>setpassshow(!passshow)}>
                                    {!passshow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className="btn">Login</button>
                        <p>Don't Have an Account? <NavLink to='/register'>Register</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;
