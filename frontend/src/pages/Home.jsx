import { useEffect, useState } from 'react';
import { useContext } from 'react'
import { InfoContext } from '../Context/InfoContext.jsx'
import Cookies from 'js-cookie';
import fetchData from '../Fetch/fetchData.js';
import FormHome from '../components/FormHome.jsx';
import './Home.css'
import ContainerCards from '../components/ContainerCards/ContainerCards.jsx';

export default function Home() {
    const token = Cookies.get('token');
    const { setUserInfoCTX } = useContext(InfoContext);

    const [updatePosts, setUpdatePosts] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        async function getUser() {
            const url = `http://localhost:7000/api/user/${userId}`;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            };

            const data = await fetchData(url, options);
            setUserInfoCTX({ pseudo: data.pseudo, ifAdmin: data.admin });
        }
        getUser();
    }, [token, setUserInfoCTX])



    return (
        <main className='Home'>
            <FormHome updatePosts={updatePosts} setUpdatePosts={setUpdatePosts} />
            <ContainerCards updatePosts={updatePosts} />
        </main>
    );
}

