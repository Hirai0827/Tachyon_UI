export class HSV {
    h:number;
    s:number;
    v:number;
    constructor(h:number,s:number,v:number) {
        this.h = h;
        this.s = s;
        this.v = v;
    }
    ConvertToRGB(){
        let r:number = this.v;
        let g:number = this.v;
        let b:number = this.v;
        if (this.s > 0.0) {
            this.h *= 6.0;
            let i:number = Math.floor(this.h);
            let f:number = this.h - i;
            switch (i) {
                default:
                case 0:
                    g *= 1 - this.s * (1 - f);
                    b *= 1 - this.s;
                    break;
                case 1:
                    r *= 1 - this.s * f;
                    b *= 1 - this.s;
                    break;
                case 2:
                    r *= 1 - this.s;
                    b *= 1 - this.s * (1 - f);
                    break;
                case 3:
                    r *= 1 - this.s;
                    g *= 1 - this.s * f;
                    break;
                case 4:
                    r *= 1 - this.s * (1 - f);
                    g *= 1 - this.s;
                    break;
                case 5:
                    g *= 1 - this.s;
                    b *= 1 - this.s * f;
                    break;
            }
        }
        return new RGB(r,g,b);
    }
}

export class RGB {
    r:number;
    g:number;
    b:number;
    constructor(r:number,g:number,b:number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    ConvertToHSV(){
        let max:number = this.r > this.g ? this.r : this.g;
        max = max > this.b ? max : this.b;
        let min:number = this.r < this.g ? this.r : this.g;
        min = min < this.b ? min : this.b;
        let h:number = max - min;
        if (h > 0.0) {
            if (max == this.r) {
                h = (this.g - this.b) / h;
                if (h < 0.0) {
                    h += 6.0;
                }
            } else if (max == this.g) {
                h = 2.0 + (this.b - this.r) / h;
            } else {
                h = 4.0 + (this.r - this.g) / h;
            }
        }
        h /= 6.0;
        let s:number = (max - min);
        if (max != 0.0)
            s /= max;
        let v:number = max;
        return new HSV(h,s,v);
    }

}
