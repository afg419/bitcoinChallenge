import React from 'react'

const Graph = ({ graphApiResponse, handleClick }) => {
     return (
            <div>
                <div>
                    { graphApiResponse.joke }
                </div>
                <button onClick={ handleClick }>
                    Click Me!
                </button>
            </div>
        )
};

export default Graph