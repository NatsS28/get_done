import {useState,useEffect} from 'react'

function UseLocalStateStorage(key,defaultValue) {
    const [state, setState] = useState(() => {
        let val;
        try {
            val = JSON.parse(localStorage.getItem(key)) || defaultValue;
        } catch (e) {
            val = defaultValue;
        }
        return val;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
}

export default UseLocalStateStorage