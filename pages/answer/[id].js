import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../../styles/Answer.module.css'
import axios from "axios"
import { v4 as uuidv4 } from "uuid";

export default function Post({ form, questions }) {
    const [answerTexts, setAnswerTexts] = useState([])
    const [answerOptions, setAnswerOptions] = useState([])

    const isOptionSelected = (optionId) => {
        const answerIndex = answerOptions.findIndex(answer => answer.answerOption === optionId)

        if (answerIndex === -1)
            return false
        else
            return true
    }

    const selectOption = (questionId, qType, optionId) => {
        const cp = [...answerOptions]
        const answer = {
            id: uuidv4(),
            formQuestionId: questionId,
            answerOption: optionId
        }

        if (qType === "checkbox") {
            const selected = answerOptions.findIndex(answer => answer.answerOption === optionId)
            console.log(selected)
            if (selected !== -1) {
                cp.splice(selected, 1)
                console.log(cp)
            } else {
                console.log(answer)
                cp.push(answer)
                console.log(cp)
            }
        } else if (qType === "radio") {
            const selected = answerOptions.findIndex(answer => answer.formQuestionId === questionId)
            if (selected !== -1) {
                cp.splice(selected, 1)
            }
            cp.push(answer)
        }

        setAnswerOptions(cp)
    }

    const updateAnswerText = (evt, questionId) => {
        const index = answerTexts.findIndex(answer => answer.formQuestionId === questionId)
        const cp = [...answerTexts]

        if (index === -1) {
            const answer = {
                id: uuidv4(),
                formQuestionId: questionId,
                answerText: evt.target.value
            }
            cp.push(answer)
        } else {
            cp[index].answerText = evt.target.value
        }

        setAnswerTexts(cp)
        console.log(answerTexts)
    }

    const submitAnswer = () => {
        axios.post("http://localhost:3000/answers/submitanswer", {
            form: form,
            answerTexts: answerTexts,
            answerOptions: answerOptions
        })
            .then(function (response) {
                // handle success
                // console.log(response);
                // console.log(response.data)
                alert(response.data.message)
            })
            .catch(function (error) {
                // handle error
                alert(error)
            })
            .then(function () {
                // always executed
            })

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
                            isOptionSelected={isOptionSelected}
                            selectOption={selectOption}
                            updateAnswerText={updateAnswerText}
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

const Question = ({ question, isOptionSelected, selectOption, updateAnswerText }) => {
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
                        <div key={option.id} className={styles.optionLine} onClick={(evt) => selectOption(question.id, question.qType, option.id)}>
                            <div className={isOptionSelected(option.id) === false ? `${styles.box}` : `${styles.box} ${styles.boxSelected}`}></div>
                            <div className={styles.inputContainer}>
                                <div className={styles.option}>{option.title}</div>
                                <div className={styles.desc}>{option.desc}</div>
                            </div>
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
                <input onChange={(evt) => updateAnswerText(evt, question.id)}></input>
            </div>
        )
}

export async function getServerSideProps(context) {
    const { id } = context.query
    const res = await axios.get(`http://localhost:3000/forms/${id}`)

    const form = res.data.form
    const formQuestions = res.data.formQuestions
    const formQuestionOptions = res.data.formQuestionOptions
    const questions = []
    const textAnswers = []
    const optionAnswers = []

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

        // const textAnswer = {
        //     id: uuidv4(),
        //     formQuestionId: formQuestions[i].id,
        //     answerText: ""
        // }

        // const optionAnswer = {
        //     id: uuidv4(),
        //     formQuestionId: formQuestions[i].id,
        //     answerOption: ""
        // }

        // textAnswers.push(textAnswer)
        // optionAnswers.push(optionAnswer)
    }

    return {
        props: {
            form: form,
            questions: questions,
            // textAnswers: textAnswers,
            // optionAnswers: optionAnswers
        }
    }
}