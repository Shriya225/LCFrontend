import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/authSlice';
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../redux/apiSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
 const [login, { isLoading: isLoginLoading }] = useLoginMutation();
 const onSubmit =async  (data) => {
    console.log(data) 
    try{

      const response = await login(data).unwrap();
      dispatch(setAccessToken(response.access));
      toast.success("Logged in!!!!");
      navigate("/");
    } 
    catch(err){
      console.log(err);
      toast.error("Invalid Credentials..");
      
    }

  }
  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            {...register('username', { required: true })}
          />
          {errors.username && <span className="text-danger">Username is required</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="text-danger">Password is required</span>}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login