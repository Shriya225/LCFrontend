import { useForm } from 'react-hook-form';
import { useAddEntryMutation } from '../redux/apiSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { FaUserGraduate, FaClock, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addEntry, { isLoading: isAddEntryLoading }] = useAddEntryMutation();
  const [res, setRes] = useState();
  const [recentSearches, setRecentSearches] = useState([]);

  const onSubmit = async (data) => {
    console.log('Roll Number:', data.roll_no);
    try {
      const result = await addEntry(data).unwrap();
      setRes(result);
      
      // // Add to recent searches (limit to 5)
      // setRecentSearches(prev => {
      //   const updated = [{roll_no: data.roll_no, name: result.student_details.name}, ...prev];
      //   return updated.slice(0, 5);
      // });
      
      toast.success("Student details retrieved successfully!");
    } catch (err) {
      if (err.data) {
        if (err.data.non_field_errors) {
          toast.error(err.data.non_field_errors);
        } else if (err.data.roll_no) {
          toast.error(err.data.roll_no);
        } else {
          toast.error('Something went wrong!');
        }
      } else {
        toast.error('Network error or server not reachable!');
      }
    }
  };

  // Function to determine alert level based on late entries
  const getAlertLevel = (count) => {
    if (count === 0) return 'success';
    if (count < 3) return 'warning';
    return 'danger';
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
          <Col md={8} lg={6}>
            {/* Header with Icon */}
            <div className="text-center mb-4">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#0d6efd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  marginRight: '15px'
                }}>
                  <FaClock />
                </div>
                <h1 style={{ color: '#2c3e50', fontWeight: '700' }}>Latecomer Tracker</h1>
              </div>
              <p className="text-muted">Monitor and manage student punctuality records</p>
            </div>

            {/* Form Card */}
            <Card className="shadow border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{
                height: '5px',
                background: 'linear-gradient(90deg, #0d6efd, #6f42c1)',
                width: '100%'
              }}></div>
              <Card.Body className="p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <FaSearch className="me-2" /> Enter Roll Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.roll_no ? 'is-invalid' : ''}`}
                      {...register('roll_no', { required: 'Roll number is required' })}
                      placeholder="e.g., 21ABC123"
                      style={{ padding: '12px', borderRadius: '8px' }}
                    />
                    {errors.roll_no && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <FaExclamationTriangle className="me-1" /> {errors.roll_no.message}
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn w-100 py-2 fw-semibold"
                    disabled={isAddEntryLoading}
                    style={{
                      background: 'linear-gradient(90deg, #0d6efd, #6f42c1)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
                  >
                    {isAddEntryLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      <>Enter Late Record</>
                    )}
                  </button>
                </form>
              </Card.Body>
            </Card>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Card className="shadow border-0 mt-3" style={{ borderRadius: '10px' }}>
                <Card.Body className="p-3">
                  <h6 className="mb-2">Recent Searches</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Badge 
                        key={index} 
                        bg="light" 
                        text="dark"
                        style={{ cursor: 'pointer' }}
                        onClick={() => document.querySelector('input[name="roll_no"]').value = search.roll_no}
                      >
                        {search.roll_no} ({search.name})
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Results Card */}
            {res && (
              <Card className="shadow border-0 mt-4" style={{ 
                borderRadius: '15px',
                borderLeft: `5px solid var(--bs-${getAlertLevel(res.total_count)})`
              }}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: `var(--bs-${getAlertLevel(res.total_count)})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px'
                      }}>
                        <FaUserGraduate />
                      </div>
                    </div>
                    <h3 style={{ color: '#2c3e50' }}>Student Record</h3>
                    <p className="text-muted">Detailed information and late entry history</p>
                  </div>
                  
                  <Row className="g-3">
                    <Col md={6}>
                      <div className="bg-light p-3 rounded">
                        <small className="text-muted d-block">Name</small>
                        <strong>{res.student_details.name}</strong>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="bg-light p-3 rounded">
                        <small className="text-muted d-block">Branch</small>
                        <strong>{res.student_details.branch}</strong>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="bg-light p-3 rounded">
                        <small className="text-muted d-block">Year</small>
                        <strong>{res.student_details.year}</strong>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="bg-light p-3 rounded">
                        <small className="text-muted d-block">Course</small>
                        <strong>{res.student_details.course}</strong>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className={`p-3 rounded text-center bg-${getAlertLevel(res.total_count)} bg-opacity-10`}>
                        <h5 className="mb-0">
                          Total Late Entries: <Badge bg={getAlertLevel(res.total_count)}>{res.total_count}</Badge>
                        </h5>
                        <small className="text-muted">
                          {res.total_count === 0 
                            ? "Perfect attendance record! 🎉" 
                            : res.total_count < 3 
                              ? "Moderate punctuality issues" 
                              : "Needs immediate attention"
                          }
                        </small>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}

            {/* Stats Footer */}
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

export default Home;