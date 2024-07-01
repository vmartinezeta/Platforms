export default class Punto {
    private x:number
    private y: number

    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }

    setX(x:number) {
        this.x = x
    }

    getX() {
        return this.x
    }

    setY(y:number) {
        this.y = y
    }
    
    getY() {
        return this.y
    }

    newInstance() {
        return new Punto(this.x, this.y)
    }
}