import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../../styles/Answer.module.css'
import axios from "axios"
import { v4 as uuidv4 } from "uuid";

export default function Post({ form, questions, answerTexts, answerOptions }) {
    const optionCnt = (questionId, optionId) => {
        var cnt = 0
        const index = answerOptions.findIndex(answer => answer[0].formQuestionId === questionId)
        var i
        for(i = 0; i < answerOptions[index].length; i++) {
            if(answerOptions[index][i].answerOptionId === optionId)
                cnt++
        }

        return cnt
    }

    return (
        <div className={styles.frame}>
            <div className={styles.titleBlock}>
                <div className={styles.title}>{form.title}</div>
                <div className={styles.desc}>{form.desc}</div>
            </div>
            {questions.map((question) => {
                return (
                    <div key={question.id}>
                        <Question
                            question={question}
                            answerTexts={answerTexts}
                            optionCnt={optionCnt}
                        />
                    </div>
                )
            })}
            <br />
            <div className={styles.createBtn} onClick={(evt) => submitAnswer()}>Submit</div>
            <div style={{ height: "100vh" }}></div>
        </div>
    )
}

const Question = ({ question, answerTexts, optionCnt }) => {
    if (question.qType === "checkbox" || question.qType === "radio") {
        return (
            <div className={styles.QBlock}>
                <div className={styles.firstRow}>
                    <div className={styles.inputQTitle}>{question.title}</div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div className={styles.selector}>{question.qType}</div>
                </div>
                <div className={styles.inputQDesc}>{question.desc}</div>
                {question.options.map((option) => {
                    return (
                        <div key={option.id} className={styles.optionLine}>
                            <div className={styles.box}></div>
                            <div className={styles.inputContainer}>
                                <div className={styles.option}>{option.title}</div>
                                <div className={styles.desc}>{option.desc}</div>
                            </div>
                            <div>{optionCnt(question.id, option.id)}</div>
                        </div>
                    )
                })}
            </div>
        )
    } else if (question.qType === "text")
        return (
            <div className={styles.QBlock}>
                <div className={styles.firstRow}>
                    <div className={styles.inputQTitle}>{question.title}</div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div className={styles.selector}>{question.qType}</div>
                </div>
                <div className={styles.inputQDesc}>{question.desc}</div>
                {answerTexts[answerTexts.findIndex(answer => answer[0].formQuestionId === question.id)].map((answer) => {
                    return (
                        <div key={answer.id}>
                            <div>{answer.answerText}</div>
                            <br />
                        </div>
                    )
                })}
            </div>
        )
}

export async function getServerSideProps(context) {
    const { id } = context.query
    const res = await axios.get(`https://api.myformvalley.com/results/${id}`)

    const form = res.data.form
    const formQuestions = res.data.formQuestions
    const formQuestionOptions = res.data.formQuestionOptions
    const questions = []
    const textAnswers = res.data.answerTexts
    const optionAnswers = res.data.answerOptions

    var i
    for (i = 0; i < formQuestions.length; i++) {
        const question = {
            id: formQuestions[i].id,
            qType: formQuestions[i].qType,
            title: formQuestions[i].title,
            desc: formQuestions[i].desc,
            options: formQuestionOptions[i]
        }
        questions.push(question)
    }

    return {
        props: {
            form: form,
            questions: questions,
            answerTexts: textAnswers,
            answerOptions: optionAnswers
        }
    }
}