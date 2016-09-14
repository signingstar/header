const Config = require("../config/top_nav_config.json");

const presenter = ({cookies={}, topNav = true}, page) => {
  let isLogged = cookies['isLogged'];

  if(cookies) {
    page.set({isLogged});
  }

  if(topNav) {
    page.set({origConfig: Config});
  } else {
    page.set({origConfig: []});
  }

  return {isLogged};
}

export default presenter;
