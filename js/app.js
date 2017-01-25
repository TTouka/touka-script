$(function() {
    var t = new Touka({
        target: '#canvas',
    });
    $('#sizeSlider').slider()
      .on('slide', function() {
        t.changeSize($(this).val());
      });
    $('textarea[name="text"]').on('change', function() {
        var text = $(this).val();
        t.updateText(text);
    });
    $('#save').on('click', function(e) {
      e.preventDefault();
      t.exportAsImage();
    });
});
