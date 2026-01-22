import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewContact } from "../../Actions/ContactActions";
import Spinner from "../../Components/Client/Spinner";
import { DangerAlert, SuccessAlert } from "../../Components/Alert/Alert";
import { Link } from "react-router-dom";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      setIsLoading(false); // Kết thúc loading
      await dispatch(addNewContact(data)); // Gọi action để gửi thông tin liên hệ
      setAlert({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });
      reset();
    } catch (error) {
      console.error("Error sending contact data:", error);
      setAlert({
        open: true,
        message: "Failed to send message!",
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Contact Us
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
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                  Contact Us
                </h5>
                <h1 className="mb-5">
                  Get in touch to have all your questions answered
                </h1>
              </div>
              <div className="row g-4">
                <div className="col-12">
                  <div className="row gy-4">
                    <div className="col-md-4">
                      <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                        Reservations
                      </h5>
                      <p>
                        <i className="fa fa-envelope-open text-primary me-2"></i>
                        contact.happycow@gmail.com
                      </p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                        General Information
                      </h5>
                      <p>
                        <i className="fa fa-envelope-open text-primary me-2"></i>
                        contact.happycow@gmail.com
                      </p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                        Technical Support
                      </h5>
                      <p>
                        <i className="fa fa-envelope-open text-primary me-2"></i>
                        contact.happycow@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                  <iframe
                    className="position-relative rounded w-100 h-100"
                    src="<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8028617611994!2d105.74358217508126!3d21.040572580611695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454f2ad50bd6f%3A0x1e8e0e50817009ec!2zMSBUcuG7i25oIFbEg24gQsO0LCBYdcOibiBQaMawxqFuZywgTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaSAxMDAwMDAsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1769096359112!5m2!1sen!2s" 
                    frameBorder="0"
                    style={{ minHeight: "350px", border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>

                <div className="col-md-6">
                  <div className="wow fadeInUp" data-wow-delay="0.2s">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.name ? "is-invalid" : ""
                              }`}
                              id="name"
                              placeholder="Your Name"
                              {...register("name", {
                                required: "Name is required",
                              })}
                            />
                            <label htmlFor="name">Your Name</label>
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="email"
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              id="email"
                              placeholder="Your Email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            <label htmlFor="email">Your Email</label>
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.subject ? "is-invalid" : ""
                              }`}
                              id="subject"
                              placeholder="Subject"
                              {...register("subject", {
                                required: "Subject is required",
                              })}
                            />
                            <label htmlFor="subject">Subject</label>
                            {errors.subject && (
                              <div className="invalid-feedback">
                                {errors.subject.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <textarea
                              className={`form-control ${
                                errors.message ? "is-invalid" : ""
                              }`}
                              placeholder="Leave a message here"
                              id="message"
                              style={{ height: "150px" }}
                              {...register("message", {
                                required: "Message is required",
                              })}
                            ></textarea>
                            <label htmlFor="message">Message</label>
                            {errors.message && (
                              <div className="invalid-feedback">
                                {errors.message.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100 py-3"
                            type="submit"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <SuccessAlert
        open={alert.open && alert.severity === "success"}
        onClose={handleCloseAlert}
        message={alert.message}
      />
      <DangerAlert
        open={alert.open && alert.severity === "error"}
        onClose={handleCloseAlert}
        message={alert.message}
      />
    </div>
  );
}
