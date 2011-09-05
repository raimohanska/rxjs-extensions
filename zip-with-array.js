// ZipWithArray complements the bug in FromArray.Zip which just doesn't
// work with live observables

x.Observable.prototype.ZipWithArray = function(array, selector) {·
    return this.Zip(Rx.Observable.FromArray(array).Concat(Rx.Observable.Never()), 
}

