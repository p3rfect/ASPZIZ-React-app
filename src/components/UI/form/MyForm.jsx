import React from 'react';

const MyForm = ({list, ...props}) => {
    console.log(props)
    return (
        <div {...props}>
            {list}
        </div>
    );
};

export default MyForm;