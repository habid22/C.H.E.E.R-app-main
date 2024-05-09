import React, { useState } from 'react';
import './feed.css';
import { Button, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaUserCircle } from 'react-icons/fa';
import { useFetchPosts } from '../../../hooks/postHooks';  // Ensure this is the correct path
import cheerConnections from '../../assets/cheer_connections_nav.jpg';

export default function Feed() {
    const posts = useFetchPosts();
    const [selectedPost, setSelectedPost] = useState(null);
    const [imgError, setImgError] = useState(false);
    const userProfileImageUrl = "https://lh3.googleusercontent.com/a/ACg8ocLxMHMQIkd2e0jMz5pDoZfa3i_h_Q_yWLUIv3OHzO8L=s96-c";

    const openModal = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className="feed-card">
            <div className="FeedTitle">Your Feed</div>
            {posts.map((post, index) => (
                <div key={index} className="GridFeedBlock" onClick={() => openModal(post)}>
                    <div className="GridFeedBlockTop">
                        <img
                            src={cheerConnections}
                            onError={() => setImgError(true)}
                            alt="Profile"
                            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                        />
                        <div className="GridFeedBlockTitle">{post.heading}</div>
                    </div>
                    <div className="GridFeedBlockDetails">
                        <div>{post.content.substring(0, 100)}{post.content.length > 100 ? '...' : ''}</div>
                        <div className="GridFeedBlockDate">{post.date.toDate().toLocaleString()}</div>
                    </div>
                </div>
            ))}

            {/* Modal for displaying full-size content */}
            {selectedPost && (
    <div className="modal-backdrop" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h2>{selectedPost.heading}</h2>
                <button onClick={closeModal} className="close-button">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <div className="modal-body">
                <p>{selectedPost.date.toDate().toLocaleString()}</p>
                <p>{selectedPost.content}</p>
                <div className="modal-media">
                    {/* First, render the non-media document links */}
                    {Object.entries(selectedPost.mediaUrls).map(([key, value], idx) => {
                        if (!['png', 'jpg', 'jpeg', 'gif', 'bmp', 'mp4', 'webm', 'ogg', 'mp3', 'wav', 'ogg'].includes(key.split('.').pop().toLowerCase())) {
                            return <a key={idx} href={value} target="_blank" rel="noopener noreferrer" className="document-link">{key}</a>;
                        }
                        return null;
                    })}

                    {/* Then, render the media elements */}
                    {Object.entries(selectedPost.mediaUrls).map(([key, value], idx) => {
                        const fileExtension = key.split('.').pop().toLowerCase();
                        if (['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(fileExtension)) {
                            return <img key={idx} src={value} alt={key} className="media-image" />;
                        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
                            return <video key={idx} controls src={value} className="media-video" />;
                        } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
                            return <audio key={idx} controls src={value} className="media-audio" />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    </div>
)}


        </div>
    );
}
