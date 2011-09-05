function MessageQueue() {     
    function remove(xs, x) {
       xs.splice(xs.indexOf(x), 1)
    }      
    function Subscription(observable) {
      var disposable              
      function cancel() { remove(subscriptions, subscription)}                                   
      function push(message) { messageQueue.push(message) }
      function start() {
        disposable = observable.Subscribe( push, cancel)        
      } 
      function stop() {
        if (disposable) disposable.Dispose()  
      }                   
      var subscription = {
        start : start, stop : stop
      }                 
      subscriptions.push(subscription)
      if (observers.length > 0) { start() }
      return subscription;
    }                                 
    var subscriptions = []
    var observers = []    
    var messageQueue = Rx.Observable.Create(function(observer) {                               
        observers.push(observer)
        if (observers.length == 1) {
          subscriptions.forEach(function(subscription) { subscription.start() })
        }
        return function() { 
          remove(observers, observer); 
          if (observers.length == 0) {
            subscriptions.forEach(function(subscription) { subscription.stop() })
          }
        }
    })    
    messageQueue.push = function (message) {          
        observers.map(identity).forEach(function(observer) {
            observer.OnNext(message)
        });
        return messageQueue
    }
    messageQueue.plug = function (observable) {
        Subscription(observable)
        return messageQueue
    }    
    return messageQueue
}


