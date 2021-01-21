import React, { useState } from 'react';
import './App.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import { getQuizDetails } from './Services/QuizService';
import { QuizType } from './Types/quiz_types';
import QuizSection from './Components/QuizCard';
import { Button } from '@material-ui/core';


function App() {

  let [quiz, setQuiz] = useState<QuizType[]>([]);
  let [reTakeQuiz, setReTakeQuiz] = useState(true);
  let [currentStep, setCurrentStep] = useState<number>(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);
  let [category, setCategory] = useState(9);
  let [noOfQuestions, setNoOfQuestions] = useState(5);
  let [difficulty, setDifficulty] = useState('easy');
  let [quizStart, setQuizStart] = useState(false);
  let [loadingScreen, setLoadingScreen] = useState(false);

  const handleChangeCategory = (event : any) => {
    setCategory(event.target.value);
  };
  const handleChangeNoOfQuestions = (event : any) => {
    setNoOfQuestions(event.target.value);
  };
  const handleChangeDifficulty = (event : any) => {
    setDifficulty(event.target.value);
  };
  
  const onClickQuizStart = () => {
    setLoadingScreen(true);
    setReTakeQuiz(false);

    async function fetchData() {
      const questions: QuizType[] = await getQuizDetails(noOfQuestions, category, difficulty);
      setQuiz(questions);
      setQuizStart(true);
      setLoadingScreen(false);
    }
    fetchData();

  };

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    const currentQuestion: QuizType = quiz[currentStep];
    console.log("correct And: " + currentQuestion.correct_answer + "--user Selection:" + userAns)
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }

    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
    else {
      setShowResult(true);
      setQuizStart(false);
      setReTakeQuiz(false);
    }
  }

  const onClickReTakeQuiz =()=>{
    setCurrentStep(0);
    setScore(0);
    setCategory(9);
    setNoOfQuestions(5);
    setDifficulty('easy');
    setShowResult(false);
    setQuizStart(false);
    setReTakeQuiz(true);
  }


  

  const categorySelectFunc = ()=> { 
    return( 
      <FormControl>
        <InputLabel htmlFor="demo-customized-select-native">Category</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={category}
          onChange={handleChangeCategory}
          style={{width:"250px"}}
        >
      
          <option value={9}>General Knowledge</option>
          <option value={10}>Entertainment: Books</option>
          <option value={11}>Entertainment: Film</option>
          <option value={12}>Entertainment: Music</option>
          <option value={13}>Entertainment: Musicals &amp; Theatres</option>
          <option value={14}>Entertainment: Television</option>
          <option value={15}>Entertainment: Video Games</option>
          <option value={16}>Entertainment: Board Games</option>
          <option value={17}>Science &amp; Nature</option>
          <option value={18}>Science: Computers</option>
          <option value={19}>Science: Mathematics</option>
          <option value={20}>Mythology</option>
          <option value={21}>Sports</option>
          <option value={22}>Geography</option>
          <option value={23}>History</option>
          <option value={24}>Politics</option>
          <option value={25}>Art</option>
          <option value={26}>Celebrities</option>
          <option value={27}>Animals</option>
          <option value={28}>Vehicles</option>
          <option value={29}>Entertainment: Comics</option>
          <option value={30}>Science: Gadgets</option>
          <option value={31}>Entertainment: Japanese Anime &amp; Manga</option>
          <option value={32}>Entertainment: Cartoon &amp; Animations</option>
      
        </NativeSelect>
      </FormControl>
    )
  };

  const noOfQuestionsFunc = ()=>{
    return (
      <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">No. of Questions</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={noOfQuestions}
          onChange={handleChangeNoOfQuestions}
          style={{width:"250px"}}
          
        >
          {/* <option aria-label="None" value="" /> */}
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </NativeSelect>
      </FormControl>
    )
  }
  
  const difficultyFunc = ()=>{
    return (
      <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">Difficulty</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={difficulty}
          onChange={handleChangeDifficulty}
          style={{width:"250px"}}
        >
          <option value={"easy"}>Easy</option>
          <option value={"medium"}>Medium</option>
          <option value={"hard"}>Hard</option>
        </NativeSelect>
      </FormControl>
    )
  }

  const startQuizButtonFunc = ()=>{
    return (
      <Button variant="contained" style={{width:"250px"}} onClick={onClickQuizStart}>START QUIZ</Button>
    )
  }



  return (
    <div className="AppBackground AppPadding">
      <br/>
      <br/>
      <br/>
      <h1 className="heading_style">QUIZ APP</h1>
      
      { loadingScreen ? <h3>Loading.. </h3> : null}


      {quizStart ? 
        <QuizSection
          options={quiz[currentStep].option}
          question={quiz[currentStep].question}
          questionNum={currentStep}
          totalQuestions={noOfQuestions}
          callback={handleSubmit}
        />
        : null }

      { reTakeQuiz ?
        <div className="start">
          {categorySelectFunc()} <br/><br/>
          {noOfQuestionsFunc()} <br/><br/>
          {difficultyFunc()} <br/><br/>
          {startQuizButtonFunc()}
        </div>
        : null
      }

      {
        showResult ? 
        (<div className="result">
            <h2>Result</h2>

            <p>
              You final score is 
                <b> {score}</b> out of <b>{quiz.length}</b>
            </p>
            <Button variant="contained" style={{width:"250px"}} onClick={onClickReTakeQuiz}>RETAKE QUIZ</Button>
    
          </div>) : null
        }


    </div>
  );
}

export default App;