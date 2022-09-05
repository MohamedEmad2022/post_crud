import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updatePost, getPost } from "../../store/postSlice"


const UpdatePost = () => {

    const [update, setUpdate] = useState({
        title: "",
        body: ""
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const { post } = useSelector(state => state.post)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost(id))

    }, [dispatch, id])

    useEffect(() => {

        setUpdate(post)
    }, [post])

    const handelChange = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: [e.target.value]
        })
    }
    const editHan = (e, id) => {
        e.preventDefault(null)

        dispatch(updatePost(update))
        navigate(`/`)
    }

    return (
        <>
            {update &&
                <div className="container text-center">
                    <div className="row">
                        <h2>Edite Post</h2>
                        <form onSubmit={editHan}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" name="title" id="title" value={update.title} onChange={handelChange} />
                            </div>
                            <div className="input-group mb-3">
                                
                                <textarea className="form-control" name="body" id="body" value={update.body} onChange={handelChange}></textarea>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={editHan} >Save Change</button>

                        </form>

                    </div>
                </div>

            }
        </>

    )
}

export default UpdatePost