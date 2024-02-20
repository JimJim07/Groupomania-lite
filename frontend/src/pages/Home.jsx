import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import fetchData from '../Fetch/fetchData.js';
import FormHome from '../components/FormHome.jsx';
import Card from '../components/Card/Card.jsx'
import './Home.css'

export default function Home() {
    const token = Cookies.get('token');
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function getAllPosts() {
            const url = 'http://localhost:7000/api/post/';
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            };

            const data = await fetchData(url, options);
            setPosts(data);
        }
        getAllPosts();
    }, [update]);

    const deleteOnePost = async (postId) => {
        const url = `http://localhost:7000/api/post/${postId}`
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        };

        const data = await fetchData(url, options);
        console.log(data);

        const newArrayPosts = posts.filter((post) => post._id !== postId)
        setPosts(newArrayPosts)
    }

    return (
        <main className='Home'>
            <FormHome update={update} setUpdate={setUpdate} />
            {posts.length > 0 && posts.map((item) => <Card key={item._id} item={item} deleteOnePost={deleteOnePost} />)}
        </main>
    );
}

