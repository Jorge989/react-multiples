import React from "react";
import "./styles.scss";
import { FaSpinner } from "react-icons/fa";
export default function Button({ isLoading }) {
  return (
    <>
      <button className="button-86" type="submit" role="button">
        Submit {isLoading ? <FaSpinner className="spin" /> : null}
      </button>
    </>
  );
}
