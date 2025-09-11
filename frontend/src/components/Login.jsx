import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/authSlice';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/apiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaSignInAlt, FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await login(data).unwrap();
      dispatch(setAccessToken(response.access));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch(err) {
      console.log(err);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 160px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px 0',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            {/* Login Card */}
            <Card className="shadow border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{
                height: '5px',
                background: 'linear-gradient(90deg, #0d6efd, #6f42c1)',
                width: '100%'
              }}></div>
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  {/* <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#0d6efd',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '28px',
                    marginBottom: '15px'
                  }}> */}
                    {/* <FaSignInAlt /> */}
                  {/* </div> */}
                  <h2 style={{ color: '#2c3e50' }}>Admin Login</h2>
                  
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                     
                    </label>
                    <div className="position-relative">
                      <input
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        {...register('username', { required: 'Username is required' })}
                        placeholder="Enter your username"
                        style={{ padding: '12px 12px 12px 40px', borderRadius: '8px' }}
                      />
                      <FaUser style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6c757d'
                      }} />
                    </div>
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username.message}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold d-flex align-items-center">
                  
                    </label>
                    <div className="position-relative">
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        {...register('password', { required: 'Password is required' })}
                        placeholder="Enter your password"
                        style={{ padding: '12px 12px 12px 40px', borderRadius: '8px' }}
                      />
                      <FaLock style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6c757d'
                      }} />
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn w-100 py-2 fw-semibold"
                    disabled={isLoginLoading}
                    style={{
                      background: 'linear-gradient(90deg, #0d6efd, #6f42c1)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
                  >
                    {isLoginLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Signing In...
                      </>
                    ) : (
                      <>Login to Dashboard</>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    Restricted access for authorized personnel only
                  </small>
                </div>
              </Card.Body>
            </Card>

            {/* System Info */}
            <div className="text-center mt-4">
              <small className="text-muted">
        
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;