var t = TrelloPowerUp.iframe();

t.render(function() {
  return t.lists('id', 'name')
  .then(function(lists) {
    return Promise.all(lists.map(function(list) {
      return t.cards('id', 'name', 'shared', list.id)
      .then(function(cards) {
        var listTotal = cards.reduce(function(total, card) {
          return total + (parseFloat(card.shared.dealValue) || 0);
        }, 0);
        return {name: list.name, total: listTotal};
      });
    }));
  })
  .then(function(listTotals) {
    var ctx = document.getElementById('pipelineChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: listTotals.map(function(lt) { return lt.name; }),
        datasets: [{
          label: 'Pipeline Value',
          data: listTotals.map(function(lt) { return lt.total; }),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value ($)'
            }
          }
        }
      }
    });

    var totalValue = listTotals.reduce(function(total, lt) { return total + lt.total; }, 0);
    document.getElementById('totalValue').textContent = 'Total Pipeline Value: $' + totalValue.toFixed(2);
  });
});
