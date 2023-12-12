import React, { useContext } from 'react';
import './header.css'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';


const Header = ()=>{

    const {logindata, setLoginData} = useContext(LoginContext)

    return(
        <>
            <header>
                <nav>
                    <h1>Upflairs</h1>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{backgroundColor: "salmon", fontWeight: "bold"}}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                            <Avatar style={{backgroundColor: "blue"}}>H</Avatar>
                        }
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;
