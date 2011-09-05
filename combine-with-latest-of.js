Rx.Observable.prototype.CombineWithLatestOf = function(otherStream, combinator) {    
  var mainStream = this
  return Rx.Observable.Create(function(subscriber) {        
    var latest
    var d1 = mainStream.Subscribe(function(mainValue) { 
      subscriber.OnNext(combinator(mainValue, latest)) 
    })
    var d2 = otherStream.Subscribe(function(message) { latest = message})
    return function() {
      d1.Dispose()
      d2.Dispose()
    }
  })
}
Rx.Observable.prototype.SampledBy = function(otherStream) {
  return otherStream.CombineWithLatestOf(this, latter)
}

