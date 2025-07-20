import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Categories = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Categories.vue");
const Products = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Products.vue");
const ShoppingLists = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ShoppingLists.vue");
const ListDetail = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ListDetail.vue");
const Purchase = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Purchase.vue");
const History = () =>
  import(/* webpackChunkName: "common" */ "@/pages/History.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "categories",
        name: "categories",
        component: Categories,
      },
      {
        path: "products",
        name: "products",
        component: Products,
      },
      {
        path: "lists",
        name: "lists",
        component: ShoppingLists,
      },
      {
        path: "lists/:id",
        name: "list-detail",
        component: ListDetail,
      },
      {
        path: "purchase/:id",
        name: "purchase",
        component: Purchase,
      },
      {
        path: "history",
        name: "history",
        component: History,
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
