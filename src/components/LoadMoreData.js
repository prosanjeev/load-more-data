import { useEffect, useState } from "react";

const LoadMoreData = () => {

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0)
    const [loding, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    

    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20 }`)
                const json = await response.json();
                setProducts((prevData) => [...prevData, ...json.products]);
                setLoading(false)
            } catch (error) {
                setError("Unable to fetch Data")
                setLoading(false);
            }
        };
        fetchProductsData();
    }, [count]);

    useEffect(() => {
        if (products && products.length === 100) setDisableButton(true);
      }, [products]);

    if (loding) return <div>loding....</div>
    if (error) return <div>{error}</div>


    return (
        <div className="load-more-container">
      <div className="product-container">
        {products && products.length
          ? products.map((item, index) => (
              <div className="product" key={index}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.price}$</p>
                <p>{item.brand}</p>
                <p>Discount:  {item.discountPercentage}%</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
        {disableButton ? <p>You have reached to 100 products</p> : null}
      </div>
    </div>
    )
}

export default LoadMoreData