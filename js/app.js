$(function() {
  var t = new Touka({
    target: '#canvas',
  });
  $('#sizeSlider').slider()
    .on('slide', function() {
      t.changeSize($(this).val());
      t.draw();
    });
  $('textarea[name="text"]').on('change', function() {
    var text = $(this).val();
    t.changeText(text);
    t.draw();
  });
  $('#save').on('click', function(e) {
    e.preventDefault();
    t.exportAsImage();
  });

  var samples = [
    'とうかもじ',
    'ろうろうこ',
    'びがびょう',
  ];

  var idx = Math.floor(Math.random() * samples.length);

  t.changeText(samples[idx]);
  t.draw();
});
