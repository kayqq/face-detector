import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
                {faceBoxes.map((face, index) => {
                    return (
                        <div
                            key={index}
                            className="bounding-box"
                            style={{
                                top: face.topRow,
                                right: face.rightCol,
                                bottom: face.bottomRow,
                                left: face.leftCol
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FaceRecognition;
