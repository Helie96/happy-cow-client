import React from 'react'

export default function Service() {
  return (
    <div>
      <div className="container-fluid py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Services
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Services
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
              Our Services
            </h5>
            <h1 className="mb-5">
              Discover Our Services
            </h1>
          </div>

          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                  <h5>Top Chefs</h5>
                  <p>
                    Our chefs are highly experienced professionals,
                    delivering unique and delicious dishes.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                  <h5>Quality Food</h5>
                  <p>
                    We use only the freshest ingredients to ensure
                    every dish meets the highest quality standards.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-solid fa-chair text-primary mb-4"></i>
                  <h5>Online Reservation</h5>
                  <p>
                    Easily reserve your table through our online system —
                    fast, simple, and convenient.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                  <h5>24/7 Service</h5>
                  <p>
                    We are always ready to serve you anytime, anywhere,
                    with 24/7 customer support and online chat assistance.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-shield-alt text-primary mb-4"></i>
                  <h5>Safety & Security</h5>
                  <p>
                    We are committed to providing secure services and
                    protecting your personal information.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-truck text-primary mb-4"></i>
                  <h5>Fast Delivery</h5>
                  <p>
                    Our delivery service ensures your order arrives
                    quickly and on time.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-hands-helping text-primary mb-4"></i>
                  <h5>Dedicated Support</h5>
                  <p>
                    Our support team is always ready to assist you
                    with any questions or issues.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-gem text-primary mb-4"></i>
                  <h5>Premium Service</h5>
                  <p>
                    We provide premium services with superior quality,
                    delivering the best experience for our customers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
