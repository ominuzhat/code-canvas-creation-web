"use client";
import MainLayout from "@/components/layout/MainLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCartList from "@/hooks/useCartList";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import React from "react";

const CartPage = () => {
  const [cartList, refetch, isLoading] = useCartList();
  const [instance] = useAxiosSecure();

  // const { quantity, increment, decrement, handleInputChange } =
  //   useQuantityCounter(1);
  // const [activeIndex, setActiveIndex] = useState(null);

  // const toggleActive = (index) => {
  //   setActiveIndex(activeIndex === index ? null : index);
  // };
  const cartId = localStorage.getItem("cartId") || null;

  const handleRemove = async (productId) => {
    try {
      const response = await instance.post(`/cart`, {
        product: productId,
        cartId: cartId,
      });
      if (response.data) {
        enqueueSnackbar(`Product remove SuccessFully `, {
          variant: "success",
        });
        refetch();
      }
    } catch (error) {
      enqueueSnackbar(`Cart added UnsuccessFully `, {
        variant: "error",
      });
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <MainLayout>
      <div className="cart-page scroll-margin pt-120 pb-120" id="shop">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-xl-8 col-lg-7">
              <div className="cart-shopping-wrapper">
                <div className="cart-widget-title">
                  <h4>My Shopping</h4>
                </div>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Product Info</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList?.data?.map((cart) => (
                      <tr key={cart?.id}>
                        {cart?.products?.map((pd) => (
                          <React.Fragment key={pd?.id}>
                            <td data-label="Product Info">
                              <div className="product-info-wrapper">
                                <div className="product-info-img">
                                  <img
                                    src="/assets/img/innerpage/cart-img1.png"
                                    alt=""
                                  />
                                </div>
                                <div className="product-info-content">
                                  <h6>{pd?.title}</h6>
                                  <p>
                                    <span>
                                      <FontAwesomeIcon
                                        icon={faHeadset}
                                        className="me-3"
                                      />
                                    </span>
                                    {pd?.support_for}
                                  </p>
                                  <ul>
                                    <li
                                      onClick={() => handleRemove(pd?.id)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      remove
                                    </li>
                                    {/* <li>
                                      <div
                                        className="qty-btn"
                                        onClick={() => toggleActive(0)}
                                      >
                                        quantity
                                      </div>
                                      <div
                                        className={`quantity-area ${
                                          activeIndex === 0 ? "active" : ""
                                        }`}
                                      >
                                        <div className="quantity">
                                          <a
                                            className="quantity__minus"
                                            style={{ cursor: "pointer" }}
                                            onClick={decrement}
                                          >
                                            <span>
                                              <i className="bi bi-dash" />
                                            </span>
                                          </a>
                                          <input
                                            name="quantity"
                                            type="text"
                                            className="quantity__input"
                                            value={quantity}
                                            onChange={handleInputChange}
                                          />
                                          <a
                                            className="quantity__plus"
                                            style={{ cursor: "pointer" }}
                                            onClick={increment}
                                          >
                                            <i className="bi bi-plus" />
                                          </a>
                                        </div>
                                      </div>
                                    </li> */}
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td data-label="Price">
                              <span>${pd?.price}</span>
                            </td>
                          </React.Fragment>
                        ))}
                        <td data-label="Total">${cart?.totalPrice}</td>
                      </tr>
                    ))}

                    {/* <td data-label="Total">${cart?.totalPrice}</td> */}
                    {/* <tr>
                      <td data-label="Product Info">
                        <div className="product-info-wrapper">
                          <div className="product-info-img">
                            <img
                              src="/assets/img/innerpage/cart-img2.png"
                              alt=""
                            />
                          </div>
                          <div className="product-info-content">
                            <h6>Fashion Forward</h6>
                            <p>
                              <span>SKU: </span>D32-5H23
                            </p>
                            <ul>
                              <li>remove</li>
                              <li>
                                <div
                                  className="qty-btn"
                                  onClick={() => toggleActive(1)}
                                >
                                  quantity
                                </div>
                                <div
                                  className={`quantity-area ${
                                    activeIndex === 1 ? "active" : ""
                                  }`}
                                >
                                  <div className="quantity">
                                    <a
                                      className="quantity__minus"
                                      style={{ cursor: "pointer" }}
                                      onClick={decrement}
                                    >
                                      <i className="bi bi-dash" />
                                    </a>
                                    <input
                                      name="quantity"
                                      type="text"
                                      className="quantity__input"
                                      value={quantity}
                                      onChange={handleInputChange}
                                    />
                                    <a
                                      className="quantity__plus"
                                      style={{ cursor: "pointer" }}
                                      onClick={increment}
                                    >
                                      <i className="bi bi-plus" />
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td data-label="Price">
                        <span>$214.00</span>
                      </td>
                      <td data-label="Total">$214.00</td>
                    </tr> */}
                  </tbody>
                </table>
                <Link href="/shop" className="details-button">
                  Continue Shoping
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 ">
              <div className="cart-order-sum-area">
                <div className="cart-widget-title">
                  <h4>Order Summary</h4>
                </div>
                <div className="order-summary-wrap">
                  <ul className="order-summary-list">
                    <li>
                      <span>Sub Total</span>
                      <span>$ {cartList?.data[0]?.totalPrice}</span>
                    </li>

                    {/* <li>
                      <div className="coupon-area">
                        <span>Coupon Code</span>
                        <form>
                          <div className="form-inner">
                            <input type="text" placeholder="Your code" />
                            <button type="submit" className="apply-btn">
                              Apply
                            </button>
                          </div>
                        </form>
                      </div>
                    </li> */}
                    {/* <li>
                      <span>Total</span>
                      <span>$214.00</span>
                    </li> */}
                  </ul>
                  <Link
                    href="/checkout"
                    className="primary-btn1"
                    data-text="Processed Checkout"
                  >
                    <span>Processed Checkout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
