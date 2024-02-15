import React, { useState } from 'react'
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}


const Join = () => {

    const [name, setname] = useState("")
    console.log(name)

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <h1>CHAT APP</h1>
                <input type='text' placeholder="Enter Your Name" onChange={(e) => setname(e.target.value)} id="joinInput" />
                <Link to='/chat' onClick={(e) => !name ? e.preventDefault() : null}>   <button className="joinbtn" onClick={sendUser}> Login In</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }
