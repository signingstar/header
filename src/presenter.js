const Config = require("../config/top_nav_config.json");

const presenter = ({cookies={}, topNav = true, scriptFile='corejs'}, page, modules={}) => {
  const {jsAsset, logger} = modules;

  if(!page) {
    if(logger) {
      logger.error(`Layout Presenter: Page object not passed`);
    }

    return;
  }

  const isLogged = cookies['isLogged'];

  if(cookies) {
    page.set({isLogged});
  }

  if(jsAsset) {
    page.set({corejs: jsAsset(scriptFile)});
  }

  if(topNav) {
    page.set({origConfig: Config});
  } else {
    page.set({origConfig: []});
  }

  return {isLogged};
}

export default presenter;
