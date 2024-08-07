"use client";
import useHomePage from "@/hooks/useHomePage";
import Link from "next/link";
import React from "react";

const Home3ProjectManagement = () => {
  const [homeData, refetch, isLoading] = useHomePage();

  const { title, subtitle, items, sectionName } =
    homeData?.data?.projectManagement || "";

  return (
    <>
      <div className="home3-project-management-section mb-110">
        <div className="container">
          <div className="row justify-content-center mb-60">
            <div className="col-lg-8">
              <div
                className="section-title text-center wow animate fadeInDown"
                data-wow-delay="200ms"
                data-wow-duration="1500ms"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    height={10}
                    viewBox="0 0 10 10"
                  >
                    <g>
                      <circle cx={5} cy={5} r={5} />
                    </g>
                  </svg>
                  {sectionName}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    height={10}
                    viewBox="0 0 10 10"
                  >
                    <g>
                      <circle cx={5} cy={5} r={5} />
                    </g>
                  </svg>
                </span>
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>
            </div>
          </div>
          <div className="project-management-tab-wrapper">
            <div className="project-management-nav mb-50">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  {items?.map((items, index) => (
                    <button
                      key={items?.id}
                      className={index === 0 ? "nav-link active" : "nav-link "}
                      id={`${items?.subtitle}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${items?.subtitle}`}
                      type="button"
                      role="tab"
                      aria-controls={items?.subtitle}
                      // aria-selected={index === 0 ? "true" : "false"}
                      // aria-selected="false"
                    >
                      {items?.title}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
            <div className="project-management-tab">
              <div className="tab-content" id="nav-tabContent">
                {items?.map((items, index) => (
                  <div
                    key={index}
                    className={
                      index === 0
                        ? "tab-pane fade show active"
                        : "tab-pane fade show "
                    }
                    id={items?.subtitle}
                    // id="marketing-teams"
                    role="tabpanel"
                    aria-labelledby={`${items?.subtitle}-tab`}
                  >
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="project-management-tab-content">
                          <div
                            className="tab-content-top wow animate fadeInDown"
                            data-wow-delay="400ms"
                            data-wow-duration="1500ms"
                          >
                            <h3>{items?.title}</h3>
                            <p>{items?.description}</p>
                            <ul>
                              {items?.keyPoints?.map((i, index) => (
                                <li>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: items?.icon,
                                    }}
                                  />
                                  {i}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Link
                            href="/"
                            className="primary-btn2 wow animate fadeInUp"
                            data-wow-delay="400ms"
                            data-wow-duration="1500ms"
                            data-text="Get Started Now"
                          >
                            <span>Get Started Now</span>
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="project-management-tab-img-wrap">
                          <img
                            src={
                              items?.image ||
                              "assets/img/home3/project-management-tab-img1.jpg"
                            }
                            alt=""
                            className="wow animate zoomIn"
                            data-wow-delay="400ms"
                            data-wow-duration="1500ms"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home3ProjectManagement;
