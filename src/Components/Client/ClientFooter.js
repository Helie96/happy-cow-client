import React from 'react'
import { Link } from 'react-router-dom'

export default function ClientFooter() {
    return (
        <div>
            <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">About the Restaurant</h4>
                            <Link className="btn btn-link" to="/about">About Us</Link>
                            <Link className="btn btn-link" to="/contact">Contact</Link>
                            <Link className="btn btn-link" to="/service">Services</Link>
                            <Link className="btn btn-link" to="/policy">Operating Policy</Link>
                            <Link className="btn btn-link" to="/reservation-guide">Reservation Guide</Link>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Contact Information</h4>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>1 Trinh Van Bo, Nam Tu Liem, Ha Noi</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>0123.546.789</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>contact.restaurant@gmail.com</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Opening Hours</h4>
                            <h5 className="text-light fw-normal">Monday - Friday</h5>
                            <p>8:00 AM - 10:00 PM</p>
                            <h5 className="text-light fw-normal">Saturday - Sunday</h5>
                            <p>10:00 AM - 11:00 PM</p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Quick Contact</h4>
                            <p>If you have any questions or would like to receive more promotions, please contact us.</p>
                            <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                                <input
                                    className="form-control border-primary w-100 py-3 ps-4 pe-5"
                                    type="text"
                                    placeholder="Enter your email here"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a className="border-bottom" href="#">Fast Restaurant</a>, All Rights Reserved.
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <Link to="/">Home</Link>
                                    <Link to="/menu">Menu</Link>
                                    <Link to="/blog">News</Link>
                                    <Link to="/about">About Us</Link>
                                    <Link to="/contact">FAQ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
