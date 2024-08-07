"use client";
import useHomePage from "@/hooks/useHomePage";
import CountUp from "react-countup";

const Home3countdown = () => {
  const [homeData, refetch, isLoading] = useHomePage();

  const { title, subtitle, items, sectionName } =
    homeData?.data?.globalProduct || "";

  return (
    <>
      <div className="home3-countdown-section mb-110">
        <div className="container">
          <div
            className="section-title white wow animate fadeInDown"
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
          <div className="row g-lg-4 gy-5">
            {items?.map((items) => (
              <div
                key={items?.id}
                className="col-lg-3 col-sm-6 wow animate fadeInUp"
                data-wow-delay="200ms"
                data-wow-duration="1500ms"
              >
                <div className="single-countdown">
                  <div className="icon">
                    <span dangerouslySetInnerHTML={{ __html: items?.icon }} />
                  </div>
                  <div className="content">
                    <div className="number">
                      <h5 className="counter">
                        <CountUp end={items?.title} delay={5} />
                      </h5>
                      <span>{items?.subtitle}</span>
                    </div>
                    <p>{items?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home3countdown;
