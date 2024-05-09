import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Createpost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faImage, faVideo, faMusic, faFileAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUserDetails } from '../../../hooks/useAuth'; // Adjust the import path
import { createPost } from '../../../hooks/postHooks'; // Assuming this is where your post creation logic is
import { Button, Spinner } from '@chakra-ui/react';





function CreatePost({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  const userDetails = useCurrentUserDetails();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');
  const [postHeading, setPostHeading] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [audioPreviews, setAudioPreviews] = useState([]);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [sendEmail, setSendEmail] = useState(false);


  const handleFileChange = (e, fileType) => {
    const files = Array.from(e.target.files).map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    switch (fileType) {
      case 'image':
        setImagePreviews(prev => [...prev, ...files]);
        break;
      case 'video':
        setVideoPreviews(prev => [...prev, ...files]);
        break;
      case 'audio':
        setAudioPreviews(prev => [...prev, ...files]);
        break;
      case 'document':
        setDocumentPreviews(prev => [...prev, ...files]);
        break;
      default:
        break;
    }
  };

  const removeFile = (fileType, index) => {
    switch (fileType) {
      case 'image':
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        break;
      case 'video':
        setVideoPreviews(prev => prev.filter((_, i) => i !== index));
        break;
      case 'audio':
        setAudioPreviews(prev => prev.filter((_, i) => i !== index));
        break;
      case 'document':
        setDocumentPreviews(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  // Helper function to render file previews
  const renderPreviews = (previews, type) => {
    return previews.map((preview, index) => (
      <div key={index} className="preview-container">
        {type === 'image' && <img src={preview.url} alt={`Preview ${index}`} />}
        {type === 'video' && <video controls><source src={preview.url} type="video/mp4" /></video>}
        {type === 'audio' && <audio controls><source src={preview.url} type="audio/mp3" /></audio>}
        {type === 'document' && <div className="document-preview">{preview.file.name}</div>}
        <button onClick={() => removeFile(type, index)} className="remove-preview">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    ));
  };

  const handlePost = async () => {
    if (userDetails.role !== 'admin') {
      alert('Only admins can create posts.');
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const postDetails = {
        heading: postHeading,
        content: postContent,
        images: imagePreviews.map(preview => preview.file),
        videos: videoPreviews.map(preview => preview.file),
        audios: audioPreviews.map(preview => preview.file),
        documents: documentPreviews.map(preview => preview.file),
        sendEmail,
      };

      await createPost(postDetails);
      navigate(0); // Reload or navigate as needed
    } catch (error) {
      console.error("Error creating post: ", error);
      alert(`Error creating post: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading regardless of the outcome
    }

    onClose();
  };




  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Create a Post</h2>
          <button onClick={onClose} className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-body">
          {/* Checkbox to decide whether to send an email */}
          <label>
            <input
              type="checkbox"
              checked={sendEmail}
              onChange={() => setSendEmail(!sendEmail)}
            />
            Send Email Notification
          </label>
          <input
            type="text"
            value={postHeading}
            onChange={(e) => setPostHeading(e.target.value)}
            placeholder="Post Heading"
          />
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <div className="file-inputs">
            <label>
              <FontAwesomeIcon icon={faImage} />
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} multiple />
            </label>
            <label>
              <FontAwesomeIcon icon={faVideo} />
              <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} multiple />
            </label>
            <label>
              <FontAwesomeIcon icon={faMusic} />
              <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, 'audio')} multiple />
            </label>
            <label>
              <FontAwesomeIcon icon={faFileAlt} />
              <input
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                onChange={(e) => handleFileChange(e, 'document')}
                multiple
              />
            </label>
          </div>
          <div className="previews">
            {renderPreviews(imagePreviews, 'image')}
            {renderPreviews(videoPreviews, 'video')}
            {renderPreviews(audioPreviews, 'audio')}
            {renderPreviews(documentPreviews, 'document')}
          </div>
        </div>
        <div className="modal-footer">

          <Button onClick={handlePost} className="post-button" isDisabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Post'}
          </Button>
          <Button onClick={onClose} className="discard-button">Discard</Button>
        </div>
      </div>
    </div>
  );
};



export default CreatePost;

