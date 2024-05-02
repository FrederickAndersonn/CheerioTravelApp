import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-typist/dist/Typist.css';
import logo from '../../assets/logowhite.png';
import { Data } from './data';
import TriviaPopup from '../Trivia';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [showTriviaPopup, setShowTriviaPopup] = useState<boolean>(false);
  const [triviaQuestion, setTriviaQuestion] = useState<string>('');
  const [triviaAnswer, setTriviaAnswer] = useState<string>('');
  const [triviaChoices, setTriviaChoices] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [access, setAccess] = useState(false);

 const fetchTriviaQuestion = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout after 10 seconds
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple', {
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // Clear the timeout

    if (!response.ok) {
      setAccess(true);
      throw new Error('Failed to fetch trivia question');
    }

    const data = await response.json();
    const question = data.results[0].question;
    const correctAnswer = data.results[0].correct_answer;
    const choices = [...data.results[0].incorrect_answers, correctAnswer].sort(() => Math.random() - 0.5);

    setTriviaQuestion(question);
    setTriviaAnswer(correctAnswer);
    setTriviaChoices(choices);
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Error fetching trivia question:', error);
    }
  }
};

  const handleAdminClick = async () => {
    console.log('Admin clicked');
    await fetchTriviaQuestion();
    setShowTriviaPopup(true);
  };

  const checkAnswer = (answer: string) => {
    if (answer.toLowerCase() === triviaAnswer.toLowerCase() || access===true) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/Admin');
      }, 2000);
      setShowTriviaPopup(false);
    } else {
      fetchTriviaQuestion();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setOverlayOpacity(1);
      setTimeout(() => {
        setCurrentImage((currentImage + 1) % Data.length);
        setOverlayOpacity(0);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImage]);

  const country = Data[currentImage].country;
  const city = Data[currentImage].city;
  const backgroundImage = Data[currentImage].image;

  return (
    <div 
      className="relative flex items-center justify-between h-screen bg-cover bg-center transition-opacity duration- ease-in-out" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {showTriviaPopup && (
        <TriviaPopup 
          onClose={() => setShowTriviaPopup(false)} 
          onAnswer={checkAnswer} 
          question={triviaQuestion} 
          choices={triviaChoices}
        />
      )}
      {showSuccessMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <h2 className="text-white text-4xl font-bold">YOU ARE WORTHY!</h2>
        </div>
      )}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-500" 
        style={{ opacity: overlayOpacity }}
      ></div>
      <div className=' flex flex-col z-10 w-1/3 backdrop-filter backdrop-blur-md h-full p-16 justify-center items-center'> 
        <img src={logo} alt="Logo" className="w-60" />
        <p className='text-white font-bold text-4xl my-16'>Blue Skies Ahead</p>
        <div className='flex justify-center mt-10 z-10'>
          <button
            className="px-6 py-2 bg-custom-black text-white rounded-md m-10 text-xl justify-end items-center transform hover:scale-105 hover:bg-red-500 hover:shadow-lg transition duration-300 ease-in-out"
            onClick={() => navigate('/trips')}
          >
            User
          </button>
          <button
            className="px-6 py-2 bg-custom-black text-white rounded-md m-10 text-xl justify-center items-center transform hover:scale-105 hover:bg-red-500 hover:shadow-lg transition duration-300 ease-in-out"
            onClick={handleAdminClick}
            disabled={showTriviaPopup}
          >
            Admin
          </button>
        </div>   
      </div> 
      <div className='z-10 w-2/3 h-full flex flex-col justify-end items-end pr-16 pb-16'>
        <h1 className='text-white text-4xl'>{city}</h1>
        <h1 className='text-white font-extrabold text-9xl'>{country}</h1>
      </div>
    </div>
  );
};

export default Home;
