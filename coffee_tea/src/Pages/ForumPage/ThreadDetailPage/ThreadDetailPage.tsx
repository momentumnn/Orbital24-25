import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../../../SupabaseAuthentication/SupabaseClient';
import './ThreadDetailPage.css';
import { Comment } from '../../../Types/Comment';
import { Thread } from '../../../Types/Thread';

function ThreadDetailPage() {


    const { id } = useParams();
    const [thread, setThread] = useState<Thread | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');


    // fetch the correct thread and then its comments on load
    useEffect(() => {
        const fetchThread = async () => {
            const { data, error } = await supabase
                .from('forum_thread')
                .select('*, Public_Profile(username)')
                .eq('id', id)
                .single();

            if (!error) setThread(data);
        };

        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('forum_comments')
                .select('*, Public_Profile(username)')
                //makig sure that the thread id is the same
                .eq('thread_id', id)
                .order('created_at', { ascending: true });

            if (!error) setComments(data);
        };

        fetchThread();
        fetchComments();
    }, [id]);


    // the person now will submit comments
    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (!user) return;

        // insert into comments table
        const { data, error } = await supabase
            .from('forum_comments')
            .insert([
                {
                    content: newComment,
                    user_id: user.id,
                    thread_id: id,
                },
            ])
            // selecting it again so that this new comment will be updated in the posted comments section
            .select('*, Public_Profile(username)');

        if (!error && data && data.length > 0) {
            setNewComment('');
            setComments(prev => [...prev, { ...data[0] }]);
        }
    };

    return (
        <div className="thread-detail-container">
            {thread ? (
                <>
                    <h1 className="thread-detail-title">{thread.title}</h1>
                    <p className="thread-detail-meta">Posted by {thread.Public_Profile?.username} on {new Date(thread.created_at).toLocaleString()}</p>
                    <p className="thread-detail-content">{thread.content}</p>

                    <div className="comments-section">
                        <h2 className="comments-title">Comments</h2>
                        <div className="comments-list">
                            {comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <p className="comment-content">{comment.content}</p>
                                    <p className="comment-meta">
                                        By {comment.Public_Profile?.username} on {new Date(comment.created_at).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="comment-form">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                            />
                            <button onClick={handleCommentSubmit}>Post</button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading thread...</p>
            )}
        </div>
    );



}

export default ThreadDetailPage;