import React, {useCallback} from 'react';
import styled, {keyframes} from 'styled-components';
import {useNavigate} from "react-router-dom";

function getRandomBackgroundImage() {
    const images = [
        'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
        'https://lifehacker.ru/wp-content/uploads/2013/05/50800-2560x1600.jpg'
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

export default function SpotlightComponent() {
    const navigate = useNavigate();
    const onMouseMove = useCallback((event: React.MouseEvent) => {
        const spotlight = document.querySelector('.spotlight') as HTMLElement;
        if (spotlight && spotlight.offsetWidth) {
            const w = spotlight.offsetWidth;
            const h = spotlight.offsetHeight;
            const t = event.pageY - spotlight.offsetTop;
            const l = event.pageX - spotlight.offsetLeft;
            const dx = Math.abs(event.pageX - window.innerWidth / 2);
            const dy = Math.abs(event.pageY - window.innerHeight / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Set the radius of the gradient based on the distance from the center
            const radius =
                500 -
                (distance * 800) /
                Math.sqrt(
                    window.innerWidth * window.innerWidth +
                    window.innerHeight * window.innerHeight,
                );

            // Update the spotlight style
            spotlight.style.backgroundImage = `radial-gradient(circle at ${
                (l / w) * 100
            }% ${(t / h) * 100}%, transparent 80px, rgba(0, 0, 0, 0.99) ${radius}px)`;
        }
    }, []);

    return (
        <SpotlightWrap onMouseMove={onMouseMove}>
            <ContentWrap>
                <SpotlightLink>
                    Page n<BlinkingO>o</BlinkingO>t found
                </SpotlightLink>
                <SpotlightDescripion>
                    Hmm, the page you were looking for doesn’t seem to exist anymore
                </SpotlightDescripion>
                <ButtonErrorLink onClick={() => {
                    navigate('/');
                }}>Back to mainpage</ButtonErrorLink>
            </ContentWrap>
            <Spotlight className="spotlight"/>
        </SpotlightWrap>
    );
}


const SpotlightWrap = styled.div`
  background: url(${getRandomBackgroundImage()}) no-repeat center center;
  background-size: cover;
  height: 100vh;
  position: relative;
`;

const SpotlightLink = styled.span`
  color: white;
  display: flex;

  align-items: center;
  text-shadow:
          0 0 10px whitesmoke,
          0 0 20px whitesmoke,
          0 0 30px whitesmoke,
          0 0 40px whitesmoke;
  text-decoration: none;
  font-size: 3em;

  &:hover {
    color: #fff;
  }

  @media (max-width: 657px) {
    font-size: 2rem;
  }

  @media (max-width: 438px) {
    font-size: 1rem;
  }
`;
const SpotlightDescripion = styled.span`
  color: white;
  font-size: 0.7em;

  @media (max-width: 657px) {
    font-size: 0.5rem;
  }
  @media (max-width: 438px) {
    font-size: 0.3rem;
  }
`;
const Spotlight = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
`;

const ButtonErrorLink = styled.button`

  background-color: white;
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  font-size: 0.6em;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  border-radius: 1em;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 657px) {
    font-size: 0.5rem;
    padding: 13px 22px;
  }

  @media (max-width: 438px) {
    font-size: 0.3rem;
    padding: 8px 12px;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const blink = keyframes`
  from {
    opacity: 0.1;
    text-shadow: 0 0 10px #fff,
    0 0 20px #fff,
    0 0 30px #fff,
    0 0 40px #ff00de,
    0 0 70px #ff00de,
    0 0 80px #ff00de,
    0 0 100px #ff00de,
    0 0 150px #ff00de;
  }
  to {
    opacity: 1;
    text-shadow: 0 0 20px #fff,
    0 0 30px #fff,
    0 0 40px #fff,
    0 0 50px #ff00de,
    0 0 80px #ff00de,
    0 0 90px #ff00de,
    0 0 120px #ff00de,
    0 0 180px #ff00de;
  }
`;

const BlinkingO = styled.span`
  animation: ${blink} 0.2s infinite;
`;