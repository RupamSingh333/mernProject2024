import React from 'react'

const UserData = (props) => {
    return (
        <>
            {
                props.userData.map((curUser) => {
                    const { _id, name, email, role, mobile, status } = curUser;
                    return (
                        <tr key={_id}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{mobile}</td>
                            <td>{role}</td>
                            <td>{status}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default UserData