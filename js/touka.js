function Touka(options) {
    this.text = '';
    this.lines = [];
    this.charSize = 320 / 2;
    this.charWidth = 320 / 2;
    this.charHeight = 370 / 2;

    this.kanas = {
        'あ': 'a.png',
        'い': 'i.png',
        'う': 'u.png',
        'え': 'e.png',
        'お': 'a.png',
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

    this.init(options);
}

Touka.prototype.init = function(options) {
    this.target = document.querySelector(options.target);
    this.canvas = document.createElement('canvas');
    this.target.appendChild(this.canvas);
    this.changeSize(this.charSize);
    this.updateText('とうかもじ');
};

Touka.prototype.changeSize = function(size) {
    this.charSize = size;
    this.charHeight = this.charSize;
    this.charWidth = Math.round(this.charHeight * 370 / 320);

    this.draw();
};

Touka.prototype.updateText = function(text) {
    this.text = text;
    this.lines = text.split(/[\n\r]+/);
    this.maxLength = Math.max.apply(null, this.lines.map(function(line) {
        return line.length;
    }));

    this.draw();
};

Touka.prototype.draw = function() {
    this.canvas.width = this.charWidth * this.lines.length;
    this.canvas.height = this.charHeight * this.maxLength;

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
    var charWidth = this.charWidth;
    var charHeight = this.charHeight;
    var x = (this.lines.length - line - 1) * this.charWidth;
    var y = charNum * this.charHeight;
    var ctx = this.canvas.getContext('2d');

    var img = new Image();
    try {
        img.src = '/img/char/' + this.pickImage(char);
        img.onload = function() {
            ctx.drawImage(img, x, y, charWidth, charHeight);
        };
    } catch (e) {
        console.log(e);
    }
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
