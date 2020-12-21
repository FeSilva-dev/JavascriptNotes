import React, { useState } from 'react'
import HeaderLogged from '../../../components/header_logged/index'
import Notes from '../../../components/notes/index'

const NotesScreen = () => {

    const [isOpen, setIsOpen] = useState(false)

    return(
        <div className="note">
            <HeaderLogged setIsOpen={setIsOpen} />
            <Notes setIsOpen={setIsOpen} isOpen={isOpen}/>
        </div>
    );
}

export default NotesScreen