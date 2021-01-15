import Overview from "./containers/overview";
import Trade from "./containers/trade";

export const routes = [
  {
    path: '/',
    content: Overview
  },
  {
    path: '/trade',
    content: Trade
  }
]