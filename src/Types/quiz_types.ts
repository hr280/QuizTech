import React from 'react'

export type QuestionType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuizType = {
    question: string
    answer: string
    option: string[]
    correct_answer: string
}

export type questionPropsType = {
    question: string
    options: string[]
    questionNum: number
    totalQuestions: number
    callback: (e:React.FormEvent<EventTarget>, ans:string) => void
}