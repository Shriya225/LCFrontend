
import { useForm } from 'react-hook-form'
import { useAddEntryMutation } from '../redux/apiSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm()
 const [addEntry,{isLoading:isAddEntryLoading}]=useAddEntryMutation();
 const [res,setRes]=useState();
  const onSubmit = async(data) => {
    console.log('Roll Number:', data.roll_no);
    try{

      const res=await addEntry(data).unwrap();
      setRes(res);
      toast.success("ok got res");
    }
   catch (err) {
  if (err.data) {
 
    if (err.data.non_field_errors) {
      toast.error(err.data.non_field_errors)
    
    }
    // show field-specific errors
    else if (err.data.roll_no) {
      toast.error(err.data.roll_no)
      
    }
    else {
      toast.error('Something went wrong!')
 
    }
  } else {
    toast.error('Network error or server not reachable!')
  }}
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Enter Roll Number</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Roll Number</label>
          <input
            type="text"
            className="form-control"
            {...register('roll_no', { required: 'Roll number is required' })}
          />
          {errors.rollNumber && (
            <span className="text-danger">{errors.rollNumber.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br />
      <br />
      {res && 
      <div>
        <h1>student details:</h1>
        <h3>Name: {res.student_details.name}</h3>
        <h3>Branch: {res.student_details.branch}</h3>
        <h3>Year: {res.student_details.year}</h3>
        <h3>course: {res.student_details.course}</h3>
        <h2>Total Late Entries: {res.total_count}</h2>
      </div>}
      
    </div>
  )
}

export default Home
