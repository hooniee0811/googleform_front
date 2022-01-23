import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from '../../styles/Form.module.css';
import axios from "axios";
// import { QuestionInterface } from '../../src/interface/question'

// import { firestore } from './firebase';

export default function Create() {
    const [form, setForm] = useState({
        uuid: uuidv4(),
        title: "No title",
        desc: "Form description"
    })
    const [questions, setQuestions] = useState([
        {
            uuid: uuidv4(),
            qType: "checkbox",
            title: "Question",
            desc: "Question description",
            options: [
                {
                    uuid: uuidv4(),
                    title: "Option",
                    desc: "Option description",
                }
            ]
        }
    ])

    const updateTitle = (evt) => {
        const cp = {...form}
        cp.title = evt.target.value
        setForm(cp)
    }

    const updateDesc = (evt) => {
        const cp = {...form}
        cp.desc = evt.target.value
        setForm(cp)
    }

    const updateQtype = (evt, uuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const cp = [...questions]
        cp[index].qType = evt.target.value

        if(cp[index].qType === "text") {
            cp[index].options = null
        } else {
            cp[index].options = [
                {
                    uuid: uuidv4(),
                    title: "Option",
                    desc: "Option description",
                }
            ]
        }

        setQuestions(cp)
    }

    const addQuestion = () => {
        const cp = [...questions]
        cp.push({
            uuid: uuidv4(),
            qType: "checkbox",
            title: "Question",
            desc: "Question description",
            options: [
                {
                    uuid: uuidv4(),
                    title: "Option",
                    desc: "Option description"
                }
            ]
        })
        setQuestions(cp)
    }

    const delQuestion = (uuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const cp = [...questions]
        cp.splice(index, 1)
        setQuestions(cp)
    }

    const updateQtitle = (evt, uuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const cp = [...questions]
        cp[index].title = evt.target.value
        setQuestions(cp)
    }

    const updateQdesc = (evt, uuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const cp = [...questions]
        cp[index].desc = evt.target.value
        setQuestions(cp)
    }

    const updateOptitle = (evt, uuid, opUuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const opIndex = questions[index].options.findIndex(option => option.uuid === opUuid)
        const cp = [...questions]
        cp[index].options[opIndex].title = evt.target.value
        setQuestions(cp)
    }

    const updateOpdesc = (evt, uuid, opUuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const opIndex = questions[index].options.findIndex(option => option.uuid === opUuid)
        const cp = [...questions]
        cp[index].options[opIndex].desc = evt.target.value
        setQuestions(cp)
    }

    const addOption = (uuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const cp = [...questions]
        cp[index].options.push({
            uuid: uuidv4(),
            title: "Option",
            desc: "Option description"
        })
        setQuestions(cp)
    }

    const delOption = (uuid, opUuid) => {
        const index = questions.findIndex(question => question.uuid === uuid)
        const opIndex = questions[index].options.findIndex(option => option.uuid === opUuid)
        const cp = [...questions]
        cp[index].options.splice(opIndex, 1)
        setQuestions(cp)
    }

    const uploadForm = () => {
        axios.post(`http://localhost:3000/forms/uploadform`, {
            form: form,
            questions: questions
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
            });
    }


    return (
        <div className={styles.frame}>
            <div className={styles.titleBlock}>
                <input className={styles.title} value={form.title} onChange={(evt) => updateTitle(evt)} />
                <input className={styles.desc} value={form.desc} onChange={(evt) => updateDesc(evt)} />
            </div>
            {questions.map((question) => {
                return (
                    <div key={question.uuid}>
                        <Question
                            question={question}
                            updateQtype={updateQtype}
                            updateQtitle={updateQtitle}
                            updateQdesc={updateQdesc}
                            updateOptitle={updateOptitle}
                            updateOpdesc={updateOpdesc}
                            addOption={addOption}
                            delOption={delOption}
                            delQuestion={delQuestion} />
                    </div>
                )
            })}
            <div className={`${styles.QBtn} ${styles.addQBtn}`} onClick={(evt) => addQuestion()}>+</div>
            <br />
            <div className={styles.createBtn} onClick={(evt) => uploadForm()}>Create</div>
            <div style={{ height: "100vh" }}></div>
        </div>
    )

}

const Question = ({ question, updateQtype, updateQtitle, updateQdesc, updateOptitle, updateOpdesc, addOption, delOption, delQuestion }) => {
    if (question.qType === "checkbox" || question.qType === "radio") {
        return (
            <div className={styles.QBlock}>
                <div className={styles.firstRow}>
                    <input className={styles.inputQTitle} value={question.title} onChange={(evt) => updateQtitle(evt, question.uuid)} />
                    <div style={{ flexGrow: 1 }}></div>
                    <select className={styles.selector} value={question.qType} onChange={(evt) => updateQtype(evt, question.uuid)}>
                        <option value="checkbox">checkbox</option>
                        <option value="radio">radio</option>
                        <option value="text">text</option>
                    </select>
                </div>
                <input className={styles.inputQDesc} value={question.desc} onChange={(evt) => updateQdesc(evt, question.uuid)} />
                {question.options.map((option) => {
                    return (
                        <div key={option.uuid} className={styles.optionLine}>
                            <div className={styles.box}></div>
                            <div className={styles.inputContainer}>
                                <input className={styles.option} value={option.title} onChange={(evt) => updateOptitle(evt, question.uuid, option.uuid)} />
                                <input className={styles.desc} value={option.desc} onChange={(evt) => updateOpdesc(evt, question.uuid, option.uuid)} />
                            </div>
                            <div className={`${styles.OpBtn} ${styles.delOpBtn}`} onClick={(evt) => delOption(question.uuid, option.uuid)}>x</div>
                        </div>
                    )
                })}
                <div className={styles.OpBtn} onClick={(evt) => addOption(question.uuid)}>+</div>
                <div className={`${styles.QBtn} ${styles.delQBtn}`} onClick={(evt) => delQuestion(question.uuid)}>-</div>
            </div>
        )
    } else if (question.qType === "text")
        return (
            <div className={styles.QBlock}>
                <div className={styles.firstRow}>
                    <input className={styles.inputQTitle} value={question.title} onChange={(evt) => updateQtitle(evt, question.uuid, option.uuid)} />
                    <div style={{ flexGrow: 1 }}></div>
                    <select className={styles.selector} value={question.qType} onChange={(evt) => updateQtype(evt, question.uuid)}>
                        <option value="checkbox">checkbox</option>
                        <option value="radio">radio</option>
                        <option value="text">text</option>
                    </select>
                </div>
                <input className={styles.inputQDesc} value={question.desc} onChange={(evt) => updateQdesc(evt, index)} />
                <div className={`${styles.QBtn} ${styles.delQBtn}`} onClick={(evt) => delQuestion(question.uuid)}>-</div>
            </div>
        )
}