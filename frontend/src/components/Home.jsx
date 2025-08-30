
import { useForm } from 'react-hook-form'
import { useAddEntryMutation } from '../redux/apiSlice';
import { toast } from 'react-toastify';
function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm()
 const [addEntry,{isLoading:isAddEntryLoading}]=useAddEntryMutation();
  const onSubmit = async(data) => {
    console.log('Roll Number:', data.roll_no);
    try{

      const res=await addEntry(data).unwrap();
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
    </div>
  )
}

export default Home
