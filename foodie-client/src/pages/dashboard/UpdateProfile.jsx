// import { updateProfile } from 'firebase/auth'
// import React, { useContext } from 'react'
// import { useForm } from 'react-hook-form'
// import { AuthContext } from '../../contexts/AuthProvider'

// const UpdateProfile = () => {
//     const{updateUserProfile}=useContext(AuthContext)
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//       } = useForm()

//       const onSubmit =(data)=>{
//         const name=data.name;
//         const photoURL=data.photoURL;

//         updateUserProfile(name,photoURL).then(() => {
//             // Profile updated!
//             // ...
//           }).catch((error) => {
//             // An error occurred
//             // ...
//           });
//       }


//   return (
//     <div className='flex items-center justify-center h-screen'>
//     <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//     <form  onSubmit={handleSubmit(onSubmit)} className="card-body">
//     <h3 className='font-bold'>Update Your Profile</h3>
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Name</span>
//         </label>
//         <input {...register("name")} type="text" placeholder="name" className="input input-bordered" required />
//       </div>
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Upload Photo</span>
//         </label>
//         <input {...register("photoURL")} type='text' placeholder='photoURL' className='input input-bordered' required/>
//         {/* <input type="file" className="file-input w-full max-w-xs" /> */}
        
//       </div>
//       <div className="form-control mt-6">
//         <button className="btn bg-green text-white">Update</button>
//       </div>
//     </form>
//   </div>
// </div>
//   )
// }

// export default UpdateProfile
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import { updateProfile } from 'firebase/auth';

const UpdateProfile = () => {
    const { currentUser } = useContext(AuthContext); // Assuming currentUser is provided by AuthContext
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const name = data.name;
        const photoURL = data.photoURL;

        try {
            await updateProfile(currentUser, {
                displayName: name,
                photoURL: photoURL
            });
            console.log('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h3 className='font-bold'>Update Your Profile</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name")} type="text" placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input {...register("photoURL")} type='text' placeholder='Photo URL' className='input input-bordered' required />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-green text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
