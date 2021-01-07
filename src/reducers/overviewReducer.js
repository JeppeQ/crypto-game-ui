const initialOverviewState = {
  loans: [{
    logo: "https://cryptotesters.fra1.digitaloceanspaces.com/cryptotesters.com/AAVE_Token_Logo_cfd2a4eef2.svg",
    health: '1.6',
    collateral: '100$',
    debt: '20$',
    interest: '5%',
    data: [
      { name: 'Date', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Date', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Date', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Date', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Date', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Date', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Date', uv: 3490, pv: 4300, amt: 2100 },
    ]
  }]
}

const overviewReducer = (state, action) => {
  
}

export {
  initialOverviewState,
  overviewReducer
}