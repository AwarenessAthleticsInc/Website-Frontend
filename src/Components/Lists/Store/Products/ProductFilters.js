import Drawer from '../../../Layout/Drawer';
import SortIcon from '@mui/icons-material/Sort';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Button, colors } from '@mui/material';
import Accordions from '../../../Layout/Accordion';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductFilters = (props) => {
    const [categoriesFilter, setCategoriesFilter] = useState(false);
    const products = useSelector(state => state.products.products);
    const colors = [];
    products.map((product) => {
        product.colors.map((color) => {
            const index = colors.indexOf(color);
            if (index < 0) {
                colors.push(color);
            }

        });
    });
    const filter = () => {
        const newList = [];
        if(!categoriesFilter) {
            props.setCurrentList(products);
            return;
        }
        categoriesFilter.products.map((id) => {
            products.map((product) => {
                    if (product._id === id) {
                       newList.push(product);
                       
                    }
                });
        });
        props.setCurrentList(newList);
    }
    return <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Drawer anchor="right" text="Filters" icon={<SortIcon />}>
            <Box sx={{ width: 350, p: '1rem', textAlign: 'center' }} role="presentation">
                <h6>Filters</h6>
                <Button onClick={filter} color='primary' variant='outlined' sx={{ m: '2%', width: '96%', borderRadius: '50rem' }}>Apply</Button>
                <Accordions key='Categories' title='Categories'>
                    {props.categories.map((category) => {
                        return <Button onClick={() => { categoriesFilter.name === category.name ? setCategoriesFilter(false) : setCategoriesFilter(category) }}
                            sx={{ width: '98%', m: '1%' }}
                            variant={categoriesFilter.name === category.name ? 'contained' : 'outlined'}
                            color={categoriesFilter.name === category.name ? 'success' : 'secondary'} >
                            {category.name}
                        </Button>
                    })}
                </Accordions>
            </Box>
        </Drawer>
    </Box>
}
export default ProductFilters;