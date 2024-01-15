import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react"; // import useCallback
import { Camera } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

type WebcamCaptureProps = {
  src:string
  onSrcChanged?: (src:string|null)=>void
}


export default function WebcamCapture({src, onSrcChanged}:WebcamCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  // create a capture function
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      onSrcChanged && onSrcChanged(imageSrc);
    }
  }, [webcamRef]);
  const retake = () => {
    setImgSrc(null);
  };
  return (
    <>
      {imgSrc ? (
        <img src={imgSrc} width={"80%"} alt="webcam"  />
      ) : (
        <Webcam width={"80%"} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <Button variant="secondary" onClick={retake}>
            <Camera></Camera>
          </Button>
        ) : (
          <Button variant="secondary" onClick={capture}>
            <Camera></Camera>
          </Button>
        )}
      </div>
    </>
  );
};
