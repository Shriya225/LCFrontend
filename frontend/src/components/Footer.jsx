import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#f8f9fa",
      padding: "0.8rem 0",
      marginTop: "auto",
      borderTop: "1px solid #e9ecef",
      fontSize: "0.85rem",
      color: "#6c757d",
      textAlign: "center",
      lineHeight: "1.4"
    }}>
      <Container>
        <div>© 2025 MIC College. All rights reserved.</div>
        <div>Latecomer Management System v2.1.4</div>
      </Container>
    </footer>
  );
};

export default Footer;