import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import eye from "../../image/eye-solid.svg"
import pen from "../../image/pen-solid.svg"
import del from "../../image/trash-solid.svg"
import { deletePost } from "../../store/postSlice"
import Swal from 'sweetalert2'

const Post = ({ item }) => {

    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const showPost = () => {

        Swal.fire({
            title: item.title,
            text: item.body,
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,

        })
    }



    
    const delHand = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePost(item.id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const navigatToEdit = (item)=>{

        
        navigate(`/updatePost/${item.id}`)
        
           
        
    }

    return (

        <tr className="table-info">
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td>
                <img className="icons mb-2" src={pen} alt="" onClick={()=>navigatToEdit(item)} />
                <img className="icons mb-2" src={eye} alt="" onClick={showPost} />
                <img className="icons mb-2" src={del} alt="" onClick={delHand} />
            </td>
        </tr>

    )
}

export default Post