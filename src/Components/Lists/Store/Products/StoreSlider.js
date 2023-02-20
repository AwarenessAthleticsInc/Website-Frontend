import CarouselContainer from "../../../Layout/Carousel";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const StoreSlider = (props) => {
    const products = useSelector(state => state.products.products);
    const stock = useSelector(state => state.stock.stock);
    return <section id="Products" className="p-2">
        <Link to="/store"><h4 style={{ padding: "1%" }} className="text-start">Featured Products <i className="far fa-hand-pointer" aria-hidden="true"></i></h4></Link>
        <CarouselContainer>
            {products.slice(0, 14).map((product) => {
                const stocks = stock.filter((stock) => {
                    return stock.ItemID === product._id;
                });
                return <ProductCard
                    key={product._id}
                    products={product}
                    stock={stocks}
                />
            })
            }
        </CarouselContainer>
    </section>

}

export default StoreSlider;
