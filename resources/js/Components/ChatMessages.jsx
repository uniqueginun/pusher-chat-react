import React from 'react'
import Message from './Message'

function ChatMessages({ conversation }) {
    return (
        <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {! conversation.length ? <div className="text-red-500 text-lg font-bold">You havnt started a conversation with X Yet!</div> : (
                conversation.map((msg, index) => <Message message={msg} key={index+msg.id} />)
            ) }
        </div>
    )
}

export default ChatMessages