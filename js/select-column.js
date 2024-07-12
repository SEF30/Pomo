var t = TrelloPowerUp.iframe();

function fetchColumns() {
    return t.lists('all').then(function(lists) {
        var select = document.getElementById('column-select');
        lists.forEach(function(list) {
            var option = document.createElement('option');
            option.value = list.id;
            option.text = list.name;
            select.add(option);
        });
    });
}

document.getElementById('start-focus-btn').addEventListener('click', function() {
    var listId = document.getElementById('column-select').value;
    t.set('board', 'shared', 'focusListId', listId).then(function() {
        return t.closePopup();
    }).then(function() {
        window.location.href = './focus-mode.html?listId=' + listId;
    });
});

t.render(function() {
    fetchColumns();
});
