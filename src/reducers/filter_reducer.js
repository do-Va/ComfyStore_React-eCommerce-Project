import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import products_reducer from './products_reducer';

const filter_reducer = (state, action) => {
  const { type, payload, name, value } = action;

  switch (type) {
    /* ---- START ---- */
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map(p => p.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        all_products: [...payload],
        filtered_products: [...payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    case UPDATE_SORT:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];

      if (sort === 'price-lowest')
        tempProducts.sort((a, b) => a.price - b.price);
      if (sort === 'price-highest')
        tempProducts.sort((a, b) => b.price - a.price);
      if (sort === 'name-a')
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
      if (sort === 'name-z')
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));

      // if (sort === 'name-a') tempProducts.sort((a, b) => a.name < b.name && -1);
      // if (sort === 'name-z') tempProducts.sort((a, b) => a.name > b.name && -1);

      return { ...state, filtered_products: tempProducts };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;

      let temProducts = [...all_products];
      // filtering

      // text
      if (text) {
        temProducts = temProducts.filter(product => {
          return product.name.toLowerCase().startsWith(text);
        });
      }

      // category
      if (category !== 'all') {
        temProducts = temProducts.filter(
          product => product.category === category
        );
      }

      // company
      if (company !== 'all') {
        temProducts = temProducts.filter(
          product => product.company === company
        );
      }

      // colors
      if (color !== 'all') {
        temProducts = temProducts.filter(product => {
          return product.colors.find(c => c === color);
        });
      }

      // price
      temProducts = temProducts.filter(product => product.price <= price);

      //shipping
      if (shipping) {
        temProducts = temProducts.filter(product => product.shipping === true);
      }

      return { ...state, filtered_products: temProducts };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    /* ---- ------- END ------- ---- */

    /* ---- START ---- */
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
    /* ---- ------- END ------- ---- */
  }
};

export default filter_reducer;
