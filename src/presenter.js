const Config = require("../config/top_nav_config.json");

const presenter = ({session={}, topNav = true, scriptFile='core'}, page, modules={}) => {
  const {jsAsset, logger} = modules;

  if(!page) {
    if(logger) {
      logger.error(`Layout Presenter: Page object not passed`);
    }

    return;
  }

  const isLogged = session.user !== undefined;

  page.set({isLogged});

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
