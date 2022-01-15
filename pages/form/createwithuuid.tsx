import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from '../../styles/Form.module.css'
import { QuestionInterface } from '../../src/interface/question'

// import { firestore } from './firebase';

export default function Create() {
    const [title, setTitle] = useState<string>("No title")
    const [desc, setDesc] = useState<string>("Form description")
    const [question, setQuestion] = useState<Array<QuestionInterface>>([
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

    const updateTitle = (evt: ChangeEvent<HTMLInputElement>) => {
        setTitle(evt.target.value)
    }

    const updateDesc = (evt: ChangeEvent<HTMLInputElement>) => {
        setDesc(evt.target.value)
    }

    const updateQtype = (evt: { target: { value: string; }; }, uuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const cp = [...question]
        cp[index].qType = evt.target.value
        setQuestion(cp)
    }

    const addQuestion = () => {
        const cp = [...question]
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
        setQuestion(cp)
    }

    const delQuestion = (uuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const cp = [...question]
        cp.splice(index, 1)
        setQuestion(cp)
    }

    const updateQtitle = (evt: { target: { value: string; }; }, uuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const cp = [...question]
        cp[index].title = evt.target.value
        setQuestion(cp)
    }

    const updateQdesc = (evt: { target: { value: string; }; }, uuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const cp = [...question]
        cp[index].desc = evt.target.value
        setQuestion(cp)
    }

    const updateOptitle = (evt: { target: { value: string; }; }, uuid: string, opUuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const opIndex = question[index].options.findIndex(option => option.uuid === opUuid)
        const cp = [...question]
        cp[index].options[opIndex].title = evt.target.value
        setQuestion(cp)
    }

    const updateOpdesc = (evt: ChangeEvent<HTMLInputElement>, uuid: string, opUuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const opIndex = question[index].options.findIndex(option => option.uuid === opUuid)
        const cp = [...question]
        cp[index].options[opIndex].desc = evt.target.value
        setQuestion(cp)
    }

    const addOption = (uuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const cp = [...question]
        cp[index].options.push({
            uuid: uuidv4(),
            title: "Option",
            desc: "Option description"
        })
        setQuestion(cp)
    }

    const delOption = (uuid: string, opUuid: string) => {
        const index = question.findIndex(question => question.uuid === uuid)
        const opIndex = question[index].options.findIndex(option => option.uuid === opUuid)
        const cp = [...question]
        cp[index].options.splice(opIndex, 1)
        setQuestion(cp)
    }


    return (
        <div className={styles.frame}>
            <div className={styles.titleBlock}>
                <input className={styles.title} value={title} onChange={(evt) => updateTitle(evt)} />
                <input className={styles.desc} value={desc} onChange={(evt) => updateDesc(evt)} />
            </div>
            {question.map((question) => {
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
            <div className={styles.createBtn}>Create</div>
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
                    <input className={styles.inputQTitle} value={question.title} onChange={(evt) => updateQtitle(evt, index)} />
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