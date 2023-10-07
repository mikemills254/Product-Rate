import React from 'react';

const Button = ({
        IconAfterStyle,
        disabled,
        IconBefore,
        IconAfter,
        type,
        text,
        ContainerStyle,
        IconBeforeStyle,
        onClick,
        renderChildren,
    }) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className={`${ContainerStyle} container flex items-center justify-center w-full h-[2.5rem] bg-[#85b1ff] rounded`}
        >
            <div
                role='button'
                type={type}
                className='bg-slatw-900 w-full h-full flex items-center justify-center gap-2'
                onClick={onClick}
            >
                {IconBefore && <IconBefore className={`${IconBeforeStyle}`} />}
                <p>{text}</p>
                {renderChildren}
                {IconAfter && <IconAfter className={`${IconAfterStyle}`} />}
            </div>
        </button>
    );
};

export default Button;
