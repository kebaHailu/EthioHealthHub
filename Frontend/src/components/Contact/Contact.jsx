// import React, { useEffect } from "react";
import Footer from "../Shared/Footer/Footer";
import { useForm } from "react-hook-form";
import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Header from "../Shared/Header/Header";
import "./index.css";
import SubHeader from "../Shared/SubHeader";
import { useContactMutation } from "../../redux/api/contactApi";
import { message } from "antd";

const Contact = () => {
  const [contact, { isLoading, isError, error, isSuccess }] =
    useContactMutation();
  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = (data) => {
    contact(data)
      // .unwrap()
      .then(() => {
        message.success("Successfully sent your message! thank you for your message and comments.");
      })
      .catch(() => {
        message.error("There was an error sending your message.");
      });
    reset();
  };

  // useEffect(() => {
  //   if (isError && error) {
  //     message.error(error?.data?.message || "Failed to send message.");
  //   }
  // }, [isError, error]);

  return (
    <>
      <Header />
      <SubHeader
        title="Contact us"
        subtitle="If you have any questions, please do not hesitate to contact us."
      />
      <section id="contact" className="contact mt-5 mb-5">
        <div className="container" style={{ marginTop: 80, marginBottom: 100 }}>
          <div className="row">
            <div className="col-lg-4">
              <div
                className="info rounded p-3"
                style={{ background: "#f8f9fa" }}
              >
                <div className="d-flex mb-2 gap-2">
                  <FaLocationArrow className="icon" />
                  <div>
                    <h4>Location:</h4>
                    <p>
                      Addis Ababa Science and Technology University, Addis
                      Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                <div className="d-flex mb-2 gap-2">
                  <FaEnvelope className="icon" />
                  <div>
                    <h4>Email:</h4>
                    <p>ethiohealthubteam@gmail.com</p>
                  </div>
                </div>

                <div className="d-flex mb-2 gap-2">
                  <FaPhoneAlt className="icon" />
                  <div>
                    <h4>Call:</h4>
                    <p>+251 953 467 793</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div
                className="mb- p-2 rounded"
                style={{ background: "#f8f9fa" }}
              >
                <form
                  className="row form-row"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>First Name</label>
                      <input
                        required
                        {...register("firstName")}
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>Last Name</label>
                      <input
                        required
                        {...register("lastName")}
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group mb-2 card-label">
                      <label>Email</label>
                      <input
                        required
                        {...register("email")}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group mb-2 card-label">
                      <label>Subject</label>
                      <input
                        required
                        {...register("subject")}
                        className="form-control"
                        placeholder="Enter your subject"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea
                        required
                        {...register("text")}
                        className="form-control mb-3"
                        cols="30"
                        rows="10"
                        placeholder="Enter your message"
                      />
                    </div>
                  </div>

                  <div className="text-center mt-3 mb-5">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="appointment-btn"
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <iframe
              style={{ border: 0, width: "100%", height: "400px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24377.94271582813!2d38.811451987380906!3d8.881589596248707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b83d70148b673%3A0xc893a9d96adeabe1!2sAASTU%20door%201!5e0!3m2!1sam!2set!4v1713859623954!5m2!1sam!2set"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
