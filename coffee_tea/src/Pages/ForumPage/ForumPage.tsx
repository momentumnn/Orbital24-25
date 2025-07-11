import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../SupabaseAuthentication/SupabaseClient';
import './ForumPage.css';
import { Thread } from "../../types";


function ForumPage() {

    const [threads, setThreads] = useState<Thread[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    //gets all the thread when load
    useEffect(() => {
        const fetchThreads = async () => {
            const { data, error } = await supabase
                .from('forum_thread')
                .select('*, Public_Profile(username)')
                .order('created_at', { ascending: false });

            if (error) console.error('Error fetching threads:', error);
            else setThreads(data);
        };

        fetchThreads();
    }, []);


    //separating the threads that are deals and the threads that are normal aka discussion
    const dealThreads = threads
        .filter(thread => thread.type === 'deal')
        .filter(thread => thread.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const normalThreads = threads
        .filter(thread => thread.type !== 'deal')
        .filter(thread => thread.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="forum-container">
            <h1 className="forum-title">Community Forum</h1>
            <Link to="/forum/create" className="create-thread-link">Create New Thread</Link>

            <input
                type="text"
                placeholder="Search threads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="forum-search"
            />

            {dealThreads && (
                <div className="deal-section">
                    <h2 className="section-title">Latest Deals</h2>
                    <div className="thread-list">
                        {dealThreads.map(thread => (
                            <Link to={`/forum/thread/${thread.id}`} key={thread.id} className="thread-card deal-thread">
                                <h2 className="thread-title">[DEAL] {thread.title}</h2>
                                <p className="thread-meta">
                                    Posted by {thread.Public_Profile?.username} on {new Date(thread.created_at).toLocaleString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="normal-section">
                <h2 className="section-title">Discussions</h2>
                <div className="thread-list">
                    {normalThreads.map(thread => (
                        <Link to={`/forum/thread/${thread.id}`} key={thread.id} className="thread-card">
                            <h2 className="thread-title">{thread.title}</h2>
                            <p className="thread-meta">
                                Posted by {thread.Public_Profile?.username} on {new Date(thread.created_at).toLocaleString()}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default ForumPage;