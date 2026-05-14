import "./App.css";
import MyProfile from "./components/MyProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const students = [
    { name: "Nguyen Van A", id: "DE190123", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Tran Thi B", id: "DE190124", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Le Van C", id: "DE190125", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Pham Thi D", id: "DE190126", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Hoang Van E", id: "DE190127", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Vu Thi F", id: "DE190128", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Do Van G", id: "DE190129", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Ngo Thi H", id: "DE190130", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Dang Van I", id: "DE190131", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
    { name: "Bui Thi K", id: "DE190132", avatar: "/images/DE190530-PhạmĐăngKhoa.jpg" },
  ];

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">List of Profiles</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {students.map((student, index) => (
          <Col key={index}>
            <MyProfile person={student} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
