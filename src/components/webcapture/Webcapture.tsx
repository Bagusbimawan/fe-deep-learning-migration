// components/WebcamCapture.tsx
import React, { useCallback, useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

interface WebcamCaptureProps {
  onCapture: (imageUrl: string) => void; // Callback prop
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isClient, setIsClient] = useState(false); // To handle client-side rendering

  useEffect(() => {
    setIsClient(true); // Ensure component is rendered client-side only
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc); // Call the callback with the captured image
    }
  }, [webcamRef, onCapture]);

  // Prevent rendering of the Webcam component server-side
  if (!isClient) {
    return null;
  }

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default WebcamCapture;
