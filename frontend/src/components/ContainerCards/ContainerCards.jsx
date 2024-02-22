import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import fetchData from '../../Fetch/fetchData';
import Card from "../Card/Card";
import './ContainerCards.css'

export default function ContainerCards({ updatePosts }) {
    const token = Cookies.get('token');
    const [posts, setPosts] = useState([]);

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
    }, [token, updatePosts]);

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
        <div className="ContainerCards">
            {posts.length > 0 && posts.map((post) => <Card key={post._id} post={post} deleteOnePost={deleteOnePost} />)}
        </div>
    )
}