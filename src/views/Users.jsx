import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import ReactPaginate from 'react-paginate';
import Spinner from '../components/tools/Spinner';
import { useStateContext } from '../context/ContextProvider';
const Users = () => {
    const { notification_msg, setNotification } = useStateContext();
    const [users, setUsers] = useState();
    const [pageRangeDisplayed, setpageRangeDisplayed] = useState(1);
    const [loading, setLoading] = useState(false);
    const getUserList = (activePage) => {
        setLoading(true);
        axiosClient.post('/user/list?page=' + activePage)
            .then(({ data }) => {
                const userList = data.data.user_list;
                const totalPages = data.data.pagination.total_pages;
                setUsers(userList);
                setpageRangeDisplayed(totalPages);
                setLoading(false)
            });
    }
    const handlePageClick = (event) => {
        getUserList(event.selected + 1);
    }
    const onDelete = (user_id) => {
        const data = {
            user_id
        }
        setLoading(true)
        axiosClient.post('/user/delete', data)
            .then(({ data }) => {
                if (data.status === true) {
                    const newUsers = users.filter((user) => {
                        return user.user_id !== user_id;
                    });
                    setNotification(data.message)
                    setUsers(newUsers);
                    setLoading(false);
                }
            })
    }

    useEffect(() => {
        getUserList();
    }, [])

    return (
        <>
            <div className="pagetitle">
                <h1>Users</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Users</li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header justify-content-between">
                                <div><div className="alert aler-success">
                                    {notification_msg && <div>
                                        {notification_msg}
                                    </div>}
                                </div></div>
                                <div><Link to='/user/create' className='btn btn-success'>Create New</Link></div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>SL No</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading && <tbody>
                                    <tr>
                                        <td colSpan="5" className="text-center"><Spinner /></td>
                                    </tr>
                                </tbody>}
                                {!loading && <tbody>
                                    {users && users.map((user) => (
                                        <tr key={user.user_id}>
                                            <td>{user.user_id}</td>
                                            <td>{user.user_name}</td>
                                            <td>{user.user_email}</td>
                                            <td>
                                                <Link to={`/user/edit/${user.user_id}`} className='btn btn-primary'>Edit</Link>
                                                <button onClick={() => onDelete(user.user_id)} className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                }
                            </table>
                            <nav className='mx-5'>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={pageRangeDisplayed}
                                    pageCount={pageRangeDisplayed}
                                    previousLabel="< previous"
                                    renderOnZeroPageCount={pageRangeDisplayed}
                                    className='pagination'
                                    pageClassName='page-item'
                                    pageLinkClassName='page-link'
                                    activeLinkClassName='active'
                                    previousClassName='page-item'
                                    nextClassName='page-item'
                                    previousLinkClassName='page-link'
                                    nextLinkClassName='page-link'
                                    disabledClassName='disabled'
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Users