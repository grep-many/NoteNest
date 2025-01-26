import React from 'react';
import HomePage from './Home/HomePage';
import UserPage from './Home/user/UserPage';
import Navbar from '@/components/Navbar';
import { usePage } from '@/context/PageProvider';

const MainPage = () => {

    const { auth } = usePage()

    return (
        <>
            {auth?.authenticate ?
                <UserPage />
                :
                <>
                    <Navbar />
                    <HomePage />
                </>
            }
        </>
    );
}

export default MainPage;
