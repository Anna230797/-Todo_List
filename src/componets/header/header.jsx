import React from "react";
import s from"./header.module.css";
import { Row, Col } from "react-bootstrap";

function Header() {
  return (
    //строка
    <Row>
      {/* колонка */}
      <Col>
        <div className={s.headerName}>
          <h1>Todo List</h1>
        </div>
      </Col>
    </Row>
  );
}
export default Header;
