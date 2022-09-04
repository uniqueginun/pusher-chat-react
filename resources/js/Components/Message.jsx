import React from 'react'

function Message({ message }) {

    const containerClassList = () => {
        let style = 'flex items-end '
        style += ! message.from_me ? 'justify-end ' : ''
        return style;
    }

    const flexClassList = () => {
        let style = 'flex flex-col space-y-2 text-xs max-w-xs mx-2 '
        style += ! message.from_me ? 'order-1 items-end ' : 'order-2 items-start '
        return style
    }

    const bodyClassList = () => {
        let style = 'px-4 py-2 rounded-lg inline-block '
        style += ! message.from_me ? 'rounded-bl-none bg-gray-300 text-gray-600' : 'rounded-br-none bg-blue-600 text-white'
        return style
    }

    return (
        <div className="chat-message">
            <div className={containerClassList()}>
                <div className={flexClassList()}>
                    <div>
                        <span className={bodyClassList()}>
                            {message.body}
                        </span>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
            </div>
        </div>
    )
}

export default Message