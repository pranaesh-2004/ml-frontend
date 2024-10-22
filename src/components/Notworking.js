import React, { useState, useEffect, useRef } from 'react';

const Notworking = () => {
    const [capturedImage, setCapturedImage] = useState('');
    const [details, setDetails] = useState({});
    const [classification, setClassification] = useState('');
    const videoRef = useRef(null);

    useEffect(() => {
        // Set up the video feed URL
        const videoStreamURL = 'http://127.0.0.1:5000/video_feed';
        if (videoRef.current) {
            // Update the src of the video feed
            videoRef.current.src = videoStreamURL;
        }
    }, []);

    const handleCapture = () => {
        fetch('http://127.0.0.1:5000/capture_image', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.image_url) {
                    setCapturedImage(data.image_url);
                }
                setDetails(data.details || {});

                // Set classification if available
                if (data.details.classification) {
                    setClassification(data.details.classification);
                } else {
                    setClassification('No phone detected.');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Object Detection and Classification</h1>

            {/* Video feed using an img element */}
            <img
                ref={videoRef}
                src="http://127.0.0.1:5000/video_feed" // Default source to load the video feed
                alt="Video Feed"
                width="720px"
                style={{ display: 'block', margin: '0 auto' }}
            />

            {/* Capture button */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleCapture}>Capture Image</button>
            </div>

            {/* Display captured image */}
            <h3>Captured Image:</h3>
            {capturedImage && <img src={capturedImage} alt="Captured" width="720px" />}

            {/* Display detection details */}
            <div id="details" style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>Detection Details:</h3>
                <pre>{JSON.stringify(details, null, 2)}</pre>
            </div>

            {/* Display classification results */}
            <div id="classification" style={{ marginTop: '20px' }}>
                <h3>Classification Results:</h3>
                <p>{classification}</p>
            </div>
        </div>
    );
};

export default Notworking;