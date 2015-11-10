

function getContainer(request) {
  var cont = request.get('X-PJAX-Container');
  if (!cont) {
    cont = request.query._pjax;
  }
  return cont;
}

module.exports = function pjax() {
  return function *pjax(next) {
    var pjax = false;

    if (this.request.get('X-PJAX') === 'true') {
      pjax = {container: getContainer(this.request)};
    }
    if (pjax) {
      this.state.pjax = pjax;
    }

    yield next;

    if (pjax) {
      if (pjax.url) {
        this.response.set('X-PJAX-URL', pjax.url);
      }
      if (pjax.version) {
        this.response.set('X-PJAX-Version', pjax.version);
      }
    }
  };
};
