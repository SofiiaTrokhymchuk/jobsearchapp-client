import React from "react";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter className="bg-dark text-center text-white fixed-bottom">
      {/* <MDBContainer className="p-4 pb-0"></MDBContainer> */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {new Date().getFullYear()} Copyright:{" "}
        <a className="text-white" href="https://github.com/SofiiaTrokhymchuk">
          Sofiia Trokhymchuk
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
