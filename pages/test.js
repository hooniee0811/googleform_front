// import styles from '../styles/Test.module.css'
// import axios from 'axios'
// import { useEffect, useState } from 'react'


// export default function Test({ categories }) {
//     const [categories, setCategories] = useState([])

//     useEffect(() => {
//     axios.get('http://api.ringleplus.com/api/v4/student/landing/course?locale=en')
//         .then(function (response) {
//             // handle success
//             console.log(response);
//             console.log(response.data)
//             setCategories(response.data.categories)
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
//         .then(function () {
//             // always executed
//         });
//     }, [])

//     useEffect(() => {
//     fetchLandingCourses();
//     }, [])

//     const fetchLandingCourses = () => {
//         axios.get('http://api.ringleplus.com/api/v4/student/landing/course?locale=en')
//             .then(function (response) {
//                 handle success
//                 console.log(response)
//                 console.log(response.data)
//                 setCategories(response.data.categories)
//             })
//             .catch(function (error) {
//                 handle error
//                 console.log(error);
//             })
//             .then(function () {
//                 always executed
//             });
//     }
//     console.log(categories)

//     return <>
//         <div>good</div>
//         <button onClick={(evt) => fetchLandingCourses()}>fetch</button>
//         {categories.map((category, index) => {
//             return <div key={index}>
//                 {category.title}
//                 {category.courses.map((course, index) => {
//                     return <div key={course.id}>
//                         {course.subtitle}
//                         <br />
//                         <img src={course.image_url} style={{ width: 300, height: 200 }}></img>
//                     </div>
//                 })}
//             </div>
//         })}
//     </>

// }

// server side rendering
// /*export async function getServerSideProps() {

//     return (
//         props: {}
//     )
// }*/

// export async function getServerSideProps() {
//     const res = await axios.get('https://api.ringleplus.com/api/v4/student/landing/course?locale=en')
//     const categories = res.data.categories

//     return {
//         props: {
//             categories: categories
//         }
//     }
// }