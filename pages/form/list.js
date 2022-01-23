import { ChangeEvent, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import styles from '../../styles/Form.module.css'
import axios from "axios"
import Link from 'next/link'

export default function List({ forms }) {
	return (
		<div className={styles.frame}>
			{forms.map((form) => {
				return (
					<div key={form.id} className={styles.titleBlock}>
						<div className={styles.title} style={{ position: 'relative' }}>{form.title}</div>
						<div className={styles.desc}>{form.desc}</div>
						<Link href="/form/[id]" as={`/form/${form.id}`}>view</Link>
					</div>
				)
			})}
			<br />
			<div style={{ height: "100vh" }}></div>
		</div>
	)
}

export async function getServerSideProps() {
	const res = await axios.get('http://localhost:3000/forms/')
	const forms = res.data.forms

	return {
		props: {
			forms: forms
		}
	}
}
