import React, {useEffect, useState} from 'react';
import LoadingIndicator from './LoadingIndicator';

const Slider = () => {

    const GITHUB_USERS_API = 'https://api.github.com/users';

    const userNames = ['gaearon', 'acdlite', 'yyx990803', 'unclebob', 'martinfowler'];

    const [currentAvatarPath, setCurrentAvatarPath] = useState(null);
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setInterval(() => {
            setCurrentAvatarIndex(currentAvatarIndex => getNextIndex(currentAvatarIndex));
        }, 3000);
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`${GITHUB_USERS_API}/${userNames[currentAvatarIndex]}`)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject(`Nie można wczytać danych użytkownika: ${userNames[currentAvatarIndex]}`)
                } else {
                    return response.json()
                }
            })
            .then(data => {
                setCurrentAvatarPath(data.avatar_url);
                setLoading(false);
            })
            .catch(err => {
                alert(err);
            })
    }, [currentAvatarIndex]);

    const handlePrevButton = () => {
        let previousIndex = getPreviousIndex(currentAvatarIndex);
        setCurrentAvatarIndex(previousIndex);
    };

    const handleNextButton = () => {
        let nextIndex = getNextIndex(currentAvatarIndex);
        setCurrentAvatarIndex(nextIndex);
    };

    const getNextIndex = (currentIndex) => {
        return (currentIndex + 1) < userNames.length ? currentIndex + 1 : 0;
    };

    const getPreviousIndex = (currentIndex) => {
        return (currentIndex - 1) >= 0 ? currentIndex - 1 : userNames.length - 1;
    };

    return (
        <>
            <div className="slider">
                {loading
                    ? <LoadingIndicator/>
                    : <>
                        <img src={currentAvatarPath} alt="" className="slider__img"/>
                        <br/>
                        <button onClick={handlePrevButton} className="slider__prev-button">Previous</button>
                        <button onClick={handleNextButton} className="slider__next-button">Next</button>
                    </>}
            </div>
        </>
    )
};

export default Slider;