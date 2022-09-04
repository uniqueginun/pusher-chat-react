import React from 'react'

function UsersBoard({ participants, selectUser }) {

    const handleUserSelection = ({ target }) => selectUser(participants.find(user => user.id == target.value))

    return (
        <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
                <select onChange={handleUserSelection} className="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                    <option value="">Select a user to message</option>
                    {participants.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
            </div>
        </div>
    )
}

export default UsersBoard