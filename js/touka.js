function Touka(options) {
  this.text = '';
  this.lines = [];

  this.srcSize = {
    h: 320,
    w: 370,
  };

  this.outSize = {
    h: undefined,
    w: undefined,
  };

  this.aspectRatio = 370 / 320;

  this.kanas = {
    'あ': 'a.png',
    'い': 'i.png',
    'う': 'u.png',
    'え': 'e.png',
    'お': 'o.png',
    'か': 'ka.png',
    'き': 'ki.png',
    'く': 'ku.png',
    'け': 'ke.png',
    'こ': 'ko.png',
    'さ': 'sa.png',
    'し': 'si.png',
    'す': 'su.png',
    'せ': 'se.png',
    'そ': 'so.png',
    'た': 'ta.png',
    'ち': 'ti.png',
    'つ': 'tu.png',
    'て': 'te.png',
    'と': 'to.png',
    'な': 'na.png',
    'に': 'ni.png',
    'ぬ': 'nu.png',
    'ね': 'ne.png',
    'の': 'no.png',
    'は': 'ha.png',
    'ひ': 'hi.png',
    'ふ': 'hu.png',
    'へ': 'he.png',
    'ほ': 'ho.png',
    'ま': 'ma.png',
    'み': 'mi.png',
    'む': 'mu.png',
    'め': 'me.png',
    'も': 'mo.png',
    'や': 'ya.png',
    'ゆ': 'yu.png',
    'よ': 'yo.png',
    'ら': 'ra.png',
    'り': 'ri.png',
    'る': 'ru.png',
    'れ': 're.png',
    'ろ': 'ro.png',
    'わ': 'wa.png',
    'を': 'wo.png',
    'ん': 'nn.png',
    'が': 'ga.png',
    'ぎ': 'gi.png',
    'ぐ': 'gu.png',
    'げ': 'ge.png',
    'ご': 'go.png',
    'ざ': 'za.png',
    'じ': 'zi.png',
    'ず': 'zu.png',
    'ぜ': 'ze.png',
    'ぞ': 'zo.png',
    'だ': 'da.png',
    'ぢ': 'di.png',
    'づ': 'du.png',
    'で': 'de.png',
    'ど': 'do.png',
    'ば': 'ba.png',
    'び': 'bi.png',
    'ぶ': 'bu.png',
    'べ': 'be.png',
    'ぼ': 'bo.png',
    'ぱ': 'pa.png',
    'ぴ': 'pi.png',
    'ぷ': 'pu.png',
    'ぺ': 'pe.png',
    'ぽ': 'po.png',
    'ゃ': 'xya.png',
    'ゅ': 'xyu.png',
    'ょ': 'xyo.png',
    'ゔ': 'vu.png',
  };

  this.initCanvas(options);
  this.changeSize(320 / 2);
}

Touka.prototype.initCanvas = function(options) {
  this.target = document.querySelector(options.target);
  this.canvas = document.createElement('canvas');
  this.target.appendChild(this.canvas);
};

Touka.prototype.changeSize = function(height) {
  this.outSize.h = height;
  this.outSize.w = Math.round(height * this.aspectRatio);
};

Touka.prototype.changeText = function(text) {
  this.text = text;
  this.lines = text.split(/\r\n|\r|\n/);
  this.maxLength = Math.max.apply(null, this.lines.map(function(line) {
    return line.length;
  }));
};

Touka.prototype.draw = function() {
  this.canvas.width = this.outSize.w * this.lines.length;
  this.canvas.height = this.outSize.h * this.maxLength;

  this.lines.forEach(function(line, i) {
    this.drawLine(line, i);
  }, this);
};

Touka.prototype.drawLine = function(text, row) {
  for (var i = 0; i < text.length; i++) {
    this.drawChar(text.substring(i, i + 1), row, i);
  }
};

Touka.prototype.drawChar = function(char, line, charNum) {
  var x = (this.lines.length - line - 1) * this.outSize.w;
  var y = charNum * this.outSize.h;
  var ctx = this.canvas.getContext('2d');

  var img = new Image();
  try {
    img.src = '/img/char/' + this.pickImage(char);
    img.onload = this.drawImage(ctx, img, x, y);
  } catch (e) {
    console.log(e);
  }
};

Touka.prototype.drawImage = function(ctx, img, x, y) {
  return (function() {
    ctx.drawImage(img, x, y, this.outSize.w, this.outSize.h);
  }).bind(this);
};

Touka.prototype.pickImage = function(char) {
  var image = this.kanas[char];

  if (!image) {
    throw new Error('no image');
  }

  return image;
};

Touka.prototype.exportAsImage = function() {
  window.open(this.canvas.toDataURL('image/png'));
};
