import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button } from "antd";
import { Prices } from "../components/Prices";
import { toast } from "react-hot-toast";
const Home = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [highSellingProduct, setHighlySellingProducts] = useState([]);

  const Clicked = auth?.user?.ClickedProducts[0];

  const [recommendedProducts, setrecommendedProducts] = useState([]);

  // let count = 0;
  // for (let i = 0; i <= 8; i++) {
  //   if (auth?.user?.ClickedProducts[i] != "") {
  //     count++;
  //   } else {
  //     break;
  //   }
  // }

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //get category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //POP of Quantity Products
  const getSellingProduct = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/sellingProduct`
      );
      setHighlySellingProducts(data?.highSellingProducts);
      console.log("function running");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSellingProduct();
  }, []);

  // new function Recommentation System
  const getSimilarProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/recommended-display-product/`
      );
      setrecommendedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSimilarProduct();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <>
      <Layout title={"Admin- E-Commerce App"}>
        {/* .. */}

        {/* .. */}
        <div className="row container similar-products">
          <h4 className="col-12">Fast Selling Products ➡️</h4>

          {highSellingProduct.length < 1 && (
            <p className="col-12 text-center">No Similar Products found</p>
          )}

          <div className="d-flex flex-wrap">
            {highSellingProduct?.map((p) => (
              <div className="card m-2" key={p._id}>
                {/* <img
          src={`${process.env.REACT_APP_API}/api/v1/product/display-photo/${p._id}`}
          className="card-img-top"
          alt={p.name}
        /> */}
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name.substring(0, 15)}</h5>
                    <h5
                      className="card-title card-quantity"
                      style={{ color: "red" }}
                    >
                      Only {p.quantity} Left
                    </h5>
                    <h5 className="card-title card-price">₹ {p.price}</h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/productS/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New  */}
        <div className="row container similar-products">
          <h4>Recommended Products ➡️</h4>
          {console.log(auth?.user)}
          {/* {`Hello ${auth?.user?._id}  ${auth?.user?.name} ${Clicked}`} */}
          {recommendedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {recommendedProducts?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/display-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name.substring(0, 15)}</h5>
                    <h5 className="card-title card-price">₹ {p.price}</h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/productS/${p.slug}`)}
                    >
                      More Details
                    </button>
                    {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pop up Products */}

        {/* new */}
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-2">
              <h4 className="text-center mt-4">Filter by Category</h4>
              <div className="d-flex flex-column">
                {category?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>

              <h4 className="text-center mt-4">Filter By Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>

              <div className="d-flex flex-column">
                <Button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Reset Filter{" "}
                </Button>
              </div>
            </div>

            <div className="col-md-9">
              {JSON.stringify(radio, null, 4)}
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/display-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">₹ {p.price}</p>

                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/products/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary ms-1"
                        disabled={p.quantity <= 0}
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Product Added to cart !!!");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="m-2 p-3">
                {products && products.length < total && (
                  <button
                    className="btn loadmore"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading ..." : <> Loadmore</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
