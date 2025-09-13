import { useSearchParams } from "react-router-dom";
import { useGetListQuery } from "../redux/apiSlice";
import { Container, Row, Col, Card, Table, Spinner, Form, Button, Badge } from "react-bootstrap";
import { FaFilter, FaFileExport, FaUsers, FaCalendarAlt, FaGraduationCap, FaSort } from "react-icons/fa";
import DepartmentChart from "./DepartmentChart";

const DashBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
if (!filters.date) {
  filters.date = new Date().toISOString().split("T")[0];
}
  const { data, error, isLoading } = useGetListQuery(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: 'calc(100vh - 160px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Card className="shadow border-0">
          <Card.Body className="text-center py-5">
            <div className="text-danger mb-3" style={{ fontSize: '3rem' }}>⚠️</div>
            <h4 className="text-danger">Error Loading Data</h4>
            <p className="text-muted">Unable to fetch student records. Please try again later.</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      {/* <DepartmentChart/> */} 

      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#0d6efd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              marginRight: '15px'
            }}>
              <FaUsers />
            </div>
            <div>
              <h1 className="h2 mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>Student Dashboard</h1>
              <p className="text-muted mb-0">Manage and monitor student late entries</p>
            </div>
          </div>
        </Col>
      </Row>

      <Card className="shadow border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #0d6efd, #6f42c1)',
          width: '100%'
        }}></div>
        
        <Card.Header className="bg-white border-0 pt-4 pb-3">
          <Row className="align-items-center">
            <Col md={6}>
              <h5 className="mb-0 d-flex align-items-center" style={{ fontWeight: '600', color: '#2c3e50' }}>
                <FaFilter className="me-2 text-primary" />
                Filter Students
              </h5>
            </Col>
            <Col md={6} className="text-md-end">
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={clearFilters}
                disabled={Object.keys(filters).length === 0}
                style={{ borderRadius: '6px', fontWeight: '500' }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          {/* Filters */}
          <Row className="g-3 mb-4">
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-semibold d-flex align-items-center" style={{ fontSize: '0.9rem', color: '#495057' }}>
                  <FaCalendarAlt className="me-2" style={{ color: '#6c757d' }} />
                  Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={filters.date || ""}
                  onChange={handleFilterChange}
                  style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
                />
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-semibold" style={{ fontSize: '0.9rem', color: '#495057' }}>Year</Form.Label>
                <Form.Select 
                  name="year" 
                  value={filters.year || ""} 
                  onChange={handleFilterChange}
                  style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
                >
                  <option value="">All Years</option>
                  <option value="4">4th Year</option>
                  <option value="3">3rd Year</option>
                  <option value="2">2nd Year</option>
                  <option value="1">1st Year</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-semibold" style={{ fontSize: '0.9rem', color: '#495057' }}>Branch</Form.Label>
                <Form.Select 
                  name="branch" 
                  value={filters.branch || ""} 
                  onChange={handleFilterChange}
                  style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
                >
                  <option value="">All Branches</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="AIML">AI/ML</option>
                  <option value="AIDS">AI/DS</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-semibold d-flex align-items-center" style={{ fontSize: '0.9rem', color: '#495057' }}>
                  <FaGraduationCap className="me-2" style={{ color: '#6c757d' }} />
                  Course
                </Form.Label>
                <Form.Select 
                  name="course" 
                  value={filters.course || ""} 
                  onChange={handleFilterChange}
                  style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
                >
                  <option value="">All Courses</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MCA">MCA</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Results Count */}
          {data && data.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                Showing <strong>{data.length}</strong> student(s)
              </span>
              {Object.keys(filters).length > 0 && (
                <Badge bg="primary" className="px-3 py-2" style={{ borderRadius: '6px', fontWeight: '500' }}>
                  Filters Applied
                </Badge>
              )}
            </div>
          )}

          {/* Modern Table */}
          {data && data.length > 0 ? (
            <div className="table-responsive" style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e9ecef' }}>
              <Table hover className="mb-0">
                <thead style={{ 
                  backgroundColor: '#f8f9fa',
                  borderBottom: '2px solid #e9ecef'
                }}>
                  <tr>
                    <th style={{ padding: '1rem', fontWeight: '600', color: '#495057', fontSize: '0.9rem' }}>
                      <div className="d-flex align-items-center">
                        Roll No
                        <FaSort className="ms-1" style={{ fontSize: '0.7rem', color: '#6c757d' }} />
                      </div>
                    </th>
                    <th style={{ padding: '1rem', fontWeight: '600', color: '#495057', fontSize: '0.9rem' }}>Name</th>
                    <th style={{ padding: '1rem', fontWeight: '600', color: '#495057', fontSize: '0.9rem' }}>Year</th>
                    <th style={{ padding: '1rem', fontWeight: '600', color: '#495057', fontSize: '0.9rem' }}>Branch</th>
                    <th style={{ padding: '1rem', fontWeight: '600', color: '#495057', fontSize: '0.9rem' }}>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((e, index) => (
                    <tr key={e.roll_no} style={{ 
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa',
                      borderBottom: '1px solid #f1f3f4',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#2c3e50' }}>{e.roll_no}</td>
                      <td style={{ padding: '1rem', color: '#495057' }}>{e.name}</td>
                      <td style={{ padding: '1rem' }}>
                        <Badge 
                          bg="outline-secondary" 
                          style={{ 
                            backgroundColor: 'transparent',
                            color: '#6c757d',
                            border: '1px solid #dee2e6',
                            borderRadius: '4px',
                            padding: '0.35rem 0.6rem',
                            fontWeight: '500'
                          }}
                        >
                          Year {e.year}
                        </Badge>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <Badge 
                          bg="outline-info" 
                          style={{ 
                            backgroundColor: 'rgba(13, 110, 253, 0.1)',
                            color: '#0d6efd',
                            border: '1px solid rgba(13, 110, 253, 0.2)',
                            borderRadius: '4px',
                            padding: '0.35rem 0.6rem',
                            fontWeight: '500'
                          }}
                        >
                          {e.branch}
                        </Badge>
                      </td>
                      <td style={{ padding: '1rem', color: '#495057' }}>{e.course}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="text-muted mb-3" style={{ fontSize: '3rem' }}>📊</div>
              <h5 className="text-muted" style={{ fontWeight: '500' }}>No student records found</h5>
              <p className="text-muted">Try adjusting your filters or check back later.</p>
            </div>
          )}

          {/* Export Button */}
          {data && data.length > 0 && (
            <div className="d-flex justify-content-end mt-4">
              <Button
  variant="primary"
  className="d-flex align-items-center px-4 py-2"
  onClick={() => {
    const query = new URLSearchParams({
      date: filters.date || new Date().toISOString().split("T")[0],  // default to today
      ...Object.fromEntries(searchParams.entries()),
    }).toString();

   const exportUrl = `${import.meta.env.VITE_API_BASE_URL}/user/export/?${query}`;

    window.open(exportUrl, "_blank");
  }}
  style={{ borderRadius: '8px', fontWeight: '500' }}
>
  <FaFileExport className="me-2" />
  Export Data
</Button>
            </div>
          )}
        </Card.Body>
      </Card>
          <DepartmentChart filters={filters} />
    </Container>
  );
};

export default DashBoard;