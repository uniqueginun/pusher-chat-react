import { Inertia } from '@inertiajs/inertia'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ChatMessageCompose from './ChatMessageCompose'
import ChatMessages from './ChatMessages'
import ChatUserCard from './ChatUserCard'

function ChatBox({ user, participants }) {


    const [sending, setSending] = useState(false)

    const [loadingChat, setLoadingChat] = useState(false)

    const [currentUser, setCurrentUser] = useState(null)

    const [conversation, setConversation] = useState([])

    const loadChatWith = () => {
        if (currentUser === null) return

        setLoadingChat(true)

        axios.get(route('chat.load', currentUser.id))
            .then(({ data }) => setConversation(data))
            .finally(() => setLoadingChat(false))
    }

    useEffect(() => loadChatWith(), [currentUser])

    const sendMessage = messageText => {
        if (currentUser === null) return

        setSending(true)

        axios.post(route('compose'), {
            body: messageText,
            receiver: currentUser.id
        })
        .then(({ data }) => {
            setConversation([...conversation, data])
        })
        .finally(() => {
            setSending(false)
        })
    }

    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col py-6">
            <ChatUserCard user={user} participants={participants} selectUser={user => setCurrentUser(user || null)} />

            {! currentUser ? 
                <div className="py-6 text-red-500 text-lg font-bold">Please select a user to chat with!</div> 
                    : loadingChat ? <div className="mt-5 text-lg text-indigo-500 text-center font-bold">loading chats with {currentUser?.name}...</div> : (
                <>
                    <ChatMessages conversation={conversation} />
                    <ChatMessageCompose send={sendMessage} sending={sending} />
                </>
            )}
            
        </div>
    )
}

export default ChatBox