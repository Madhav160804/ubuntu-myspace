import classnames from "classnames";
import React from 'react'

interface SingleGridProps {
    idx: number;
    value: 0 | 1 | 2;
    onClick: (idx: number) => void;
}

const SingleGrid = (props: SingleGridProps) => {

    const { value, idx, onClick } = props;

    const clickHandler = () => {
        if(value !== 0)
            return ;

        return onClick(idx);
    }

    return (
        <div 
            className={classnames("tictactoe-single-grid ", {"cursor-pointer": value === 0},"col-3")}
            onClick={clickHandler}
        >
            {
                value === 1 ? 
                    "X"
                    :
                    value === 2 ?
                        "O"
                        :
                        ""

            }
        </div>
    )
}

export default SingleGrid
