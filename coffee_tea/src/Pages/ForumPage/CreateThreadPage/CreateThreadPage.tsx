import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../SupabaseAuthentication/SupabaseClient';
import './CreateThreadPage.css';


function CreateThreadPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {

        // make sure that the stupid users are entering something and not white spaces
        if (!title.trim() || !content.trim()) {
            setErrorMessage('Title and content are required.');
            return;
        }

        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        //precaution only incase we kena hacked
        if (!user) {
            setErrorMessage('You must be logged in to create a thread.');
            return;
        }


        //add to thread table
        const { error } = await supabase.from('forum_thread').insert([
            {
                title,
                content,
                user_id: user.id,
            },
        ]);

        if (error) {
            setErrorMessage('Failed to create thread. Please try again.');
        } else {
            navigate('/Forum');
        }
    };

    return (
        <div className="create-thread-container">
            <h1 className="create-thread-title">Create New Thread</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Thread title"
                className="thread-input"
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your content here..."
                className="thread-textarea"
            />
            <button className="submit-button" onClick={handleSubmit}>Post Thread</button>
        </div>
    );


}

export default CreateThreadPage;