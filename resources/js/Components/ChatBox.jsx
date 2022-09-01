import { Inertia } from '@inertiajs/inertia'
import React, { useState, useEffect } from 'react'
import ChatMessageCompose from './ChatMessageCompose'
import ChatMessages from './ChatMessages'
import ChatUserCard from './ChatUserCard'

function ChatBox({ user, participants }) {


    const [sending, setSending] = useState(false)

    const [loadingChat, setLoadingChat] = useState(false)

    const [currentUser, setCurrentUser] = useState(null)

    const loadChatWith = () => {
        if (currentUser === null) return
        Inertia.get(route('chat.load', currentUser), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: ({ props }) => console.log(props),
            onBefore: () => setLoadingChat(true),
            onFinish: () => setLoadingChat(false)
        })
    }

    useEffect(() => loadChatWith(), [currentUser])

    const sendMessage = messageText => {
        const data = {
            body: messageText,
            receiver: 1
        }

        Inertia.post(route('compose'), data, {
            preserveState: true,
            preserveScroll: true,
            onBefore: () => setSending(true),
            onFinish: () => setSending(false)
        })
    }

    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col py-6">
            <ChatUserCard user={user} participants={participants} selectUser={userId => setCurrentUser(userId || null)} />

            {! currentUser ? <div className="py-6 font-bold text-red-400">Please select a user to chat with!</div> : (
                <>
                    <ChatMessages />
                    <ChatMessageCompose send={sendMessage} sending={sending} />
                </>
            )}
            
        </div>
    )
}

export default ChatBox