import styles from "./ProductCard.module.css";
import { Fragment } from "react";
import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import ProductDialog from "./ProductDialog";
import ImgNextGen from "../../../UI/NextGenImages";
import { Box } from "@mui/material";
const ProductCard = (props) => {
    const array = props.products.assets.Image.split('/');
    const name = array[1];
    const location = array[0];
    return <Box sx={{p: '0.5rem'}}>
        <Paper elevation={2} sx={{ textAlign: 'center' }}>
            <ImgNextGen
                srcWebp={`/${location}/${name}/400/${name}.webp`}
                srcJpeg={`/${location}/${name}/400/${name}.jpeg`}
                fallback={`/${location}/${name}/400/${name}.png`}
                alt={`${props.products.name}`}
                style={{ width: '96%', margin: '2%', borderRadius: '0.5rem' }}
            />
            <Typography variant="h5">{props.products.name}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {props.products.colors.map((colors) => {
                    return <i key={colors} style={{ color: colors }} className={`fas fa-circle ${styles.colors}`}></i>
                })}
            </Box>
            {props.products.sizes.length > 1 ? <p>{`${props.products.sizes[0]} - ${props.products.sizes[props.products.sizes.length - 1]}`}</p> : <p>{props.products.sizes[0]}</p>}
            {props.products.pricing.onSale === true ? <Fragment>
                <Typography variant="h5" sx={styles.priceOut}>{`$${Number(props.products.pricing.price).toFixed(2)}`}</Typography>
                <Typography sx={styles.price} variant="p">On Sale: <span className={styles.salePrice}>{`$${Number(props.products.pricing.salePrice).toFixed(2)}`}</span></Typography>
            </Fragment> : <Typography variant="h5">Price: <span className='price'>{`$${Number(props.products.pricing.price).toFixed(2)}`}</span></Typography>}
            <ProductDialog setCart={props.setCart} product={props.products} stock={props.stock} />
        </Paper>
    </Box> 
}
export default ProductCard;




