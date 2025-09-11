import { useSearchParams } from "react-router-dom";
import { useGetListQuery } from "../redux/apiSlice";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p className="p-3 text-danger">Error fetching data</p>;
  }

  return (
    <div className="container py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Student Dashboard</h5>
        </Card.Header>

        <Card.Body>
          {/* Filters */}
          <div className="d-flex flex-wrap gap-3 mb-4">
            <Form.Control
              type="date"
              name="date"
              value={filters.date || ""}
              onChange={handleFilterChange}
              style={{ maxWidth: "200px" }}
            />

            <Form.Select name="year" value={filters.year || ""} onChange={handleFilterChange} style={{ maxWidth: "180px" }}>
              <option value="">All Years</option>
              <option value="4">4th Year</option>
              <option value="3">3rd Year</option>
              <option value="2">2nd Year</option>
              <option value="1">1st Year</option>
            </Form.Select>

            <Form.Select name="branch" value={filters.branch || ""} onChange={handleFilterChange} style={{ maxWidth: "180px" }}>
              <option value="">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="AIML">AI/ML</option>
              <option value="AIDS">AI/DS</option>
            </Form.Select>

            <Form.Select name="course" value={filters.course || ""} onChange={handleFilterChange} style={{ maxWidth: "180px" }}>
              <option value="">All Courses</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
            </Form.Select>
          </div>

          {/* Data Table */}
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Year</th>
                <th>Branch</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((e) => (
                <tr key={e.roll_no}>
                  <td>{e.roll_no}</td>
                  <td>{e.name}</td>
                  <td>{e.year}</td>
                  <td>{e.branch}</td>
                  <td>{e.course}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="success"
              className="px-4 fw-bold"
              onClick={() => {
                const query = searchParams.toString();
                const exportUrl = `http://127.0.0.1:8000/user/export/?${query}`;
                window.open(exportUrl, "_blank");
              }}
            >
              Export Data
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashBoard;
