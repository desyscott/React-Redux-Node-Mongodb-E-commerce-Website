import React from "react";
import { Link, useHistory } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <p>welcome</p>

      <Link to="/home">home</Link>
    </div>
  );
}

export default Welcome;
