import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Booking() {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (confirmRef.current) {
      // Kéo xuống với offset, điều chỉnh 100 pixel cho cao hơn một chút
      const offset = 350;
      const elementPosition = confirmRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div>
      <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Online Table Reservation
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Reservation
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container text-center my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="progress-steps d-flex justify-content-between">
              <div className="step">
                <span className="circle">1</span>
                <p>Fill Information</p>
              </div>
              <div className="step">
                <span className="circle">2</span>
                <p>Select Dishes</p>
              </div>
              <div className="step">
                <span className="circle">3</span>
                <p>Payment</p>
              </div>
              <div className="step">
                <span className="circle active">4</span>
                <p>Confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-xxl py-5 px-0 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="row g-0 bg-white">
          <div className="col-12 text-center mb-5 mt-5" ref={confirmRef}>
            <div className="success-message">
              <img
                src="../../Assets/Client/Images/huong-sen-logo.png"
                style={{ width: "100px" }}
                alt="Success"
                className="mb-4"
              />
              <h1 className="text-success">
                THANK YOU FOR USING OUR SERVICE!
              </h1>
              <p className="fw-bold">
                Your table reservation at our restaurant has been successfully
                completed. We will contact you shortly to confirm the details.
              </p>
              <p>
                If you have any questions or need assistance, please contact
                <span className="text-warning ms-2 fw-bold">
                  078.546.8567
                </span>
              </p>
              <p>
                <Button
                  component={Link}
                  to="/my-bookings"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF9800",
                    color: "#FFFFFF",
                    border: "1px solid #FF9800",
                    "&:hover": {
                      backgroundColor: "#FFFFFF",
                      color: "#FF9800",
                      border: "1px solid #FF9800",
                    },
                  }}
                >
                  View Booking History
                </Button>
              </p>
              {/* New Note Section */}
              <div className="alert alert-warning mt-4">
                <strong>Note:</strong> If guests arrive more than 30 minutes late,
                the reservation will be canceled and the deposit will not be
                refunded.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
