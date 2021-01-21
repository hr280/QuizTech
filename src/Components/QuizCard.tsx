import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { questionPropsType } from '../Types/quiz_types';
import { Button } from '@material-ui/core';

const QuizCard : React.FC<questionPropsType> = ({ question, options, questionNum,totalQuestions, callback }) => {

    let [nextBtnStatus , setNextBtnStatus] = useState(false);
    let [selectedAns, setSelectedAns] = useState("");

    const handleSelection = (ev: any) => {
       
        setSelectedAns(ev.target.value);
        setNextBtnStatus(true);        
    }

    return (
      <div className="question-container">
        <h4>Question No. {questionNum+1} / {totalQuestions}</h4>
        <div className="question">
          <h4>{question}</h4>
        </div>
        
        <form onSubmit={(e: React.FormEvent<EventTarget>) => {callback(e, selectedAns);setNextBtnStatus(false);}  } className="question-form" >

          {
            options.map((opt: string, ind: number) => {
              return (
                <div key={ind}>
                  <FormControlLabel  value={opt} 
                    checked={selectedAns === opt} onChange={handleSelection} control={<Radio />} label={opt} />

                </div>
              )
            })
          }
          <br />
          {nextBtnStatus ? <Button variant="contained"  type="submit" >NEXT</Button> : <Button variant="contained" disabled={true} > NEXT </Button> }
          
          
        </form>
      </div>
    )
}

export default QuizCard;