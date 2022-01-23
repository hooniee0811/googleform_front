import { useState, useEffect } from 'react'

export default function Rsp() {
    const [n, setN] = useState(2)
    const [choiceCnt, setChoiceCnt] = useState(3)
    const [readyCnt, setReadyCnt] = useState(5)
    const [state, setState] = useState("stopped")
    const [userPick, setUserPick] = useState("")
    const [pcPick, setPcPick] = useState("rock")
    const [winRate, setWinRate] = useState({
        user: 0,
        pc: 0
    })

    const [a, setA] = useState(null)
    const [b, setB] = useState(null)


    const startCntDown = () => {
        setState("choosing")
        setN(n => n - 1)
        _a = setInterval(() => {
            setChoiceCnt(choiceCnt => choiceCnt - 1)
        }, 1000)
        setA(_a)

        const random = Math.floor(Math.random() * 3)
        if(random === 0) {
            setPcPick("rock")
        } else if(random === 1) {
            setPcPick("scissors")
        } else {
            setPcPick("paper")
        }
    }

    const justifyWinner = () => {
        var winner = ""
        var cp = {...winRate}
        if (userPick === "rock") {
            if (pcPick === "rock") {
                winner = "draw"
            } else if (pcPick === "scissors") {
                winner = "User"
            } else {
                winner = "PC"
            }
        }
        else if (userPick === "scissors") {
            if (pcPick === "rock") {
                winner = "PC"
            } else if (pcPick === "scissors") {
                winner = "draw"
            } else {
                winner = "User"
            }
        }
        else {
            if (pcPick === "rock") {
                winner = "User"
            } else if (pcPick === "scissors") {
                winner = "PC"
            } else {
                winner = "draw"
            }
        }

        return winner
    }

    useEffect(() => {
        if (choiceCnt === 0) {
            clearInterval(a)
            setState("ready")
            setChoiceCnt(4)

            _b = setInterval(() => {
                setReadyCnt(readyCnt => readyCnt - 1)
            }, 1000)
            setB(_b)
        }

        if (readyCnt === 0) {
            clearInterval(b)
            setUserPick("")
            setReadyCnt(4)

            if (n === 0) {
                setState("stopped")
            } else {
                startCntDown()
            }
        }
    }, [choiceCnt, readyCnt])

    if (state === "stopped") {
        return (
            <div>
                <div>you won {winRate.user} times</div>
                <div>PC won {winRate.pc} times</div>
                <button onClick={evt => startCntDown()}>start game</button>
            </div>
        )
    } else if (state == "choosing") {
        return (
            <div>
                <div>{choiceCnt}</div>
                <button onClick={evt => setUserPick("rock")}>rock</button>
                <button onClick={evt => setUserPick("scissors")}>scissors</button>
                <button onClick={evt => setUserPick("paper")}>paper</button>
                <div>your choice: {userPick}</div>
            </div>
        )
    } else {
        return (
            <div>
                <div>winner: {justifyWinner()}</div>
                <div>User's pick was: {userPick}</div>
                <div>PC's pick was: {pcPick}</div>
                <div>{readyCnt}</div>
            </div>
        )
    }
}