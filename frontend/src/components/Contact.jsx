import React from 'react'
import { Link } from 'react-router-dom'
import { deleteContact } from '../api/ContactService'
import { toastError, toastSuccess } from '../api/ToastService';



const Contact = ({ contact, getAllContacts }) => {

    const handleDelete = async(id) =>{
        try {
            const userConfirmed= window.confirm("Are you sure you want to delete this record");
            if(userConfirmed)
                {
                    await deleteContact(id);
                    toastSuccess("Contact Succesfully Deleted");
                    getAllContacts();
                }
            else
            {
                console.log("Delete operation canceled by the user.");
            }
        } catch (error) {
            console.log(error);
            toastError(error.message)
        }
    }
  return (
    <div className="contact__item">
            <div className="contact__header">
                <div className="contact__image">
                    <img src={contact.photoUrl} alt={contact.name}  />
                </div>
                <div className="contact__details">
                    <p className="contact_name">{contact.name.substring(0, 15)} </p>
                    <p className="contact_title">{contact.title}</p>
                </div>
                <div className='contact__functions' id='functions'>
                <Link to={`/contacts/${contact.id}`} className='contact__functions'>
                    <p><i className="bi bi-pencil"></i></p>
                </Link>

                    <p><i className="bi bi-trash" onClick={()=> handleDelete(contact.id)}></i></p>
                </div>
            </div>
            <div className="contact__body">
                <p><i className="bi bi-envelope"></i> {contact.email.substring(0, 20)} </p>
                <p><i className="bi bi-geo-alt"></i> {contact.address}</p>
                <p><i className="bi bi-telephone"></i> {contact.phone}</p>
                <p>{contact.status === 'Active' ? <i className='bi bi-check-circle' ></i> : 
                    <i className='bi bi-x-circle'></i>} {contact.status}</p>
            </div>
        </div>
  )
}

export default Contact