import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Sort by id (ordered)
        data.sort((a, b) => a.id - b.id);

        setProducts(data);

      } catch (err) {
        console.error(err);

        // fallback demo
        setProducts([
          {
            id: 1,
            title: "Demo Product",
            price: 100,
            image: "https://via.placeholder.com/200"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container py-5">
      <div className="row g-4">

        {products.map((item) => (
          <div className="col-md-3 col-sm-6" key={item.id}>
            <div className="card h-100 text-center p-3">

              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                height="200"
                style={{ objectFit: "contain" }}
              />

              <div className="card-body">
                <h6 className="card-title">
                  {item.title.substring(0, 40)}...
                </h6>

                <p className="card-text fw-bold">
                  ₹{(item.price * 75).toFixed(0)}
                </p>

                <Link to={`/products/₹{item.id}`} className="btn btn-outline-dark">
                  Buy Now
                </Link>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Products;
