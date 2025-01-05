import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { checkTicket } from "../api/servidor";
import Swal from "sweetalert2";

function CheckUser() {
  const [userInfo, setUserInfo] = useState(null);
  const { UUID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await checkTicket(UUID);
        setUserInfo(data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    };

    fetchUserInfo();
  }, [UUID]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      {userInfo ? (
        <div>
          <h2>User Information</h2>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <h2>No user found</h2>
        </div>
      )}
      <button onClick={handleBack} style={{ marginTop: "20px" }}>
        Back to Home
      </button>
    </div>
  );
}

export default CheckUser;
