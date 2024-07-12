document.getElementById('start-focus-btn').addEventListener('click', function() {
    var listId = document.getElementById('column-select').value;
    t.set('board', 'shared', 'focusListId', listId).then(function() {
        return t.closePopup();
    }).then(function() {
        window.location.href = './focus-mode.html?listId=' + listId;
    });
});
