import React from "react";
import { Link } from "react-router-dom";
// Link from react-router-dom is used to create navigational links in the React application
// that are aware of the routing context.
// It’s a great way to handle client-side navigation without refreshing the page.



const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 50,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "30px" }}>
          Built with love by Elsa, reference:
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://www.youtube.com/watch?v=wrHTcjSZQ1Y"}
            >
              Indian Coders
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
