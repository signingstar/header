import presenter from '../src/presenter';
import { expect } from 'chai';

let topNavConfig = {};
const page = {
  set: (config) => {
    let {isLogged, origConfig} = config;
    if(isLogged) topNavConfig['isLogged'] = isLogged;
    if(origConfig) topNavConfig['origConfig'] = origConfig;
  }
}

describe('Header Presenter', () => {
  describe('#presenter', () => {
    it('should return false if user is not logged in', () => {
        let retVal = presenter({}, page);
        expect(retVal.isLogged).to.be.undefined;
        expect(topNavConfig.origConfig).to.be.empty;
        expect(topNavConfig.isLogged).to.be.empty;

    });
    it('should return true if user is logged in', () => {
        let retVal = presenter({cookies: {isLogged: true}}, page);
        expect(retVal.isLogged).to.be.true;
        expect(topNavConfig.origConfig).to.be.empty;
        expect(topNavConfig.isLogged).to.be.true;
    });
    it('should set config when topNav is true', () => {
        let retVal = presenter({topNav: true}, page);
        expect(retVal.isLogged).to.be.undefined;
        expect(topNavConfig.origConfig).to.be.empty;
    });
  });
});
