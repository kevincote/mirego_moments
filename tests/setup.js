/* global global */

// CUSTOM CONFIG
const vuetify = require('vuetify');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const testUtils = require('@vue/test-utils');
const Vue = require('vue');

chai.use(sinonChai);

Vue.use(vuetify);
Vue.config.productionTip = false;

global.Vue = Vue;
global.expect = chai.expect;
global.mount = testUtils.mount;
global.createLocalVue = testUtils.createLocalVue;
global.testUtils = testUtils;
global.shallowMount = testUtils.shallowMount;
global.createWrapper = testUtils.createWrapper;
global.sinon = sinon;
global.context = describe;
