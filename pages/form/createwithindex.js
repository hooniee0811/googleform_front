import { useState } from "react";
import styles from '../../styles/Form.module.css'



export default function Create() {
    const [question, setQuestion] = useState([
        {
            qType: "checkbox",
            title: "",
            desc: "",
            options: [
                {
                    title: "",
                    desc: "",
                }
            ]
        }
    ])

    const updateQtype = (evt, index) => {
        const cp = [...question]
        cp[index].qType = evt.target.value
        setQuestion(cp)
    }

    const addQuestion = () => {
        const cp = [...question]
        cp.push({
            qType: "checkbox",
            title: "",
            desc: "",
            options: [
                {
                    title: "",
                    desc: ""
                }
            ]
        })
        setQuestion(cp)
    }

    const delQuestion = (index) => {
        const cp = [...question]
        cp.splice(index, 1)
        setQuestion(cp)
    }

    const updateQtitle = (evt, index) => {
        const cp = [...question]
        cp[index].title = evt.target.value
        setQuestion(cp)
    }

    const updateQdesc = (evt, index) => {
        const cp = [...question]
        cp[index].desc = evt.target.value
        setQuestion(cp)
    }

    const updateOptitle = (evt, index, opindex) => {
        const cp = [...question]
        cp[index].options[opindex].title = evt.target.value
        setQuestion(cp)
    }

    const updateOpdesc = (evt, index, opindex) => {
        const cp = [...question]
        cp[index].options[opindex].desc = evt.target.value
        setQuestion(cp)
    }

    const addOption = (index) => {
        const cp = [...question]
        cp[index].options.push({
            title: "",
            desc: ""
        })
        setQuestion(cp)
    }

    const delOption = (index, opindex) => {
        const cp = [...question]
        cp[index].options.splice(opindex, 1)
        setQuestion(cp)
    }

    return (
        <div className={styles.frame}>
            {question.map((question, index) => {
                return (
                    <div key={index}>
                        <Question
                            question={question}
                            index={index}
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
            <div className={styles.addQBtn} onClick={(evt) => addQuestion()}>+</div>
        </div>
    )
}

const Question = ({ question, index, updateQtitle, updateQdesc, updateOptitle, updateOpdesc, addOption, delOption, delQuestion }) => {
    if (question.qType === "checkbox" || question.qType === "radio") {
        return (
            <div className={styles.block}>
                <div className={styles.firstRow}>
                    <input className={styles.inputQtitle} placeholder="[question]title" value={question.title} onChange={(evt) => updateQtitle(evt, index)} />
                    <div style={{ flexGrow: 1 }}></div>
                    <select className={styles.selector} value={question.qType} onChange={(evt) => updateQtype(evt, index)}>
                        <option value="checkbox">checkbox</option>
                        <option value="radio">radio</option>
                        <option value="text">text</option>
                    </select>
                </div>
                <input className={styles.inputQdesc} placeholder="[question]description" value={question.desc} onChange={(evt) => updateQdesc(evt, index)} />
                {question.options.map((option, opindex) => {
                    return (
                        <div style={{ paddingLeft: 30 }} key={opindex}>
                            <input placeholder="[option]title" value={option.title} onChange={(evt) => updateOptitle(evt, index, opindex)} />
                            {option.title}
                            <br />
                            <input placeholder="[option]description" value={option.desc} onChange={(evt) => updateOpdesc(evt, index, opindex)} />
                            {option.desc}
                            <br /><br />
                            <button onClick={(evt) => delOption(index, opindex)}>delete option</button>
                        </div>
                    )
                })}
                <br />
                <div style={{ paddingLeft: 30 }}>
                    <button onClick={(evt) => addOption(index)}>add option</button>
                </div>
                <div className={styles.delQBtn} onClick={(evt) => delQuestion(index)}>-</div>
            </div>
        )
    } else if (question.qType === "text")
        return (
            <div style={{ paddingLeft: 30 }}>
                <input placeholder="[option]title" value={question.title} onChange={(evt) => updateQtitle(evt, index)} />
                {question.title}
                <br />
                <input placeholder="[option]description" value={question.desc} onChange={(evt) => updateQdesc(evt, index)} />
                {question.desc}
                <button onClick={(evt) => delQuestion(index)}>delete question</button>
            </div>
        )
}