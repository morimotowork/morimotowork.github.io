$(document).ready(function () {

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const NUM_BUCKETS = 50;
    const SPREAD = 1;
    const MOBILE_THRESHOLD = 120;

    let visited = new Array(NUM_BUCKETS).fill(false);
    let perimeterLength = 0;
    let glowRect = null;
    let sharpRect = null;
    let isComplete = false;
    let startDist = null;

    let currentCols = 5;
let currentSquareSize = 0;
let originalSquareSize = 0;


$(document).on('click', '.moldura-form button[type="submit"]', function () {

    // Fade out inputs, selects, row, label — mantém só o h3
    $('.moldura-form input, .moldura-form select, .moldura-form .moldura-form-row, .moldura-form-check, .moldura-form button, .moldura-shimmer')
    .fadeOut(400);

setTimeout(function () {
    $('.moldura-form h3').text('Sucesso');
    $('.moldura-form h3').addClass('visible');
}, 400);

    // Fade out do h3
    setTimeout(function () {
$('.moldura-form h3').removeClass('visible');
setTimeout(function () {
            $('body').removeClass('form_reveal');

            setTimeout(function () {

                // Remove complete → imagens somem, grid encolhe (3s CSS)
                $('body').removeClass('complete');

                $('#grid').css({
                    'grid-template-columns': `repeat(${currentCols}, ${originalSquareSize}px)`,
                    'width': (currentCols * originalSquareSize) + 'px'
                });
                currentSquareSize = originalSquareSize;

                // Adiciona success
                $('body').addClass('success');

                const $frases = $('#frase_afterwards b');
                $frases.each(function (i) {
                    const $b = $(this);
                    setTimeout(function () {
                        $b.addClass('reveal');
                    }, 2000 + (i * 1500));
                });

                // Após todas reveladas + 2000ms, fade out do h2
                const totalTime = 3000 + ($frases.length - 1) * 1500 + 2000;
               setTimeout(function () {
    $('#frase_afterwards').addClass('fadeout');
    setTimeout(function () {
        startSlideshow();
        $('#btn-share').addClass('visible');
    }, 1500); // espera o fade out do h2 terminar
}, totalTime);

        }, 600); // era 1200
    }, 200); // era 300
}, 1400); // era 2400
});

    // ── GRID ──────────────────────────────────────────────────────────────
    function buildGrid() {

        const mobile = window.innerWidth < 768;
const cols = mobile ? 3 : 5;
const squareSize = mobile ? window.innerWidth * 0.5 : window.innerWidth / 5;

currentCols = cols;
currentSquareSize = squareSize;
originalSquareSize = squareSize; // <-- adiciona

        let rows = Math.ceil(window.innerHeight / squareSize);
        if (rows % 2 === 0) rows++;

        const $grid = $('#grid');
        $grid.empty();
        $grid.css({
            'grid-template-columns': `repeat(${cols}, ${squareSize}px)`,
            'width': (cols * squareSize) + 'px'
        });

        const total = cols * rows;
        const middleIndex = Math.floor(rows / 2) * cols + Math.floor(cols / 2);

        for (let i = 0; i < total; i++) {
            if (i === middleIndex) {
              $grid.append(`
    <div class="cell" id="molduramain">
        <div class="moldura-shimmer"></div>
        <p class="hint">Contorne o quadrado com o cursor</p>
        <div class="moldura-form">
        <h3></h3>
        <div class="moldura-form-row">
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="E-mail" />
            <div class="moldura-form-row">
            <input type="text" class="nascimento-input" placeholder="Nascimento" />
                <select>
                    <option value="" disabled selected>Estado</option>
                    <option>AC</option>
                    <option>AL</option>
                    <option>AP</option>
                    <option>AM</option>
                    <option>BA</option>
                    <option>CE</option>
                    <option>DF</option>
                    <option>ES</option>
                    <option>GO</option>
                    <option>MA</option>
                    <option>MT</option>
                    <option>MS</option>
                    <option>MG</option>
                    <option>PA</option>
                    <option>PB</option>
                    <option>PR</option>
                    <option>PE</option>
                    <option>PI</option>
                    <option>RJ</option>
                    <option>RN</option>
                    <option>RS</option>
                    <option>RO</option>
                    <option>RR</option>
                    <option>SC</option>
                    <option>SP</option>
                    <option>SE</option>
                    <option>TO</option>
                </select>
            </div>
            <label class="moldura-form-check">
                <span>Ao enviar meus dados, concordo com os <a id="termos_open">Termos de Uso</a>.<em>*</em></span>
            </label>
            </div>
            <button type="submit">Enviar cadastro</button>
        </div>
    </div>
`);
            } else {
                $grid.append('<div class="cell"></div>');
            }
        }

        initShimmer();
    }

    // ── SHIMMER SVG ───────────────────────────────────────────────────────
    function initShimmer() {
        const el = document.getElementById('molduramain');
        if (!el) return;

        const oldSvg = el.querySelector('svg.shimmer-svg');
        if (oldSvg) oldSvg.remove();

        const r = el.getBoundingClientRect();
        const pad = 20;
        perimeterLength = 2 * (r.width + r.height);

        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.classList.add('shimmer-svg');
        svg.style.cssText = `
            position: absolute;
            top: ${-pad}px; left: ${-pad}px;
            width: ${r.width + pad * 2}px; height: ${r.height + pad * 2}px;
            overflow: visible; pointer-events: none; z-index: 5;
        `;

        const defs = document.createElementNS(SVG_NS, 'defs');
        const filter = document.createElementNS(SVG_NS, 'filter');
        filter.id = 'moldura-glow';
        filter.setAttribute('x', '-100%'); filter.setAttribute('y', '-100%');
        filter.setAttribute('width', '300%'); filter.setAttribute('height', '300%');

        const blur = document.createElementNS(SVG_NS, 'feGaussianBlur');
        blur.setAttribute('in', 'SourceGraphic');
        blur.setAttribute('stdDeviation', '6');
        blur.setAttribute('result', 'blur');

        const feMerge = document.createElementNS(SVG_NS, 'feMerge');
        ['blur', 'SourceGraphic'].forEach(src => {
            const n = document.createElementNS(SVG_NS, 'feMergeNode');
            n.setAttribute('in', src);
            feMerge.appendChild(n);
        });

        filter.appendChild(blur);
        filter.appendChild(feMerge);
        defs.appendChild(filter);
        svg.appendChild(defs);

     function makeRect(stroke, strokeWidth, filterAttr) {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', pad); rect.setAttribute('y', pad);
    rect.setAttribute('width', r.width); rect.setAttribute('height', r.height);
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', stroke);
    rect.setAttribute('stroke-width', strokeWidth);
    rect.setAttribute('stroke-dasharray', `0 ${perimeterLength}`);
    rect.setAttribute('stroke-linecap', 'square');
    rect.setAttribute('opacity', filterAttr ? '0.75' : '0.95'); // glow mais suave
    if (filterAttr) rect.setAttribute('filter', filterAttr);
    svg.appendChild(rect);
    return rect;
}

glowRect  = makeRect('#8a6828', 3, 'url(#moldura-glow)');
sharpRect = makeRect('#c9a84c', 0.6, null);     

        el.appendChild(svg);

        visited = new Array(NUM_BUCKETS).fill(false);
        isComplete = false;
        startDist = null;
    }

    // ── HELPERS ───────────────────────────────────────────────────────────
    function getMoldura() {
        const el = document.getElementById('molduramain');
        return el ? el.getBoundingClientRect() : null;
    }

    function getAngleBucket(mx, my) {
        const r = getMoldura();
        if (!r) return 0;
        const angle = Math.atan2(my - (r.top + r.height / 2), mx - (r.left + r.width / 2));
        const normalized = (angle + Math.PI) / (2 * Math.PI);
        return Math.floor(normalized * NUM_BUCKETS) % NUM_BUCKETS;
    }

    function distanceToBorder(mx, my) {
        const r = getMoldura();
        if (!r) return Infinity;
        const dx = Math.max(r.left - mx, 0, mx - r.right);
        const dy = Math.max(r.top  - my, 0, my - r.bottom);
        if (dx === 0 && dy === 0) {
            return Math.min(mx - r.left, r.right - mx, my - r.top, r.bottom - my);
        }
        return Math.sqrt(dx * dx + dy * dy);
    }

    function getStartDist(mx, my, rect) {
        const W = rect.width, H = rect.height;
        const cx = rect.left + W / 2, cy = rect.top + H / 2;
        const angle = Math.atan2(my - cy, mx - cx);
        const cos = Math.cos(angle), sin = Math.sin(angle);
        const hw = W / 2, hh = H / 2;
        const abscos = Math.abs(cos), abssin = Math.abs(sin || 1e-10);

        let bx, by;
        if (hw * abssin <= hh * abscos) {
            bx = cos > 0 ? hw : -hw;
            by = sin * (hw / (abscos || 1e-10));
        } else {
            by = sin > 0 ? hh : -hh;
            bx = cos * (hh / abssin);
        }

        const ax = cx + bx, ay = cy + by;
        const eps = 1;

        if (Math.abs(bx - hw)  < eps) return W + (ay - rect.top);            // right
        if (Math.abs(by - hh)  < eps) return W + H + (rect.right - ax);      // bottom
        if (Math.abs(bx + hw)  < eps) return W + H + W + (rect.bottom - ay); // left
        return ax - rect.left;                                                  // top
    }

   function setProgress(p) {
    if (!glowRect || !sharpRect) return;

    const drawn = perimeterLength * p;
    const gap   = perimeterLength - drawn;
    const da    = `${drawn} ${gap}`;
    const off   = startDist !== null ? -startDist : 0;

    glowRect.setAttribute('stroke-dasharray', da);
    glowRect.setAttribute('stroke-dashoffset', off);
    sharpRect.setAttribute('stroke-dasharray', da);
    sharpRect.setAttribute('stroke-dashoffset', off);

    // 0 → 0.7 durante o progresso, 1.0 só ao completar
const shimmerOpacity = p >= 1 ? 0.6 : p * 0.4;
// 4s no início → 1s ao completar
const shimmerDuration = p >= 1 ? 3 : 8 - (p * 5);

const shimmer = document.querySelector('#molduramain .moldura-shimmer');
if (shimmer) {
    shimmer.style.opacity = shimmerOpacity;
    shimmer.style.animationDuration = `${shimmerDuration}s`;
}

    const hint = document.querySelector('#molduramain .hint');
if (hint) hint.style.opacity = Math.max(0, 1 - p * 1.2);
}

    // ── TRACKING ──────────────────────────────────────────────────────────
    function track(mx, my, checkDistance) {
        if (isComplete) return;
        if (checkDistance && distanceToBorder(mx, my) > MOBILE_THRESHOLD) return;

        if (startDist === null) {
            const r = getMoldura();
            if (r) startDist = getStartDist(mx, my, r);
        }

        const bucket = getAngleBucket(mx, my);
        for (let s = -SPREAD; s <= SPREAD; s++) {
            visited[(bucket + s + NUM_BUCKETS) % NUM_BUCKETS] = true;
        }

        const progress = visited.filter(Boolean).length / NUM_BUCKETS;
        setProgress(progress);

if (progress >= 1) {
    isComplete = true;
    $('body').addClass('complete');

    const targetSize = currentSquareSize * 1.7;

$('svg.shimmer-svg').fadeOut(500, function () {
    const targetSize = currentSquareSize * 1.7;

    $('#grid').css({
        'grid-template-columns': `repeat(${currentCols}, ${targetSize}px)`,
        'width': (currentCols * targetSize) + 'px'
    });

    currentSquareSize = targetSize;

    setTimeout(function () {
        $('body').addClass('form_reveal');
    }, 2800);
});
}
    }

    // ── EVENTOS ───────────────────────────────────────────────────────────
    $(document).on('mousemove', function (e) {
        track(e.clientX, e.clientY, false);
    });

    $(document).on('touchmove', function (e) {
        e.preventDefault();
        const t = e.originalEvent.touches[0];
        track(t.clientX, t.clientY, true);
    });

    // ── RESIZE ────────────────────────────────────────────────────────────
    let resizeTimer;
  $(window).on('resize', function () {
    if (isComplete) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGrid, 150);
});

    buildGrid();

    $(document).on('change', '.moldura-form select', function () {
    $(this).toggleClass('has-value', $(this).val() !== '');
});

   $(document).on('input', '.nascimento-input', function () {
    let v = $(this).val().replace(/\D/g, ''); // remove tudo que não é número
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5);
    $(this).val(v.slice(0, 10)); // limita a DD/MM/AAAA
});



