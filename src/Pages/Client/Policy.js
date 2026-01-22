import React from 'react'
import { Link } from 'react-router-dom'

function Policy() {
    return (
        <>
            <div className="container-fluid py-5 bg-dark hero-header mb-2">
            </div>
            <div className="container py-1">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="text-center">
                            <h1
                                className="mb-4 text-uppercase fw-normal section-title"
                                style={{ fontWeight: 'bold', color: '#FEA100' }}
                            >
                                General Operating Policy
                            </h1>
                        </div>

                        <div className="mb-4">
                            <h3>Business Hours</h3>
                            <h5>Monday – Friday:</h5>
                            <p>8:00 AM – 10:00 PM</p>
                            <h5>Saturday – Sunday:</h5>
                            <p>10:00 AM – 11:00 PM</p>
                        </div>

                        <div className="mb-4">
                            <h3>*Table Reservation Guide*</h3>
                            <h3>1. Fill in information</h3>
                            <p>Customers click the table reservation button on the main interface.</p>
                            <p>
                                Please fill in all required basic information such as full name,
                                phone number, reservation date, number of guests, etc.
                                After completing the information, click the "Next" button to proceed
                                to the dish selection page if needed.
                            </p>
                            <p>
                                If you only want to reserve a table without ordering dishes,
                                click the "Complete Reservation" button to save the reservation information.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3>2. Choose dishes</h3>
                            <p>
                                Customers select dishes from the restaurant menu, including main dishes,
                                side dishes, beverages, and desserts.
                            </p>
                            <p>
                                Selected dishes will be recorded in the "Selected Dishes" section,
                                showing details such as dish name, quantity, price, and total cost.
                                Customers can modify their selections (add or remove dishes) at this stage.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3>3. Reservation payment (if applicable)</h3>
                            <p>
                                If prepayment is required, customers will be redirected to the payment page.
                                Available payment methods may include card payment, e-wallets,
                                or other methods supported by the restaurant.
                            </p>
                            <p>
                                After selecting a payment method, customers enter the required information
                                and click "Confirm Payment".
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3>4. Reservation confirmation</h3>
                            <p>
                                On the "Reservation Confirmation" page, customers review their reservation
                                details and click the "Confirm Reservation" button to complete the process.
                            </p>
                            <p>
                                The system will send a confirmation message or email within 10 minutes
                                after the customer confirms the reservation.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3>*Notes</h3>
                            <p>
                                When making a reservation on the restaurant's website,
                                customers acknowledge and agree to the following conditions:
                            </p>
                            <ul>
                                <li>
                                    The restaurant only accepts online reservations from
                                    09:00 AM to before 09:00 PM.
                                </li>
                                <li>
                                    Reservations must be made at least 2 hours prior
                                    to the expected arrival time.
                                </li>
                                <li>
                                    If prepayment has been made, cancellation or time changes
                                    must be communicated to the restaurant at least
                                    1 hour before the reservation time.
                                </li>
                            </ul>
                        </div>

                        <Link to="/" className="btn btn-primary">
                            <i className="fa-solid fa-arrow-left ms-2"></i> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Policy
