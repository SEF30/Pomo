var t = TrelloPowerUp.iframe();

document.getElementById('save-deal').addEventListener('click', function() {
  var dealValue = document.getElementById('deal-value').value;
  var probability = document.getElementById('probability').value;
  var expectedCloseDate = document.getElementById('expected-close-date').value;

  t.set('card', 'shared', 'dealValue', dealValue)
  .then(function() {
    return t.set('card', 'shared', 'probability', probability);
  })
  .then(function() {
    return t.set('card', 'shared', 'expectedCloseDate', expectedCloseDate);
  })
  .then(function() {
    t.closePopup();
  });
});

t.render(function() {
  return Promise.all([
    t.get('card', 'shared', 'dealValue'),
    t.get('card', 'shared', 'probability'),
    t.get('card', 'shared', 'expectedCloseDate')
  ])
  .spread(function(dealValue, probability, expectedCloseDate) {
    if (dealValue) document.getElementById('deal-value').value = dealValue;
    if (probability) document.getElementById('probability').value = probability;
    if (expectedCloseDate) document.getElementById('expected-close-date').value = expectedCloseDate;
  });
});
