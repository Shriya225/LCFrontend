import { useSearchParams } from "react-router-dom";
import { useGetListQuery } from "../redux/apiSlice";
import { Container, Row, Col, Card, Table, Spinner, Form, Button, Badge } from "react-bootstrap";
import { FaFilter, FaFileExport, FaUsers, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";

const DashBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

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
              <h1 className="h2 mb-0" style={{ color: '#2c3e50' }}>Student Dashboard</h1>
              <p className="text-muted mb-0">Manage and monitor student late entries</p>
            </div>
          </div>
        </Col>
      </Row>

      <Card className="shadow border-0">
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #0d6efd, #6f42c1)',
          width: '100%'
        }}></div>
        
        <Card.Header className="bg-white border-0 pt-4">
          <Row className="align-items-center">
            <Col md={6}>
              <h5 className="mb-0 d-flex align-items-center">
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
                <Form.Label className="fw-semibold d-flex align-items-center">
                  <FaCalendarAlt className="me-2 text-muted" />
                  Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={filters.date || ""}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Year</Form.Label>
                <Form.Select name="year" value={filters.year || ""} onChange={handleFilterChange}>
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
                <Form.Label className="fw-semibold">Branch</Form.Label>
                <Form.Select name="branch" value={filters.branch || ""} onChange={handleFilterChange}>
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
                <Form.Label className="fw-semibold d-flex align-items-center">
                  <FaGraduationCap className="me-2 text-muted" />
                  Course
                </Form.Label>
                <Form.Select name="course" value={filters.course || ""} onChange={handleFilterChange}>
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
              <span className="text-muted">
                Showing <strong>{data.length}</strong> student(s)
              </span>
              {Object.keys(filters).length > 0 && (
                <Badge bg="primary" className="px-3 py-2">
                  Filters Applied
                </Badge>
              )}
            </div>
          )}

          {/* Data Table */}
          {data && data.length > 0 ? (
            <div className="table-responsive">
              <Table striped hover className="mb-0">
                <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Branch</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((e) => (
                    <tr key={e.roll_no}>
                      <td className="fw-semibold">{e.roll_no}</td>
                      <td>{e.name}</td>
                      <td><Badge bg="secondary">Year {e.year}</Badge></td>
                      <td><Badge bg="info">{e.branch}</Badge></td>
                      <td>{e.course}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="text-muted mb-3" style={{ fontSize: '3rem' }}>📊</div>
              <h5 className="text-muted">No student records found</h5>
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
                  const query = searchParams.toString();
                  const exportUrl = `http://127.0.0.1:8000/user/export/?${query}`;
                  window.open(exportUrl, "_blank");
                }}
              >
                <FaFileExport className="me-2" />
                Export Data
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Footer Stats */}
      <Row className="mt-4">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="py-3 text-center">
              <small className="text-muted">
                MIC College Latecomer Management System • {new Date().toLocaleDateString()}
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;