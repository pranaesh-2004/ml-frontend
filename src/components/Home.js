import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Profile from './Profile';
import EwasteGraph from './EwasteGraph';
import EwastePodumIdam from './EwastePodumIdam';
import Purchase from './Purchase';
import './Home.css';
import Working from './Working'; 
import Analysis from './Analysis';
import Notworking from './Notworking'; 
import Model from './Model';
import Graph from './Graph';

import BackgroundAudio from './BackgroundAudio';
const Home = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="home-container">
            <video className="background-video" autoPlay loop muted>
                <source src="/ewaste_clip2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <aside className="sidebar">
                <h3>Home</h3>
                <ul>
                    <li><Link to="aboutus">About Us</Link></li>
                    <li><Link to="contactus">Contact Us</Link></li>
                    <li><Link to="profile">Profile</Link></li>
                    <li><Link to="ewastegraph">E-waste Analysis Graph</Link></li>
                    <li><Link to="ewastepodumidam">E-waste Podum Idam</Link></li>
                    <li><Link to="purchase">Purchase</Link></li>
                </ul>
                
            <BackgroundAudio />
                {/* Theme toggle button */}
                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
            </aside>
            <main className="content">
                <Routes>
                    <Route path="/" element={
                        <div className="video-container">
                            <video autoPlay loop muted width="100%" height="auto">
                                <source src="ewaste_clip1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    } />
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="contactus" element={<ContactUs />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="ewastegraph/*" element={<EwasteGraph />} />
                    <Route path="ewastepodumidam/*" element={<EwastePodumIdam />} />
                    <Route path="working" element={<Working />} />
                    <Route path="notworking" element={<Notworking />} />
                    <Route path="analysis" element={<Analysis />} />
                    <Route path="graph" element={<Graph />} />
                    <Route path="model" element={<Model />} />
                    <Route path="purchase" element={<Purchase />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
};

export default Home;