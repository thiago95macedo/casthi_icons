class CASTHI_ICON {
    constructor(settings) {
        // Valores padrão
        this.font_color = "#ffffff";
        this.font_family = "Material Symbols Outlined";
        this.font_weight = "900";
        this.icon_background = "#05285B";
        this.icon_class = "person";
        this.icon_width = "200"; // Tamanho fixo do ícone
        this.font_size = "160";  // 80% de 200px (proporção ERP)
        this.casthi_version = "25.0";

        // Aplica configurações personalizadas, exceto tamanhos
        if (settings != null) {
            // Copia todas as configurações, exceto tamanho do ícone e fonte
            const settingsCopy = {...settings};
            delete settingsCopy.icon_width;
            delete settingsCopy.font_size;
            
            // Aplica as configurações, mantendo os tamanhos fixos
            Object.assign(this, settingsCopy);
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
        if (!iconClass) return "person";
        
        // Para Material Icons, apenas retorna o nome do ícone
        return iconClass.trim();
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
        this.canvas.setAttribute("class", "casthi-icon-canvas");
        this.canvas.height = this.icon_width;
        this.canvas.width = this.icon_width;
        this._ctx = this.canvas.getContext("2d");
        this._ctx.font = `${this.font_weight} ${this.font_size}px "${this.font_family}"`;
    }

    _setBackground() {
        let radius = this.icon_width * 0.047;
        this._ctx.beginPath();
        switch (this.casthi_version) {
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
        switch (this.casthi_version) {
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
        switch (this.casthi_version) {
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
        switch (this.casthi_version) {
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

    _getUnicodeAndFontWeight(iconName) {
        // Para Material Icons, criamos um elemento span com a classe material-symbols-outlined
        let tempSpan = document.createElement('span');
        tempSpan.className = 'material-symbols-outlined';
        tempSpan.textContent = iconName;
        tempSpan.style.fontFamily = 'Material Symbols Outlined';
        tempSpan.style.fontSize = '1px';
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.left = '-9999px';
        
        document.body.appendChild(tempSpan);
        
        // Para Material Icons, o texto é o próprio nome do ícone
        let char = iconName;
        let font_weight = window.getComputedStyle(tempSpan).getPropertyValue("font-weight");
        
        document.body.removeChild(tempSpan);

        console.log("Ícone:", iconName, "Texto:", char, "Peso:", font_weight);

        if (!char || char.length === 0) {
            console.warn("Nome de ícone inválido:", iconName);
            char = 'person';
        }

        return [char, font_weight];
    }

    generateSVG() {
        // Garantir que as propriedades são números, não strings
        const iconWidth = parseInt(this.icon_width);
        const fontSize = parseInt(this.font_size);
        
        // Calcular proporções baseadas no tamanho atual
        let radius = iconWidth * 0.047;
        let is_height = iconWidth * 0.015;
        let center = iconWidth / 2;
        let shadowOffsetY = iconWidth * 0.02;

        // Obter char e paths do ícone
        let [iconText, _] = this._getUnicodeAndFontWeight(this.icon_class);
        
        // Para Material Icons, usamos texto ao invés de paths SVG
        let iconPath = this._getMaterialIconPath(this.icon_class);
        
        // Cor da sombra
        let darkBackground = this._pSBC(-0.4, this.icon_background);

        // Fatores de escala para path SVG
        let scale = fontSize / 512;

        // Construa o SVG com as dimensões e cores personalizadas
        let svg = `
<svg width="${iconWidth}" height="${iconWidth}" viewBox="0 0 ${iconWidth} ${iconWidth}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <clipPath id="roundedCorners">
            <path d="M${radius} 0H${iconWidth - radius}C${iconWidth-radius*0.45} 0 ${iconWidth} ${radius*0.45} ${iconWidth} ${radius}V${iconWidth - radius}C${iconWidth} ${iconWidth-radius*0.45} ${iconWidth-radius*0.45} ${iconWidth} ${iconWidth - radius} ${iconWidth}H${radius}C${radius*0.45} ${iconWidth} 0 ${iconWidth-radius*0.45} 0 ${iconWidth - radius}V${radius}C0 ${radius*0.45} ${radius*0.45} 0 ${radius} 0Z" />
        </clipPath>
        
        <linearGradient id="overlayGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(0,0,0,0)" />
            <stop offset="100%" stop-color="#FFFFFF" />
        </linearGradient>
        
        <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="${shadowOffsetY}" stdDeviation="0.5" flood-color="rgba(0,0,0,0.3)" flood-opacity="0.3" />
        </filter>
    </defs>

    <!-- Grupo com clip-path para cantos arredondados, contém TODOS os elementos -->
    <g clip-path="url(#roundedCorners)">
        <!-- Fundo principal com a cor personalizada -->
        <rect x="0" y="0" width="${iconWidth}" height="${iconWidth}" fill="${this.icon_background}" />
        
        <!-- Borda interna superior (branca) -->
        <path d="M0 0h${iconWidth}v${is_height}h-${iconWidth}z" fill="white" fill-opacity="0.38" />
        
        <!-- Borda interna inferior (preta) -->
        <path d="M0 ${iconWidth-is_height}h${iconWidth}v${is_height}h-${iconWidth}z" fill="#282F33" fill-opacity="0.4" />
        
        <!-- Gradiente de sobreposição como no Canvas -->
        <rect x="0" y="0" width="${iconWidth}" height="${iconWidth}" fill="url(#overlayGradient)" opacity="0.2" />
        
        <!-- Efeito sombra 3D com o tamanho personalizado -->
        ${this._generateHardShadowSVG(iconText, darkBackground, scale, center, iconWidth)}
        
        <!-- Ícone principal com a cor personalizada -->
        <g transform="translate(${center}, ${center})" filter="url(#dropShadow)">
            <text x="0" y="0" text-anchor="middle" dominant-baseline="central" 
                  font-family="${this.font_family}" font-size="${fontSize}" 
                  font-weight="${this.font_weight}" fill="${this.font_color}">
                ${iconText}
            </text>
        </g>
    </g>
</svg>`;
        
        return svg;
    }
    
    // Gera o efeito de sombra 3D para o ícone - reproduz exatamente o método _setHardShadow()
    _generateHardShadowSVG(iconText, shadowColor, scale, center, iconWidth) {
        let shadowEffect = '';
        
        // Usando as mesmas constantes do método _setHardShadow() do Canvas
        const shadowCount = Math.floor(iconWidth * 0.6); // Limita para desempenho
        const step = Math.max(1, Math.floor(shadowCount / 20)); // Reduz número de camadas
        
        for (let i = 0; i < shadowCount; i += step) {
            // Usa exatamente a mesma fórmula do Canvas para posicionamento
            const tmpWidth = (parseInt(iconWidth) - 2 * i) / 2;
            const tmpHeight = (parseInt(iconWidth) + 2 * i) / 2;
            
            // Calcula a opacidade - mais próxima do topo = mais transparente
            const opacity = Math.max(0.08, 0.6 - (i / shadowCount) * 0.7);
            
            shadowEffect += `
    <g transform="translate(${tmpWidth}, ${tmpHeight})">
        <text x="0" y="0" text-anchor="middle" dominant-baseline="central" 
              font-family="${this.font_family}" font-size="${this.font_size}" 
              font-weight="${this.font_weight}" fill="${shadowColor}" opacity="${opacity}">
            ${iconText}
        </text>
    </g>`;
        }
        
        return shadowEffect;
    }
    
    _getMaterialIconPath(iconName) {
        // Para Material Icons, não temos paths SVG específicos como Font Awesome
        // Retornamos um path genérico que será substituído pelo texto do ícone
        return 'M0 0h512v512H0z'; // Path genérico para fallback
    }
}