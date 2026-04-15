abstract class Beverage {
    abstract getDescription(): string
    abstract cost(): number
}

class Espresso extends Beverage {
    getDescription(): string {
        return "Espresso"
    }

    cost(): number {
        return 9
    }
}

class Cappuccino extends Beverage {
    getDescription(): string {
        return "Cappuccino"
    }

    cost(): number {
        return 15
    }
}

class Tea extends Beverage {
    getDescription(): string {
        return "Chá"
    }

    cost(): number {
        return 8
    }
}

abstract class AddOnDecorator extends Beverage {
    protected beverage: Beverage

    constructor(beverage: Beverage) {
        super()
        this.beverage = beverage
    }

    abstract getDescription(): string
}

class Milk extends AddOnDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ", Leite"
    }

    cost(): number {
        return this.beverage.cost() + 1
    }
}

class WhippedCream extends AddOnDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ", CHantilly"
    }

    cost(): number {
        return this.beverage.cost() + 3
    }
}

class Cinnamon extends AddOnDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ", Canela"
    }

    cost(): number {
        return this.beverage.cost() + 2
    }
}

class ChocolateSyrup extends AddOnDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ", Calda de Chocolate"
    }

    cost(): number {
        return this.beverage.cost() + 1
    }
}