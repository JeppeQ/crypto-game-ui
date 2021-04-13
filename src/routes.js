import Overview from "./containers/overview";
import Leaderboard from "./containers/leaderboard";
import Trade from "./containers/trade";

export const routes = [
  {
    path: '/overview',
    content: Overview
  },
  {
    path: '/trade',
    content: Trade
  },
  {
    path: '/leaderboard',
    content: Leaderboard
  },
  {
    path: '/*',
    content: Overview
  }
]