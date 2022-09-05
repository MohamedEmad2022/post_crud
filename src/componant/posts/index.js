import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsData } from '../../store/postSlice';

import Post from '../post';


const Posts = () => {

    const { posts, isLoading, error } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(postsData())

    }, [dispatch])


    return (
        <>
            {error ?
                <div>{error}</div>
                :
                null
            }
            {isLoading ? "Loading...." :
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th className="col-lg-1" scope="col">ID</th>
                            <th className="col-lg-3" scope="col">Title</th>
                            <th className="col-lg-4" scope="col">Body</th>
                            <th className="col-lg-3" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item, ind) => {
                                return <Post item={item} key={ind} />
                            })

                        }
                    </tbody>
                </table>
            }

        </>
    )
}


export default Posts