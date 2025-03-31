class WETH_ICON {
    constructor(settings) {
        this.font_color = "#ffffff";
        this.font_family = "Font Awesome 6 Free";
        this.font_weight = "900";
        this.icon_background = "#003c7d";
        this.icon_class = "fas fa-address-card";
        this.icon_width = "300";
        this.weth_version = "25.0";

        if (settings != null) {
            Object.assign(this, settings);
        }

        if (settings != null && !("font_size" in settings)) {
            this.font_size = parseInt(this.icon_width) * 0.5;
        }
        if (settings != null && !("icon_text" in settings)) {
            this.icon_class = this._normalizeIconClass(this.icon_class);
            let ufw = this._getUnicodeAndFontWeight(this.icon_class);
            this.icon_text = ufw[0];
            if (settings != null && !("font_weight" in settings)) {
                this.font_weight = ufw[1];
            }
        }

        this._canvas = false;
        this._ctx = false;
        this._isFontLoaded = false;
    }

    _normalizeIconClass(iconClass) {
        if (!iconClass) return "fas fa-address-card";

        if (iconClass.startsWith("fas ") || iconClass.startsWith("fab ")) {
            return iconClass;
        }

        if (iconClass.startsWith("fa-")) {
            if (this.font_family === "Font Awesome 6 Brands") {
                return "fab " + iconClass;
            } else {
                return "fas " + iconClass;
            }
        }

        if (!iconClass.includes("fa-")) {
            if (this.font_family === "Font Awesome 6 Brands") {
                return "fab fa-" + iconClass;
            } else {
                return "fas fa-" + iconClass;
            }
        }

        return iconClass;
    }

    draw(element) {
        document.fonts.ready.then(() => this._draw(element));
    }

    _draw(element) {
        this._setUp();
        this._setBackground();
        this._setHardShadow();
        this._setTextWithShadow();
        this._setInlineShadow();
        this._setGradient();
        document.getElementById(element).appendChild(this.canvas);
    }

    _setUp() {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("class", "weth-icon-canvas");
        this.canvas.height = this.icon_width;
        this.canvas.width = this.icon_width;
        this._ctx = this.canvas.getContext("2d");
        this._ctx.font = `${this.font_weight} ${this.font_size}px "${this.font_family}"`;
    }

    _setBackground() {
        let radius = this.icon_width * 0.047;
        this._ctx.beginPath();
        switch (this.weth_version) {
            case "25.0":
                this._ctx.moveTo(radius, 0);
                this._ctx.lineTo(this.icon_width - radius, 0);
                this._ctx.arcTo(this.icon_width, 0, this.icon_width, radius, radius);
                this._ctx.lineTo(this.icon_width, this.icon_width - radius);
                this._ctx.arcTo(this.icon_width, this.icon_width, this.icon_width - radius, this.icon_width, radius);
                this._ctx.lineTo(radius, this.icon_width);
                this._ctx.arcTo(0, this.icon_width, 0, this.icon_width - radius, radius);
                this._ctx.lineTo(0, radius);
                this._ctx.arcTo(0, 0, this.icon_width - radius, 0, radius);
                break;
            default:
                console.log("Not supported version selected.");
                break;
        }
        this._ctx.clip();
        this._ctx.fillStyle = this.icon_background;
        this._ctx.fill();
    }

    _setText(text, color, centerX, centerY, font_size) {
        this._ctx.save();
        this._ctx.fillStyle = color;
        this._ctx.font = `${this.font_weight} ${font_size}px "${this.font_family}"`;
        this._ctx.textAlign = "center";
        this._ctx.textBaseline = "middle";
        this._ctx.fillText(`${text}`, centerX, centerY);
        this._ctx.restore();
    }

    _pSBC(p, c0, c1, l) {
        let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof c1 == "string";
        if (typeof p != "number" || p < -1 || p > 1 || typeof c0 != "string" || (c0[0] != "r" && c0[0] != "#") || (c1 && !a)) return null;
        if (!this.pSBCr) this.pSBCr = d => {
            let n = d.length, x = {};
            if (n > 9) {
                ([r, g, b, a] = d = d.split(",")), (n = d.length);
                if (n < 3 || n > 4) return null;
                (x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))), (x.g = i(g)), (x.b = i(b)), (x.a = a ? parseFloat(a) : -1);
            } else {
                if (n == 8 || n == 6 || n < 4) return null;
                if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
                d = i(d.slice(1), 16);
                if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
                else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
            }
            return x;
        };
        (h = c0.length > 9), (h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h), (f = this.pSBCr(c0)), (P = p < 0),
            (t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }), (p = P ? p * -1 : p), (P = 1 - p);
        if (!f || !t) return null;
        if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
        else (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)), (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)), (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
        (a = f.a), (t = t.a), (f = a >= 0 || t >= 0), (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
        if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
        else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
    }

    _setHardShadow() {
        for (let i = 0; i < (this.icon_width * (2 / 3)); i++) {
            const tmp_width = (parseInt(this.icon_width) - 2 * i) / 2;
            const tmp_height = (parseInt(this.icon_width) + 2 * i) / 2;
            this._setText(this.icon_text, this._pSBC(-0.4, this.icon_background), tmp_width, tmp_height, this.font_size);
        }
    }

    _setTextWithShadow() {
        this._ctx.save();
        switch (this.weth_version) {
            case "25.0":
                this._ctx.shadowOffsetX = 0;
                this._ctx.shadowOffsetY = this.icon_width * 0.02;
                this._ctx.shadowBlur = 0;
                this._ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
                break;
            default:
                console.log("Not supported version selected.");
                break;
        }
        this._setText(this.icon_text, this.font_color, parseInt(this.icon_width) / 2, parseInt(this.icon_width) / 2, this.font_size);
        this._ctx.restore();
    }

    _setInlineShadow() {
        switch (this.weth_version) {
            case "25.0":
                let is_radius = this.icon_width * 0.047;
                let is_height = this.icon_width * 0.015;
                this._ctx.save();
                this._ctx.globalAlpha = 0.4;
                this._ctx.fillStyle = "#282F33";
                this._ctx.beginPath();
                this._ctx.moveTo(is_radius - is_height, this.icon_width);
                this._ctx.lineTo(this.icon_width - is_radius, this.icon_width);
                this._ctx.arcTo(this.icon_width, this.icon_width, this.icon_width, this.icon_width - is_radius, is_radius);
                this._ctx.lineTo(this.icon_width, this.icon_width - (is_radius + is_height));
                this._ctx.arcTo(this.icon_width, this.icon_width - is_height, this.icon_width - is_radius, this.icon_width - is_height, is_radius);
                this._ctx.lineTo(is_radius, this.icon_width - is_height);
                this._ctx.arcTo(0, this.icon_width - is_height, 0, this.icon_width - (is_radius + is_height), is_radius);
                this._ctx.lineTo(0, this.icon_width - is_height);
                this._ctx.arcTo(0, this.icon_width, is_radius - is_height, this.icon_width, is_radius);
                this._ctx.fill();
                this._ctx.fillStyle = "#FFFFFF";
                this._ctx.beginPath();
                this._ctx.moveTo(is_radius - is_height, 0);
                this._ctx.lineTo(this.icon_width - is_radius, 0);
                this._ctx.arcTo(this.icon_width, 0, this.icon_width, is_radius - is_height, is_radius);
                this._ctx.lineTo(this.icon_width, is_radius + 2);
                this._ctx.arcTo(this.icon_width, is_height, this.icon_width - is_radius, is_height, is_radius);
                this._ctx.lineTo(is_radius, is_height);
                this._ctx.arcTo(0, is_height, 0, is_radius + is_height, is_radius);
                this._ctx.lineTo(0, is_radius);
                this._ctx.arcTo(0, 0, is_radius - is_height, 0, is_radius);
                this._ctx.fill();
                this._ctx.restore();
                break;
            default:
                console.log("Not supported version selected.");
                break;
        }
    }

    _setGradient() {
        switch (this.weth_version) {
            case "25.0":
                this._ctx.save();
                this._ctx.globalAlpha = 0.2;
                var gradient = this._ctx.createLinearGradient(0, this.icon_width, this.icon_width, 0);
                gradient.addColorStop(0, "rgba(0,0,0,0)");
                gradient.addColorStop(1, "#FFFFFF");
                this._ctx.fillStyle = gradient;
                this._ctx.fillRect(0, 0, this.icon_width, this.icon_width);
                this._ctx.restore();
                break;
            default:
                console.log("Not supported version selected.");
                break;
        }
    }

    _getUnicodeAndFontWeight(clazzName) {
        let tempI = document.createElement('i');
        tempI.className = clazzName;
        document.body.appendChild(tempI);
        let char = window.getComputedStyle(tempI, ':before').content.replace(/'|"/g, '');
        let font_weight = window.getComputedStyle(tempI).getPropertyValue("font-weight");
        document.body.removeChild(tempI);

        console.log("Classe:", clazzName, "Unicode:", char, "Peso:", font_weight);

        if (!char || char === 'none' || char.length === 0) {
            console.warn("Classe inválida ou não suportada:", clazzName);
            char = '\uf0d1';
        }

        return [char, font_weight];
    }

    generateSVG() {
        let radius = this.icon_width * 0.047;
        let is_height = this.icon_width * 0.015;
        let center = this.icon_width / 2;
        let shadowOffsetY = this.icon_width * 0.02;

        let [iconText, _] = this._getUnicodeAndFontWeight(this.icon_class);
        let iconPath = this._getFontAwesomePath(this.icon_class);
        
        let darkBackground = this._pSBC(-0.4, this.icon_background);

        let scale = this.font_size / 512;

        let svg = `
<svg width="${this.icon_width}" height="${this.icon_width}" viewBox="0 0 ${this.icon_width} ${this.icon_width}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <clipPath id="roundedCorners">
            <path d="M${radius} 0H${this.icon_width - radius}C${this.icon_width-radius*0.45} 0 ${this.icon_width} ${radius*0.45} ${this.icon_width} ${radius}V${this.icon_width - radius}C${this.icon_width} ${this.icon_width-radius*0.45} ${this.icon_width-radius*0.45} ${this.icon_width} ${this.icon_width - radius} ${this.icon_width}H${radius}C${radius*0.45} ${this.icon_width} 0 ${this.icon_width-radius*0.45} 0 ${this.icon_width - radius}V${radius}C0 ${radius*0.45} ${radius*0.45} 0 ${radius} 0Z" />
        </clipPath>
        
        <linearGradient id="overlayGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(0,0,0,0)" />
            <stop offset="100%" stop-color="#FFFFFF" />
        </linearGradient>
        
        <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="${shadowOffsetY}" stdDeviation="0.5" flood-color="rgba(0,0,0,0.3)" flood-opacity="0.3" />
        </filter>
    </defs>

    <g clip-path="url(#roundedCorners)">
        <rect x="0" y="0" width="${this.icon_width}" height="${this.icon_width}" fill="${this.icon_background}" />
        
        <path d="M0 0h${this.icon_width}v${is_height}h-${this.icon_width}z" fill="white" fill-opacity="0.38" />
        
        <path d="M0 ${this.icon_width-is_height}h${this.icon_width}v${is_height}h-${this.icon_width}z" fill="#282F33" fill-opacity="0.4" />
        
        <rect x="0" y="0" width="${this.icon_width}" height="${this.icon_width}" fill="url(#overlayGradient)" opacity="0.2" />
        
        ${this._generateHardShadowSVG(iconPath, darkBackground, scale, center)}
        
        <g transform="translate(${center}, ${center}) scale(${scale})" filter="url(#dropShadow)">
            <path d="${iconPath}" fill="${this.font_color}" transform="translate(-256, -256)" />
        </g>
    </g>
</svg>`;
        
        return svg;
    }
    
    _generateHardShadowSVG(iconPath, shadowColor, scale, center) {
        let shadowEffect = '';
        
        const shadowCount = Math.floor(this.icon_width * 0.6);
        const step = Math.max(1, Math.floor(shadowCount / 20));
        
        for (let i = 0; i < shadowCount; i += step) {
            const tmpWidth = (parseInt(this.icon_width) - 2 * i) / 2;
            const tmpHeight = (parseInt(this.icon_width) + 2 * i) / 2;
            
            const opacity = Math.max(0.08, 0.6 - (i / shadowCount) * 0.7);
            
            shadowEffect += `
    <g transform="translate(${tmpWidth}, ${tmpHeight}) scale(${scale})">
        <path d="${iconPath}" fill="${shadowColor}" transform="translate(-256, -256)" opacity="${opacity}" />
    </g>`;
        }
        
        return shadowEffect;
    }
    
    _getFontAwesomePath(iconClass) {
        const iconPaths = {
            'fa-address-card': 'M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm96 112a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM120 384c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm168-152v0c0 13.3-10.7 24-24 24s-24-10.7-24-24v0c0-13.3 10.7-24 24-24s24 10.7 24 24zm40-24c13.3 0 24 10.7 24 24v0c0 13.3-10.7 24-24 24s-24-10.7-24-24v0c0-13.3 10.7-24 24-24z',
            'fa-users-gear': 'M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-8.2-9.6-20.5-15.4-33.3-15.4H160c-26.5 0-48 21.5-48 48s21.5 48 48 48H256c26.5 0 48-21.5 48-48c0-3.6-.4-7.1-1.2-10.4L432 288.9c10.9 6.5 23.5 10 36.8 10c39.8 0 72.2-32.2 72.2-72v-9.6l16.8-14.4c10.4-8.9 12.5-24.1 4.9-35.5l-21.4-32c-7.6-11.4-22.9-14.7-34.7-7.5l-39.6 23.8c-5.8-2.7-11.8-4.9-18.1-6.3V129l39.6-23.8c11.7-7 15.1-22.3 7.5-34.7l-21.4-32C467 27.2 451.8 25 440.9 33.9l-32.4 27.9h-74.3L301.9 33.9c-10.9-8.9-26.1-6.8-33.7 4.7l-21.4 32c-7.6 11.4-4.2 26.7 7.5 34.7L294 129zM384 448c0 35.3 28.7 64 64 64s64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64zM160 464c-8.8 0-16-7.2-16-16s7.2-16 16-16H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H160zM0 304c0-26.5 21.5-48 48-48H64c26.5 0 48 21.5 48 48v16c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V304zM48 368c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16s-16 7.2-16 16v48c0 8.8 7.2 16 16 16zm272-208c0-26.5 21.5-48 48-48h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H368c-26.5 0-48-21.5-48-48zm48 32c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16z',
            'fa-truck': 'M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z',
            'fa-thumbs-up': 'M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z',
            'fa-exclamation-triangle': 'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z',
            
            'fa-github': 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
            'fa-linkedin': 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z',
            'fa-docker': 'M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z',
        };

        let iconName = '';
        
        const match = iconClass.match(/fa-([a-z0-9-]+)/);
        if (match && match[1]) {
            iconName = 'fa-' + match[1];
        }
        
        if (iconPaths[iconName]) {
            return iconPaths[iconName];
        }
        
        console.warn("Ícone não encontrado no banco de dados:", iconName);
        return 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z';
    }
}