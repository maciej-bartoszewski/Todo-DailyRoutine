import {getFact} from './API/RandomFactApi'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function WelcomeComponent(){
    const [fact, setFact] = useState('')
    const parms = useParams()

    useEffect(() => assignFact(), []);

    function assignFact(){
        getFact()
        .then(result => {
            setFact(result.data.text)
        })
    }

    return(
        <div className="WelcomeComponent">
            <div className="info">
                <h2>Welcome {parms.username}!</h2>
                You are signed it! Fell free to organize your Todos and Daily Routine!
            </div>

            <div className="fact">
                <h5>Random fact:</h5>
                {fact}
            </div>
        </div>
    )
}