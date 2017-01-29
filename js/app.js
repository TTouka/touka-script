$(function() {
  function toggleLineBreakChoices(charDir) {
    var btn;
    if (charDir === 'ttb' || charDir === 'btt') {
      $('.btn-group.for-h').hide();
      $('.btn-group.for-v').show();
      btn = $('input[name="lineDir"][value="rtl"]');
    } else {
      $('.btn-group.for-h').show();
      $('.btn-group.for-v').hide();
      btn = $('input[name="lineDir"][value="ttb"]');
    }
    btn.prop('checked');
    btn.parents('label').button('toggle');
  }
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
  $('input[name="charDir"]').on('change', function() {
    var dir = $(this).val();
    t.changeCharDir(dir);
    toggleLineBreakChoices(dir);
    t.draw();
  });
  $('input[name="lineDir"]').on('change', function() {
    var dir = $(this).val();
    t.changeLineDir(dir);
    t.draw();
  });
  $('input[name="charDir"]:checked').trigger('change');

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
