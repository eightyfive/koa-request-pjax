'use strict';

function getContainer(request) {
  let cont = request.get('X-PJAX-Container');
  if (!cont) {
    cont = request.query._pjax;
  }
  return cont;
}

module.exports = function pjax() {
  return function *pjax(next) {
    if (this.request.get('X-PJAX') === 'true') {
      this.state.pjax = {container: getContainer(this.request)};
    }

    yield next;

    const pjax = this.state.pjax || (this.flash ? this.flash.pjax : null);
    if (pjax) {
      if(pjax.url) {
        this.response.set('X-PJAX-URL', pjax.url);
      }
      if (pjax.version) {
        this.response.set('X-PJAX-Version', pjax.version);
      }
    }
  };
};
