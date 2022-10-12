import React, { useState, useEffect } from "react"
import "../style.css"
import DownloadBtn from "./Download"
import Draggable from 'react-draggable';

export default function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/271ps6.jpg"
    })

    const [allMeme, setAllMeme] = useState([])


    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    }, [])


    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prev => ({
            ...prev,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">

                <input
                    type="text"
                    placeholder="First text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Second text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form-button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
                <DownloadBtn />
            </div>

            <div className="meme">
                <img src={meme.randomImage} className="meme-img"
                    alt="meme-img" />
                <Draggable>
                    <h2 className="meme-text top">{meme.topText}</h2>
                </Draggable>
                <Draggable>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                </Draggable>
            </div>
            <p><span>Hint: </span>You can drag and move around the text!</p>
        </main>
    )
}