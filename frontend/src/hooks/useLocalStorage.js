import React, { useState, useEffect } from 'react' 

/** Custom hook to keep state data synced with localStorage using passed-in key. Defaults to firstValue if nothing in localStorage. Used with saving user token. */
const useLocalStorage = (key, firstValue=null) => {
    const initialValue = localStorage.getItem(key) || firstValue 
    const [item, setItem] = useState(initialValue)

    // useEffect hook
    useEffect(function setKeyInLocalStorage() {
        if(item === null) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, item)
        }
    }, [key,item])
    return [item, setItem] 
}

export default useLocalStorage