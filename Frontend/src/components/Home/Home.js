import React, { useState } from 'react';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Score from '../Score/Score';
import { getImageData } from '../../services';

const Home = ({ loggedIn, user, incrementEntries }) => {
    const [link, setLink] = useState('');
    const [faceBoxes, setFaceBoxes] = useState([]);

    const handleSubmit = link => {
        setLink(link);
        getImageData(link)
            .then(faceData => {
                const clarifaiFace = faceData.outputs[0].data.regions;
                // grab id property 'inputimage' from FaceRecognition <img>
                const image = document.getElementById('inputimage');
                // get image height x width
                const width = Number(image.width);
                const height = Number(image.height);

                const faceBoxes = clarifaiFace.map(face => {
                    const box = face.region_info.bounding_box;
                    return {
                        leftCol: box.left_col * width,
                        topRow: box.top_row * height,
                        rightCol: width - box.right_col * width,
                        bottomRow: height - box.bottom_row * height
                    };
                });
                return faceBoxes;
            })
            .then(faceBoxes => {
                setFaceBoxes(faceBoxes);
                if (loggedIn) {
                    incrementEntries(user.id);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Logo />
            <Score loggedIn={loggedIn} user={user} />
            <p className="f5 pa2">
                This magic brain will detect faces in your pictures. Give it a try!
            </p>
            <ImageLinkForm handleSubmit={handleSubmit} />
            <FaceRecognition faceBoxes={faceBoxes} imageUrl={link} />
        </div>
    );
};

export default Home;
