import { Box, Grid } from "@mui/material";
import ProductCard from "../../Components/Lists/Store/Products/ProductCard";
import { useSelector } from "react-redux";

const Store = (props) => {
    const products = useSelector(state => state.products.products);
    const allStock = useSelector(state => state.stock.stock);
    return <Box sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem' } }}>
        <Grid container spacing={1}>
            {products.map((item) => {
                const stock = allStock.filter((stock) => {
                    return stock.ItemID === item._id;
                });
                return <Grid item xs={12} sm={4} md={3} xl={2}>
                    <ProductCard
                        key={item._id}
                        products={item}
                        stock={stock}
                    />
                </Grid>
            })}
        </Grid>
    </Box>


}
export default Store;