$ = (function() {
  function Sel(str) {
    var a = {};
    a._el = document.querySelector(str);
    a.add = function(str) {
      if (!this._el.classList.contains(str)) {
        this._el.classList.add(str);
      }
      return this;
    };

    a.remove = function(str) {
      if (this._el.classList.contains(str)) {
        this._el.classList.remove(str);
      }

      return this;
    };
    return a;
  }
  return Sel;
})();