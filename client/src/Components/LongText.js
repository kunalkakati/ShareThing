import React, { useState } from 'react'

function LongText({ content, limit }) {
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);
    const style = {
        background: "none",
        border:"none",
        curser: "poiner",
        color: "blue"
    }

    if (content.length <= limit) {
        return <>{content}</>
    }
    if (showAll) {

        return <>
            {content}
            <button style={style} onClick={showLess}>read less</button>
        </>
    }
    const toShow = content.substring(0, limit) + "...";
    return <>
        {toShow}
        <button style={style} onClick={showMore}>read more</button>
    </>
}

export default LongText