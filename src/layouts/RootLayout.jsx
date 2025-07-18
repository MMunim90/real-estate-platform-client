import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import ScrollToTopButton from '../pages/Home/ScrollToTopButton/ScrollToTopButton';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollToTopButton />
        </div>
    );
};

export default RootLayout;