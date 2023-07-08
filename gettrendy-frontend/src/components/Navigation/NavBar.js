import React from 'react'
import { useSelector } from "react-redux";
import PrivateNavbar from './Private/PrivateNavbar';
import PublicNavbar from './Public/PublicNavbar';


const NavBar = () => {
    // get user from store
    const state = useSelector(state => state.users);
    const { userAuth } = state;

    return (
            <>
                {!userAuth ? <PublicNavbar />: <PrivateNavbar />}
            </>
        );
    };

export default NavBar;
