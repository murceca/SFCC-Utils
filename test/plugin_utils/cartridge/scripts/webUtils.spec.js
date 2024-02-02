const { expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const assert = require('assert');

const Response = require('../../../mocks/dw/system/Response');
const Request = require('../../../mocks/dw/system/Request');
const Cookie = require('../../../mocks/dw/web/Cookie');
const Cookies = require('../../../mocks/dw/web/Cookies');

const webUtils = proxyquire.noCallThru().load('../../../../plugin_utils/cartridge/scripts/webUtils', {
  'dw/web/Cookie': Cookie,
  'dw/web/Cookies': Cookies
});

const { setCookie, getCookie, deleteCookie } = webUtils;

describe('webUtils', () => {
  beforeEach(() => {
    global.response = new Response();
    global.request = new Request();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('setCookie function', () => {
    it('should set a new cookie', () => {
      const spy = sinon.spy(response, 'addHttpCookie');
      setCookie('testCookie', 'testValue');
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, sinon.match.has('name', 'testCookie'));
    });

    it('should set a new cookie with options', () => {
      const spy = sinon.spy(response, 'addHttpCookie');
      setCookie('testCookie1', 'testValue1', {path: '/', maxAge: 1200});
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, sinon.match.has('maxAge', 1200));
      sinon.assert.calledWith(spy, sinon.match.has('path', '/'));
    });

    it('should set a new cookie with one option', () => {
      const spy = sinon.spy(response, 'addHttpCookie');
      setCookie('testCookie2', 'testValue2', { maxAge: 4200});
      sinon.assert.calledWith(spy, sinon.match.has('name', 'testCookie2'));
      sinon.assert.calledWith(spy, sinon.match.has('value', 'testValue2'));
      sinon.assert.calledWith(spy, sinon.match.has('maxAge', 4200));
    });
  });

  describe('getCookie function', () => {
    beforeEach(() => {
      const cookies = new Cookies();
      cookies.push(
        new Cookie('testCookie3', 'testValue3'),
        new Cookie('testCookie4', 'testValue4')
      );

      request.httpCookies = cookies;
    });

    it('should retrieve an existing cookie by its name', () => {
      const existingCookie = getCookie('testCookie3');
      expect(existingCookie.name).to.be.equal('testCookie3');
      expect(existingCookie.value).to.be.equal('testValue3');
    });

    it('should return null', () => {
      const nonExistingCookie = getCookie('nonExistingCookie');
      expect(nonExistingCookie).to.be.null;
    });
  });

  describe('deleteCookie function', () => {
    it('should delete an existing cookie by its name', () => {
      const spy = sinon.spy(response, 'addHttpCookie');
      deleteCookie('cookieName');
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, sinon.match.has('maxAge', 0));
    });
  });
});
