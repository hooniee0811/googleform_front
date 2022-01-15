import styles from '../../styles/FormUI.module.css'
import { useState } from 'react'

export default function Form() {
    const [tab, setTab] = useState("question")

    const changeTabQ = (evt) => {
        setTab("question")
    }
    const changeTabR = (evt) => {
        setTab("response")
    }
    const changeTabS = (evt) => {
        setTab("setting")
    }

    return <>
        <div className={styles.topRow}>
            <div className={styles.toolTab}>
                <div className={styles.left}></div>
        
                <div className={styles.right}>
                    <div className={styles.btn}></div>
                    <div className={styles.btn}></div>
                    <div className={styles.btn}></div>
                    <div className={styles.btn}></div>
                    <div className={styles.sendBtnContainer}>
                        <div className={styles.sendBtn}>Send</div>
                    </div>
                    <div className={styles.btn}></div>
                    <div className={styles.btn}></div>
                </div>
            </div>
            <div className={styles.viewTab}>
                <div className={tab === "question" ? styles.tabBtnQactive : styles.tabBtnQ} value="question" onClick={(evt) => changeTabQ(evt)}>Questions</div>
                <div className={tab === "response" ? styles.tabBtnQactive : styles.tabBtnR} value="response" onClick={(evt) => changeTabR(evt)}>Responses</div>
                <div className={tab === "setting" ? styles.tabBtnQactive : styles.tabBtnS} value="setting" onClick={(evt) => changeTabS(evt)}>Settings</div>
            </div>
        </div>

        <button className={`${styles.btns} ${styles["btn-success"]}`}>btn</button>
    </>
}