// ── SLIDESHOW ──
function startSlideshow() {
    const totalImgs = 12;
    let lastCell = null;
    let lastImg  = null;

    function getVisibleCells() {
        return $('.cell:not(#molduramain)').filter(function () {
            const rect = this.getBoundingClientRect();
            const cellArea = rect.width * rect.height;
            if (cellArea === 0) return false;

            const visibleW = Math.max(0, Math.min(rect.right, window.innerWidth)  - Math.max(rect.left, 0));
            const visibleH = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
            const visibleArea = visibleW * visibleH;

            return (visibleArea / cellArea) >= 0.4;
        });
    }

    function showNext() {
        const $cells = getVisibleCells();
        if (!$cells.length) return;

        // Célula aleatória diferente da anterior
        let $cell, attempts = 0;
        do {
            $cell = $cells.eq(Math.floor(Math.random() * $cells.length));
            attempts++;
        } while ($cell.is(lastCell) && attempts < 10);
        lastCell = $cell;

        // Imagem aleatória diferente da anterior
        let imgNum;
        do {
            imgNum = Math.floor(Math.random() * totalImgs) + 1;
        } while (imgNum === lastImg);
        lastImg = imgNum;

        const $img = $('<img>').addClass('foto-final').attr('src', `../imgs/fotosfinal/${imgNum}.jpg`);
        $cell.append($img);

        // Fade in
        setTimeout(() => $img.addClass('visible'), 50);

        // Fade out e remove
        setTimeout(() => {
            $img.removeClass('visible');
            setTimeout(() => $img.remove(), 1000);
        }, 2500);
    }

    setInterval(showNext, 1800);
    showNext();
}

// ── SHARE BUTTON ──
$('#btn-share').on('click', function () {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        });
    }
});

});