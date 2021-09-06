import Overview from "../containers/overview";
import Leaderboard from "../containers/leaderboard";
import Trade from "../containers/trade";
import News from "../containers/news";

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
    path: '/news',
    content: News
  },
  {
    path: '/*',
    content: Overview
  }
]