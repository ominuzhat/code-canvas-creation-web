"use client";
import Image from "next/image";
import logo from "../../../../public/code canvas creations/logo-icon.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
// import { cn } from "@/lib/utils";

export default function Authentication() {
  const [instance] = useAxiosSecure();
  const [changePasswordData, setChangePasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash");
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //   useEffect(() => {
  //     if (hash) {
  //       const verifyEmail = async () => {
  //         try {
  //           const response = await axios.post(
  //             "https://code-canvas-official-app.onrender.com/auth//auth/change-password",
  //             {},
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${hash}`,
  //               },
  //             }
  //           );
  //           console.log("Verification successful:", response.data.data);
  //           if (response) {
  //             enqueueSnackbar(`Verification SuccessFully `, {
  //               variant: "success",
  //             });
  //             const { firstName, email, lastName, details } =
  //               response.data.data.user;
  //             const user = { firstName, email, lastName, details };
  //             localStorage.setItem(
  //               "access-token",
  //               response.data.data.access_token
  //             );
  //             localStorage.setItem("user", JSON.stringify(user));

  //             router.replace("/");
  //           }
  //         } catch (error) {
  //           console.error("Verification failed:", error);
  //           enqueueSnackbar(`Verification Unsuccessful `, {
  //             variant: "danger",
  //           });
  //         }
  //       };

  //       verifyEmail();
  //     }
  //   }, [hash]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        changePasswordData.newPassword === changePasswordData.confirmNewPassword
      ) {
        const response = await axios.post(
          "https://code-canvas-official-app.onrender.com/auth/change-password",
          changePasswordData,
          {
            headers: {
              Authorization: `Bearer ${hash}`,
            },
          }
        );
        console.log("Verification successful:", response.data.data);
        if (response) {
          enqueueSnackbar(`Verification SuccessFully `, {
            variant: "success",
          });

          router.replace("/authentication");
        }
      }
    } catch (error) {
      enqueueSnackbar(`${error.response.data.error.message} `, {
        variant: "error",
      });
      console.log("err", error);
    }
  };

  return (
    <div
      classNameName="h-screen flex items-center justify-center border"
      style={{ padding: "50px" }}
    >
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div>
                        <a href="/" className="text-black  ">
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ marginRight: "4px" }}
                          />{" "}
                          Home
                        </a>
                      </div>
                      <div className="text-center">
                        <Image src={logo} width={150} height={50} />
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style="width: 185px;" alt="logo"> */}
                      </div>

                      <form onSubmit={handleLoginSubmit}>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            New Password
                          </label>
                          <div className="input-group">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              id="form2Example22"
                              className="form-control"
                              placeholder="*******************"
                              name="newPassword"
                              value={changePasswordData.newPassword}
                              onChange={handleLoginChange}
                            />
                            <span
                              className="input-group-text"
                              onClick={toggleNewPasswordVisibility}
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                              />
                            </span>
                          </div>
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Confirm New Password
                          </label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="form2Example22"
                              className="form-control"
                              placeholder="*******************"
                              name="confirmNewPassword"
                              value={changePasswordData.confirmNewPassword}
                              onChange={handleLoginChange}
                            />
                            <span
                              className="input-group-text"
                              onClick={togglePasswordVisibility}
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1  ">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center auth-img">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      {/* <h4 className="mb-4">We are more than just a company</h4> */}
                      {/* <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
