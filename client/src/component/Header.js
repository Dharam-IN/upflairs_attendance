import React, { useContext } from 'react';
import './header.css'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';


const Header = ()=>{

    const {logindata, setLoginData} = useContext(LoginContext);
    
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async ()=>{
        let token = localStorage.getItem("usersdatatoken");
        const res = await fetch("http://localhost:5001/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if(data.status == 201){
            console.log("User Logout")
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/")
        }else{
            console.log("Error")
        }
    }

    const goDash = ()=>{
        history("/dash")
    }

    const goError = ()=>{
        history("*")
    }

    return(
        <>
            <header>
                <nav>
                    <h1>Upflairs</h1>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{backgroundColor: "salmon", fontWeight: "bold"}} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                            <Avatar style={{backgroundColor: "blue"}} onClick={handleClick}/>
                        }
                    </div>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                    {
                        logindata.ValidUserOne ? (
                            <>
                                <MenuItem onClick={()=>{
                                    goDash()
                                    handleClose()
                                }}>Profile</MenuItem>
                                <MenuItem onClick={()=>{
                                    logoutuser()
                                    handleClose()
                                }}>Logout</MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={()=>{
                                    goError()
                                    handleClose()
                                    }}>Profile</MenuItem>
                            </>
                        )
                    }
                        
                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header;
