import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useDispatch,useSelector } from 'react-redux'
import { getServices, setSearchTerm } from '../components/store/serviceSlice';
import Spinner from '../components/tools/Spinner';
const Services = () => {
    const activePage = 1;
    const dispatch = useDispatch();
    const { data:services, loading ,error, message, searchTerm } = useSelector(state => state.services)
    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value.toLowerCase()))
    }
    const handlePageClick = (event) => {
        const activePage = event.selected + 1;
       dispatch(getServices({activePage}))
    }
    useEffect(() => {
        dispatch(getServices({activePage}))
        if(error){
            console.log(message)
        }
    }, [dispatch,error,message])
    //Search Services
    let data = null;
    if(services.service_list !==undefined){
         data = services.service_list.filter((item)=>item.title.toLowerCase().includes(searchTerm))
    }
    return (
        <>
            <div className="pagetitle">
                <h1>Services</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Services</li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header justify-content-between d-flex">
                                <div><Link className='btn btn-success' to="/service/create">Create Service</Link></div>
                                <div><input name='search'value={searchTerm} onChange={handleSearch} id='search' type="text" className='form-control w-75' /></div>
                            </div>
                            {loading ? (
                               <div className='text-center'><Spinner /></div>
                            ):(
                                <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>SL No</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.map((service) => (
                                        <tr key={service.service_id}>
                                            <td>{service.service_id}</td>
                                            <td>{service.title}</td>
                                            <td>{service.description}</td>
                                            <td><img src={service.icon} width="80px" height="70px" alt="" /></td>
                                            <td>
                                                <button  className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            )}
                            {
                                services.pagination &&
                                <nav className='mx-5'>
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={services?.pagination.total_pages??1}
                                        pageCount={services?.pagination.total_pages??1}
                                        previousLabel="< previous"
                                        renderOnZeroPageCount={services?.pagination.total_pages??1}
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
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services