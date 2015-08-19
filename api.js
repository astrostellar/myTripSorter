/*
var list = {
  cardDescribe: {
    from: 'Departure',
    to: 'Arrival',
    vehicle: 'Transport type',
    number: 'Transport identification',
    seat: 'Seat place identification',
  },

  inputData: [{from: 'c', to: 'd'}, {from: 'a', to: 'b'}, {from: 'b', to: 'c'}]
};
*/


var Card = (function() {
  var CardApi = {};

  CardApi.sort = function(list) {
    var current = list[list.length - 1],
      result = [current],
      begin = current.from,
      end = current.to,
      card,
      cardNext,
      cardBefore,
      hashFrom = {},
      hashTo = {};

    for (var i = 0, l = list.length - 1; i < l; ++i) {
      card = list[i];
      hashFrom[card.from] = card;
      hashTo[card.to] = card;
    }

    if (!hashFrom[end] && !hashTo[begin]) {
      return list;
    }

    while (current) {
      cardNext = hashFrom[end];
      cardBefore = hashTo[begin];

      if (cardNext) {
        result.push(cardNext);
        hashFrom[end] = null;
        end = result[result.length - 1].to;
      } else {
        if (cardBefore) {
          result.unshift(cardBefore);
          hashTo[begin] = null;
          begin = result[0].from;
        } else {
          break;
        }
      }
    }

    return result;
  };


  CardApi.Transport = function(from, to, vehicleType, vehicleId, seatId) {
    this.from = from || 'Departure';
    this.to = to || 'Arrival';
    this.vehicle = vehicleType || 'Transport type';
    this.number = vehicleId || 'Transport identification';
    this.seat = seatId || '';
  };

  CardApi.Transport.prototype.display = function() {
    return 'Take ' + this.vehicle + ((this.number === '') ? '' : ' ' + this.number) +
      ' from ' + this.from + ' to ' +
      this.to + ((this.seat === '') ? '. No seat assignment' : '. Seat ' + this.seat) + '.';
  };

  CardApi.AirportBus = function(from, to) {
    CardApi.Transport.apply(this, arguments);
    this.vehicle = 'airport bus';
    this.number = '';
    this.seat = '';
  };

  CardApi.AirportBus.prototype = Object.create(CardApi.Transport.prototype);
  CardApi.AirportBus.prototype.constructor = CardApi.AirportBus;

  CardApi.Train = function(from, to, trainNum, seat) {
    CardApi.Transport.apply(this, arguments);
    this.number = trainNum;
    this.vehicle = 'train';
    this.seat = seat;
  };

  CardApi.Train.prototype = Object.create(CardApi.Transport.prototype);
  CardApi.Train.prototype.constructor = CardApi.Train;

  CardApi.Airplane = function(from, to, AirplaneNum, gateway, seat, baggageTicketId) {
    CardApi.Transport.apply(this, arguments);
    this.vehicle = 'plane';
    this.number = AirplaneNum;
    this.gateway = gateway;
    this.seat = seat;
    this.baggage = baggageTicketId || '';
    this.strNoTicked = 'Baggage will be automatically transferred from your last leg';
    this.strTickedId = 'Baggage drop at  ticket counter ';
  };

  CardApi.Airplane.prototype = Object.create(CardApi.Transport.prototype);
  CardApi.Airplane.prototype.constructor = CardApi.Airplane;

  CardApi.Airplane.prototype.display = function() {
    return 'From ' + this.from + ', take flight ' + this.number + ' to ' +
      this.to + '. Gateway ' + this.gateway +
      ((this.seat === '') ? '. No seat assignment.' : '. Seat ' + this.seat + '. ' +
        ((this.baggage === '') ? this.strNoTicked : this.strTickedId + this.baggage) + '.');
  };



  return CardApi;
})();