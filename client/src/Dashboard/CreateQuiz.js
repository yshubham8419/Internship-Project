import "./modal.css";
import React, { useContext, useEffect, useState } from 'react';
import { white } from "../Constants";
import { AppContext } from "../AppContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


async function SendQuiz(serverUrl, data, onSuccess, onFailure) {
    const url = serverUrl + "/createQuiz"
    axios.post(url, data)
        .then(response => {
            console.log(response.data);
            if (response.data.success) onSuccess(response.data)
            else onFailure(response.data)
        })
        .catch(error => {
            onFailure({ 'message': error })
        })
}

function CreateQuiz(props) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [numbers, setNumbers] = useState([1])
    const [question, setQuestion] = useState([""]);
    const [option, setOption] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState([""]);
    const [current, setCurrent] = useState(0);
    const [updatevar, update] = useState(false);
    const [sending, setSending] = useState(false);
    const [QuizID, setQuizID] = useState();
    const [Data, setData] = useState({
        quizTitle: "",
        quizDescription: "",
        question: "",
        option: "",
        answer: ""
    });
    const [modal, setModal] = useState(false)


    const { serverUrl, sessionId } = useContext(AppContext)
    const navigate = useNavigate();

    useEffect(
        () => {
            if (!sessionId) {
                navigate("/login");
            }
            return () => {

            };
        }, []
    );

    // UseEffect for pop up menu
    useEffect(() => {
        document.querySelectorAll(".copy-link").forEach(copyLinkContainer => {
            const inputField = copyLinkContainer.querySelector(".Link");
            const copybutton = copyLinkContainer.querySelector(".copyButton");
            inputField.addEventListener("focus", () => inputField.select())
            copybutton.addEventListener("click", () => {
                const text = inputField.value;
                console.log(text)
                inputField.select();
                navigator.clipboard.writeText(text);
            })
        })
    }, [])
    // END

    const onSendSuccess = (data) => {
        setSending(false)
        // alert('quizId: '+data.quizId)
        setQuizID(data.quizId);
    }

    // console.log("Line 56 "+QuizID)

    const onSendFailure = (data) => {
        setSending(false)
    }

    const onAddPress = () => {
        const newquestion = [...question]; newquestion.push("")
        const newoption = [...option]; newoption.push("", "", "", "")
        const newanswer = [...answer]; newanswer.push("")
        const newnumbers = [...numbers]; newnumbers.push(numbers.length + 1)
        setAnswer(newanswer);
        setQuestion(newquestion)
        setOption(newoption)
        setNumbers(newnumbers)
        setCurrent(newnumbers.length - 1)
        console.log(question, option, answer, numbers)
    }

    const onDeletePress = () => {
        const newquestion = [...question]; newquestion.splice(current, 1);
        const newoption = [...option]; newoption.splice(current * 4, 4);
        const newanswer = [...answer]; newanswer.splice(current, 1);
        const newnumbers = [...numbers]; newnumbers.splice(newnumbers.length - 1, 1);
        if (newnumbers.length === 0) {
            newquestion.push("")
            newoption.push("", "", "", "")
            newanswer.push("")
            newnumbers.push(1)
        }
        setAnswer(newanswer);
        setQuestion(newquestion)
        setOption(newoption)
        setNumbers(newnumbers)
        setCurrent(newnumbers.length - 1)
    }

    const handleItemClick = (item) => {
        setCurrent(item - 1);
    };

    const onSubmit = () => {

        let newanswer = []
        for (const element of answer) {
            if (element.charAt(0) === 'a' || element.charAt(0) === 'A')
                newanswer.push(1)
            else if (element.charAt(0) === 'b' || element.charAt(0) === 'B')
                newanswer.push(2)
            else if (element.charAt(0) === 'c' || element.charAt(0) === 'C')
                newanswer.push(3)
            else if (element.charAt(0) === 'd' || element.charAt(0) === 'D')
                newanswer.push(4)
            else
                newanswer.push(5)
        }
        const data = {
            quizTitle: title,
            quizDescription: description,
            question: question,
            option: option,
            answer: newanswer
        };
        setData(data);
        console.log(Data, QuizID)
        setSending(true);
        SendQuiz(serverUrl, data, onSendSuccess, onSendFailure);
        window.location.href = "#hidden";
    }
    const headHome = () => {
        window.location.href = "/FindQuiz";
    }

    const styles = {
        pageContainer: {
            height: '94vh',
            width: '80vw',
            backgroundColor: 'white',
            marginLeft: '5vw',
            marginTop: '6vh',
            borderTopLeftRadius: '2vw',
            borderTopRightRadius: '2vw',
            display: 'flex',
            flexDirection: 'row',
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50vw',
            marginTop: '1.5vh',
        },
        questionTab: {
            height: '87vh',
            width: '34%',
            backgroundColor: '#A1A1A288',
            marginTop: '4vh',
            borderRadius: '2vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        heading: {
            fontSize: '5vh',
            width: '44vw',
            height: '5vh',
            fontWeight: 'Bold',
            margin: '2vh 0 3.5vh 0',
        },
        formContainer2: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '0',
            width: '44vw',
            backgroundColor: '#A1A1A288',
            height: '79vh',
            borderRadius: '3vh',
            justifyContent: 'space-around'

        },
        titleAndDescription: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginTop: '2vh',
            backgroundColor: white,
            height: '18vh',
            width: '40vw',
            borderRadius: '3vh',
            alignItems: 'center'
        },
        questionContainer: {
            height: '12vh',
            width: '40vw',
        },
        optionContainer: {
            height: '6vh',
            width: '40vw',
            borderRadius: '1vh',
            border: 'none',
            backgroundColor: '#A1A1A2',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        newIcon: {
            height: '6vh',
            aspectRatio: 1
        },
        titleContainer: {
            marginTop: '2vh',
            width: '94%',
            height: '45%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',

        },
        descriptionContainer: {
            width: '94%',
            height: '45%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        titleText: {
            display: 'inline-block',
            margin: '0',
            fontSize: '5vh',
            fontWeight:'bold',
        },
        questionText: {
            margin: '0',
            fontSize: '2.7vh',
            fontWeight:'Bold',
        },
        descriptionText: {
            display: 'inline-block',
            margin: '0',
            fontSize: '2.8vh',
            fontWeight:'bold',
            paddingTop:'0.4vh'
        },
        questionInput: {
            flex: '1',
            fontSize: '2vh',
            marginTop: '2vh',
            border: 'none',
            outline: 'none',
            resize: 'none',
            width: '39vw',
            backgroundColor: '#00000000'
        },
        optionInput: {
            flex: 1,
            height: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '2vh',
            marginLeft: '0.5vw'
        },
        optionText: {
            fontSize: '2.3vh',
            marginLeft: '1.5vw'
        },
        questionTxt2: {
            marginTop: '5vh',
            fontSize: '3vh'
        },
        listContainer: {
            height: '30vh',
            width: '21vw',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '10px',
            overflowY: 'scroll',
            marginLeft: '1vw'
        },
        outerListContainer: {
            marginTop: '1vh',
            height: '30vh',
            width: '19vw',
            overflow: 'hidden'
        }
        ,
        button: {
            border: 'none',
            height: '5vh',
            width: '10vw',
            borderRadius: '1vh'
        }

    }

    return (
        <div>
            {/* <Modal toggle={() => { setModal(!modal) }}>
                <ModalHeader toggle={() => { setModal(!modal) }} >Please work!!</ModalHeader>
            </Modal> */}
            <div style={styles.pageContainer} >
                <div style={styles.formContainer}>
                    <h1 style={styles.heading}>Create</h1>
                    <div style={styles.formContainer2}>
                        <div style={styles.titleAndDescription}>
                            <div style={styles.titleContainer}>
                                <h2 style={styles.titleText}>Title:</h2>
                                <textarea value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    style={{ flex: '1', fontSize: '4vh', border: 'none', outline: 'none', resize: 'none', marginLeft: '1vw', fontWeight:'bold', paddingTop:'0' }} ></textarea>
                            </div>
                            <div style={styles.descriptionContainer}>
                                <h2 style={styles.descriptionText}>Description:</h2>
                                <textarea value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    style={{ flex: '1', fontSize: '2.8vh', border: 'none', outline: 'none', resize: 'none', marginLeft: '1vw', fontWeight:'bold', paddingTop:'0' }} ></textarea>
                            </div>
                        </div>
                        <div style={styles.questionContainer}>
                            <h2 style={styles.questionText}>Question {current + 1}:</h2>
                            <textarea style={styles.questionInput}
                                value={question[current]}
                                onChange={(e) => { question[current] = e.target.value; update(!updatevar) }} ></textarea>
                        </div>
                        <button style={styles.optionContainer}>
                            <h2 style={styles.optionText}>A.</h2>
                            <input
                                value={option[current * 4]}
                                onChange={(e) => { option[current * 4] = e.target.value; update(!updatevar) }}
                                style={styles.optionInput}></input>
                        </button>
                        <button style={styles.optionContainer}>
                            <h2 style={styles.optionText}>B.</h2>
                            <input
                                value={option[current * 4 + 1]}
                                onChange={(e) => { option[current * 4 + 1] = e.target.value; update(!updatevar) }}
                                style={styles.optionInput}></input>
                        </button>
                        <button style={styles.optionContainer}>
                            <h2 style={styles.optionText}>C.</h2>
                            <input
                                value={option[current * 4 + 2]}
                                onChange={(e) => { option[current * 4 + 2] = e.target.value; update(!updatevar) }}
                                style={styles.optionInput}></input>
                        </button>
                        <button style={styles.optionContainer}>
                            <h2 style={styles.optionText}>D.</h2>
                            <input
                                value={option[current * 4 + 3]}
                                onChange={(e) => { option[current * 4 + 3] = e.target.value; update(!updatevar) }}
                                style={styles.optionInput}></input>
                        </button>
                        <button style={styles.optionContainer}>
                            <h2 style={styles.optionText}>Correct option:</h2>
                            <input
                                value={answer[current]}
                                onChange={(e) => { answer[current] = e.target.value; update(!updatevar) }}
                                style={styles.optionInput}></input>
                        </button>
                        <img style={styles.newIcon} onClick={onAddPress} src={require('./assets/newIcon.png')}></img>

                    </div>

                </div>
                <div style={styles.questionTab}>
                    <h1 style={styles.questionTxt2}>Questions
                    </h1>
                    <div style={{ width: '20vw', height: '3px', backgroundColor: 'black', marginTop: '1vh' }}></div>
                    <div style={styles.outerListContainer}>
                        <div style={styles.listContainer}>
                            {
                                numbers.map((item, index) => (
                                    <div onClick={(e) => { handleItemClick(index + 1) }} style={{
                                        width: '3vw', height: '3vw', backgroundColor: index === current ? 'white' : 'black',
                                        borderRadius: '0.5vw', color: index === current ? 'black' : 'white', alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <h1 style={{ fontSize: '2vw' }}>{numbers[index]}</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{ width: '20vw', height: '3px', backgroundColor: 'black', marginTop: '1vh' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '4vh' }}>
                        <div style={{ width: '3vw', height: '3vw', backgroundColor: 'black', borderRadius: '0.5vw' }}></div>
                        <h2 style={{ width: '10vw', marginLeft: '1vw', fontSize: '2.5vh' }}>Completed</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1vh' }}>
                        <div style={{ width: '3vw', height: '3vw', backgroundColor: 'white', borderRadius: '0.5vw' }}></div>
                        <h2 style={{ width: '10vw', marginLeft: '1vw', fontSize: '2.5vh' }}>Current</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '12vh', width: '21vw', justifyContent: 'space-between' }}>
                        <button onClick={onDeletePress} style={styles.button} >Delete</button>
                        <button onClick={onSubmit} style={styles.button}>{sending ? "Sending" : "Submit"}</button>

                        {/* Modal */}

                        <div className="overlay" id='hidden'>
                            <div className="containerInvisible">
                                <b><h1> Your Quiz has been hosted</h1></b><br />
                                <h2 className='title'>{Data.quizTitle}</h2>
                                <p className='description'>{Data.quizDescription}</p>
                                <p className='total'>Total questions : {Data.question.length}</p>
                                <div className="link">
                                    {/* <h3>Link:</h3> */}
                                    <div className="copy-link">
                                        <input type="text" className="Link" placeholder={QuizID} value={QuizID}/><button className='copyButton'><span className="material-icons">content_copy</span></button>
                                    </div><br />
                                    <button className='btn btn-primary' id='homeButton' onClick={headHome}>Head to HomePage</button>
                                </div>
                            </div>
                        </div>
                        {/* END */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateQuiz;