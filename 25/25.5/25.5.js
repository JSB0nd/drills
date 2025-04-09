import { configureStore, createSlice, combineSlices } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, setupListeners } from '@reduxjs/toolkit/query';
import {createProductCard} from "./createProductCard";
 
export const products = createApi({
  reducerPath: 'products',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
   tagTypes: ['Products'],
   endpoints: (build) => ({
     getProducts: build.query({
      query: (name) => `${name}`,
      providesTags: ['Products']
     }),
     createProduct: build.mutation({
      invalidatesTags: ['Products'],
      query: (body) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        return {
          url: 'createProduct',
          method: 'post',
          headers,
          body,
        };
      },
     }),
     deleteProduct: build.mutation({
      invalidatesTags: ['Products'],
      query: (body) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        return {
          url: 'deleteProduct',
          method: 'delete',
          body,
        };
      }
     }),
     updateProduct: build.mutation({
      invalidatesTags: ['Products'],
      query: (body) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        return {
          url: 'updateProduct',
          method: 'post',
          body,
        };
      }
     })
  }),
});

const counter = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: (create) => ({
        increment: create.reducer((state) => {
            return state += 1;
        }),
        decrement: create.reducer((state) => {
          if(state === 0) {
            return state;
          }
         return state -= 1;
     })
   })
});
 
const rootReducer = combineSlices(counter, products);
const {getProducts, createProduct, deleteProduct, updateProduct} = products.endpoints;

const store = configureStore({
    reducer: rootReducer,
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(products.middleware),
});

setupListeners(store.dispatch);

const {increment, decrement} = counter.actions;

const [incrB, decrB, requestB, counterC, productsC, tabV, tabC, pageV, pageC, formC] = [
  'increment-button', 'decrement-button', 'products-button', 'counter', 'products-result',
  'tab-view', 'tab-create', 'page-view', 'page-create', 'form-create',
].map(id => document.getElementById(id));
[[incrB, increment], [decrB, decrement]].forEach(([button, action]) => button.addEventListener('click', () => store.dispatch(action())));

requestB.addEventListener('click', () => {
  store.dispatch(getProducts.initiate('getProducts'));
}, false);

store.subscribe(() => {
  const state = store.getState();
  const {counter, products} = state;
  counterC.value = counter;
  const getProductsRecord = 'getProducts("getProducts")'

  if (getProductsRecord in products.queries && 'data' in products.queries[getProductsRecord]){
    const productCardList = createProductCard(products.queries[getProductsRecord].data);
    productsC.innerHTML = '';
    productCardList.forEach(productCard => productsC.appendChild(productCard));
  }
});

[[tabC, pageV, tabV, pageC], [tabV, pageC, tabC, pageV]].forEach(([tabHide, pageHide, tabShow, pageShow]) => {
  tabHide.addEventListener('click', () => {
    addClassList([tabHide, pageHide], 'hidden');
    removeClassList([tabShow, pageShow], 'hidden');
  }, false);
});

formC.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const userTypedData = [...new FormData(formC).entries()];
  const body = userTypedData.reduce((body, [name, value]) => ({...body, [name]: value}), {});

  store.dispatch(createProduct.initiate(body));
});

const formDel = document.getElementById('form-delete');

formDel.addEventListener('submit', function(event){
  event.preventDefault();

  store.dispatch(deleteProduct.initiate({ uid: 6 }));
})

const formUpd = document.getElementById('form-update');
formUpd.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const userTypedData = [...new FormData(formUpd).entries()];
  const body = userTypedData.reduce((body, [name, value]) => ({...body, [name]: value}), {});

  store.dispatch(updateProduct.initiate({uid: 4, ...body}));
});

const state = store.getState();
counterC.value = state.counter;

function addClassList(list, cssClass){
  list.forEach(item => item.classList.add(cssClass));
}

function removeClassList(list, cssClass){
  list.forEach(item => item.classList.remove(cssClass));
}