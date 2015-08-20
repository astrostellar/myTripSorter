$ = (function() {
  function Sel(str) {
    var a = {};
    a._el = document.querySelector(str);
    
    a.add = function(str) {
      var
        update = false,
        arr;
      if (!a.check(str)) {
        update = true;
        arr = this._el.className.split(' ');
        arr.push(str);
        this._el.className = arr.join(' ');
      }

      if (update === true) {
        this._el.setAttribute("class", this._el.className.toString());
      }

      return this;
    };

    a.check = function(str) {
      var
        elClass = str,
        arr = this._el.className.split(' '),
        sum = 0;
      for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] === elClass) {
          sum++;
        }
      }

      return (sum === 0 ? false : true);
    };

    a.remove = function(str) {
      var
        update = false,
        arr;
      if (a.check(str)) {
        update = true;
        arr = this._el.className.split(' ');
        for (var i = 0, l = arr.length; i < l; i++) {
          if (arr[i] === str) {
            arr[i] = '';
          }
        }

        this._el.className = arr.join(' ');
      }

      if (update === true) {
        this._el.setAttribute("class", this._el.className.toString());
      }

      return this;
    };
    return a;
  }
  return Sel;
})();
