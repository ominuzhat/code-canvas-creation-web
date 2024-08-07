"use client";
import Image from "next/image";
import logo from "../../../public/code canvas creations/logo-icon.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { enqueueSnackbar } from "notistack";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useMyContext from "@/hooks/useMyContext";
// import { cn } from "@/lib/utils";

export default function Authentication() {
  const [instance] = useAxiosSecure();
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash");
  const { setUser } = useMyContext();

  useEffect(() => {
    if (hash) {
      const verifyEmail = async () => {
        try {
          const response = await axios.post(
            "https://code-canvas-official-app.onrender.com/auth/verify-email",
            {},
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
            const { firstName, email, lastName, details } =
              response.data.data.user;
            const user = { firstName, email, lastName, details };
            localStorage.setItem(
              "access-token",
              response.data.data.access_token
            );
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            router.replace("/");
          }
        } catch (error) {
          console.error("Verification failed:", error);
          enqueueSnackbar(`Verification Unsuccessful `, {
            variant: "danger",
          });
        }
      };

      verifyEmail();
    }
  }, [hash]);

  const [registrationFormData, setRegistrationFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post(
        `/auth/register`,
        registrationFormData
      );
      if (response) {
        enqueueSnackbar(`Check Your mail for confirm the Registration `, {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(`${error.response.data.error.message} `, {
        variant: "danger",
      });
      console.log("err", error);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post(`/auth/login`, loginFormData);
      if (response) {
        enqueueSnackbar(`Check Your mail for confirm the Login `, {
          variant: "success",
        });
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

                      {!login ? (
                        <form onSubmit={handleLoginSubmit}>
                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label
                              className="form-label"
                              htmlFor="form2Example11"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="form2Example11"
                              className="form-control"
                              placeholder="Email address"
                              name="email"
                              value={loginFormData.email}
                              onChange={handleLoginChange}
                            />
                          </div>

                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label
                              className="form-label"
                              htmlFor="form2Example22"
                            >
                              Password
                            </label>
                            <div className="input-group">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="form2Example22"
                                className="form-control"
                                placeholder="*******************"
                                name="password"
                                value={loginFormData.password}
                                onChange={handleLoginChange}
                              />
                              <span
                                className="input-group-text"
                                onClick={togglePasswordVisibility}
                              >
                                <FontAwesomeIcon
                                  icon={!showPassword ? faEyeSlash : faEye}
                                />
                              </span>
                            </div>
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                            >
                              Log in
                            </button>
                            <br />
                            <a
                              className="text-muted"
                              href="/authentication/forget-password"
                            >
                              Forgot password?
                            </a>
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-outline-danger"
                              onClick={() => setLogin(!login)}
                            >
                              Create new
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleRegistrationSubmit}>
                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label className="form-label" htmlFor="firstName">
                              Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="firstName"
                              className="form-control"
                              placeholder="Enter Your Name"
                              value={registrationFormData.firstName}
                              onChange={handleRegistrationChange}
                              required
                            />
                          </div>
                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label className="form-label" htmlFor="email">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter Your Email"
                              value={registrationFormData.email}
                              onChange={handleRegistrationChange}
                              required
                            />
                          </div>
                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label className="form-label" htmlFor="phone">
                              Phone *
                            </label>
                            <input
                              type="number"
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Enter Your Phone"
                              value={registrationFormData.phone}
                              onChange={handleRegistrationChange}
                              required
                            />
                          </div>
                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <label
                              className="form-label"
                              htmlFor="form2Example22"
                            >
                              Password *
                            </label>
                            <div className="input-group">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="form2Example22"
                                className="form-control"
                                placeholder="*******************"
                                name="password"
                                value={registrationFormData.password}
                                onChange={handleRegistrationChange}
                              />
                              <span
                                className="input-group-text"
                                onClick={togglePasswordVisibility}
                              >
                                <FontAwesomeIcon
                                  icon={!showPassword ? faEyeSlash : faEye}
                                />
                              </span>
                            </div>
                          </div>
                          <div className="text-center pt-1 pb-1">
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                            >
                              Register
                            </button>
                          </div>
                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">
                              Already have an account?
                            </p>
                            <p
                              onClick={() => setLogin(!login)}
                              className="mb-0 me-2"
                            >
                              <u>Go to Login Page</u>
                            </p>
                          </div>
                        </form>
                      )}
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

    // <div classNameName="h-screen flex items-center justify-center">
    //   <div classNameName="max-w-screen-2xl mx-auto border  ">
    //     <div classNameName="flex flex-col justify-center items-center   md:flex-row md:items-start md:justify-center">
    //       <div classNameName="md:hidden">
    //         <Image
    //           src="/examples/authentication-light.png"
    //           width={1280}
    //           height={843}
    //           alt="Authentication"
    //           classNameName="block dark:hidden"
    //         />
    //         <Image
    //           src="/examples/authentication-dark.png"
    //           width={1280}
    //           height={843}
    //           alt="Authentication"
    //           classNameName="hidden dark:block"
    //         />
    //       </div>
    //       <div classNameName="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    //         <Link
    //           href="/"
    //           classNameName="absolute right-4 top-4 md:right-8 md:top-8"
    //         >
    //           Home
    //         </Link>
    //         <div classNameName="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
    //           <div classNameName="absolute inset-0 bg-zinc-900" />
    //           <div classNameName="relative z-20 flex items-center text-lg font-medium">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               classNameName="mr-2 h-6 w-6"
    //             >
    //               <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    //             </svg>
    //             Code Canvus Solution
    //           </div>
    //           <div classNameName="relative z-20 mt-auto">
    //             <blockquote classNameName="space-y-2">
    //               <p classNameName="text-lg">
    //                 &ldquo;This CCS has saved me countless hours of work and
    //                 helped me deliver stunning designs to my clients faster than
    //                 ever before.&rdquo;
    //               </p>
    //               <footer classNameName="text-sm">Rakib Khan</footer>
    //             </blockquote>
    //           </div>
    //         </div>
    //         <div classNameName="lg:p-8">
    //           <div classNameName="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //             <div classNameName="flex flex-col space-y-2 text-center">
    //               <h1 classNameName="text-2xl font-semibold tracking-tight">
    //                 Create an account
    //               </h1>
    //               <p classNameName="text-sm text-muted-foreground">
    //                 Enter your email below to create your account
    //               </p>
    //             </div>
    //             {/* <UserAuthForm /> */}
    //             <p classNameName="px-8 text-center text-sm text-muted-foreground">
    //               By clicking continue, you agree to our
    //               <Link
    //                 href="/terms"
    //                 classNameName="underline underline-offset-4 hover:text-primary"
    //               >
    //                 Terms of Service
    //               </Link>
    //               and
    //               <Link
    //                 href="/privacy"
    //                 classNameName="underline underline-offset-4 hover:text-primary"
    //               >
    //                 Privacy Policy
    //               </Link>
    //               .
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
