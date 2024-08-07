"use client";
import useHomePage from "@/hooks/useHomePage";
import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const Home3Banner = () => {
  const [isOpen, setOpen] = useState(false);
  const [homeData, refetch, isLoading] = useHomePage();

  const { title, subtitle, keyPoints, items, sectionName, icon } =
    homeData?.data?.heroSection || "";

  return (
    <>
      <div className="home3-banner-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="banner-content">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                  >
                    <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                  </svg>
                  {sectionName}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                  >
                    <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                  </svg>
                </span>
                <h1>{title}</h1>
                {/* <h1>
                  Elevate Your Business with <span>Code Canvus Solutions</span>{" "}
                  in the Cloud.
                </h1> */}

                <p>{subtitle}</p>
                <ul>
                  {keyPoints?.map((items, index) => (
                    <li key={index}>
                      <span dangerouslySetInnerHTML={{ __html: icon }} />
                      {items}
                    </li>
                  ))}
                </ul>
                <div className="banner-content-bottom">
                  <Link
                    href="/shop"
                    className="primary-btn1 hover-white"
                    data-text="See the Product"
                  >
                    <span>See the Product</span>
                  </Link>
                  <a
                    data-fancybox="popup-video"
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(true)}
                    className="video-area"
                  >
                    <div className="icon">
                      <svg
                        className="video-circle"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="51px"
                        viewBox="0 0 206 206"
                        style={{ enableBackground: "new 0 0 206 206" }}
                        xmlSpace="preserve"
                      >
                        <circle
                          className="circle"
                          strokeMiterlimit={10}
                          cx={103}
                          cy={103}
                          r={100}
                        />
                        <path
                          className="circle-half top-half"
                          strokeWidth={4}
                          strokeMiterlimit={10}
                          d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6"
                        />
                        <path
                          className="circle-half bottom-half"
                          strokeWidth={4}
                          strokeMiterlimit={10}
                          d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53"
                        />
                      </svg>
                      <i className="bi bi-play" />
                    </div>
                    <h6>Watch a Demo</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {items &&
          items?.map((items, index) => (
            <img
              src={items?.image}
              alt="hero-image"
              className={`bottom-img${index + 1}`}
              data-aos={index !== 1 && "fade-up"}
            />
          ))}
        <React.Fragment>
          <ModalVideo
            channel="youtube"
            onClick={() => setOpen(true)}
            isOpen={isOpen}
            animationSpeed="350"
            videoId="r4KpWiK08vM"
            ratio="16:9"
            onClose={() => setOpen(false)}
          />
        </React.Fragment>
      </div>
    </>
  );
};

export default Home3Banner;
