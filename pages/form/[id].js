import { useRouter } from 'next/router'
import styles from '../../styles/Form.module.css'
import axios from "axios"

export default function Post({ form, questions }) {

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
						/>
					</div>
				)
			})}
			<br />
			<div style={{ height: "100vh" }}></div>
		</div>
	)
}

const Question = ({ question }) => {
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
			</div>
		)
}

export async function getServerSideProps(context) {
    const { id } = context.query
    console.log(id)
	const res = await axios.get(`http://localhost:3000/forms/${id}`)

	const form = res.data.form
	const formQuestions = res.data.formQuestions
	const formQuestionOptions = res.data.formQuestionOptions
	const questions = []

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
			questions: questions
		}
	}
}