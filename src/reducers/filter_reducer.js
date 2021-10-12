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

const filter_reducer = (state, action) => {
  const { type, payload, name, value } = action;
  switch (type) {
    /* ---- START ---- */
    case LOAD_PRODUCTS:
      return {
        ...state,
        all_products: [...payload],
        filtered_products: [...payload],
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
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
    /* ---- ------- END ------- ---- */
  }
};

export default filter_reducer;
