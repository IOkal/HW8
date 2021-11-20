import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div class="nav-wrapper" style = {{backgroundColor: 'white'}}>
                <div class = "row">
                    <Link to = "/" style = {{color: 'black', fontWeight: "bold"}} class = "brand-logo center"><i class="material-icons" ><span class="material-icons" style = {{fontSize: '50px'}}>restaurant_menu</span></i></Link>
                    <div class = "col s9">
                        <ul class="right hide-on-med-and-down">
                            <Link to = "/Menu"><li style = {{color: 'black', fontWeight: "bold"}}><i class="material-icons"><span class="material-icons">photo_camera</span></i></li></Link>
                            <Link to = "/Profile"><li style = {{color: 'black', fontWeight: "bold", paddingLeft: '30px'}}><i class="material-icons"><span class="material-icons">person</span></i></li></Link>
                            <li style = {{color: "white", paddingLeft: '100px'}}>test</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar