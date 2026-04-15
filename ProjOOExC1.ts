const MAX = 100
const MIN = 0
const STEP = 10

type Input = "TV" | "Projector" | "MediaPlayer"

abstract class Device {
    isOn: boolean = false

    turnOn(): void {
        this.isOn = true
    }

    turnOff(): void {
        this.isOn = false
    }
}

abstract class Player extends Device {
    abstract pause(): void
    abstract resume(): void
    abstract forward(): void
    abstract rewind(): void
}

interface HasBrightness {
    brightness: number
    setBrightness(b: number): void
    lowerBrightness(): void
    raiseBrightness(): void
}

function clamp(value: number,): number {
    return Math.max(MIN, Math.min(MAX, value))
}

class TV extends Player implements HasBrightness {
    volume = 0
    brightness = 0;

    play(): void {
        console.log("Now watching TV")
    }

    setBrightness(b: number): void {
        this.brightness = clamp(b)
        console.log(`TV brightness: ${this.brightness}`)
    }

    lowerBrightness(): void {
        this.brightness = clamp(this.brightness - STEP)
        console.log(`TV brightness: ${this.brightness}`)
    }

    raiseBrightness(): void {
        this.brightness = clamp(this.brightness + STEP)
        console.log(`TV brightness: ${this.brightness}`)
    }

    pause(): void {
        console.log('TV paused')
    }

    resume(): void {
        console.log('TV resumed')
    }

    forward(): void {
        console.log('Switched to next channel')
    }

    rewind(): void {
        console.log('Switched to previous channel')
    }
}

class Projector extends Player implements HasBrightness{
    brightness = 0;

    play(movie: string): void {
        console.log(`Now watching ${movie}`)
    }

    setBrightness(b: number): void {
        this.brightness = clamp(b)
        console.log(`Projector brightness: ${this.brightness}`)
    }

    lowerBrightness(): void {
        this.brightness = clamp(this.brightness - STEP)
        console.log(`Projector brightness: ${this.brightness}`)
    }

    raiseBrightness(): void {
        this.brightness = clamp(this.brightness + STEP)
        console.log(`Projector brightness: ${this.brightness}`)
    }

    pause(): void {
        console.log('Movie paused')
    }

    resume(): void {
        console.log('Movie resumed')
    }

    forward(): void {
        console.log(`Fastforwarded 10 seconds`)
    }

    rewind(): void {
        console.log(`Rewinded 10 seconds`)
    }
}

class MediaPlayer extends Player {
    play(album: string) {
        console.log(`Now listening to ${album}`)
    }

    pause(): void {
        console.log('Music paused')
    }

    resume(): void {
        console.log('Music resumed')
    }

    forward(): void {
        console.log('Skipped to the next song')
    }

    rewind(): void {
        console.log('Rewinded to the last song')
    }
}

class AmbientLight extends Device implements HasBrightness{
    brightness = 0;

    setBrightness(b: number): void {
        this.brightness = clamp(b)
        console.log(`Ambient light: ${this.brightness}`)
    }

    lowerBrightness(): void {
        this.brightness = clamp(this.brightness - STEP)
        console.log(`Ambient light: ${this.brightness}`)
    }

    raiseBrightness(): void {
        this.brightness = clamp(this.brightness + STEP)
        console.log(`Ambient light: ${this.brightness}`)
    }
}

class Receiver extends Device {
    volume = 0

    setVolume(v: number): void {
        this.volume = clamp(v)
        console.log(`Receiver volume: ${this.volume}`)
    }

    lowerVolume(): void {
        this.volume = clamp(this.volume - STEP)
        console.log(`Receiver volume: ${this.volume}`)
    }

    raiseVolume(): void {
        this.volume = clamp(this.volume + STEP)
        console.log(`Receiver volume: ${this.volume}`)
    }

    setInput(input: Input): void {
        console.log(`Receiver input set to ${input}`)
    }
}

class SoundSystem extends Device {
    setSurroundMode(): void {
        console.log("Surround mode enabled")
    }

    setStereoMode(): void {
        console.log("Stereo mode enabled")
    }
}

class HomeTheaterFacade {
    tv = new TV()
    projector = new Projector()
    mediaPlayer = new MediaPlayer()
    ambientLight = new AmbientLight()
    receiver = new Receiver()
    soundSystem = new SoundSystem()

    private deviceInUse: Player | null = null

    turnOn(): void {
        this.receiver.turnOn()
        this.soundSystem.turnOn()
        this.ambientLight.turnOn()
    }

    turnOff(): void {
        this.deviceInUse?.turnOff()
        this.tv.turnOff()
        this.projector.turnOff()
        this.mediaPlayer.turnOff()
        this.soundSystem.turnOff()
        this.receiver.turnOff()
        this.ambientLight.turnOff()
        this.deviceInUse = null
    }

    watchTV(): void {
        this.deviceInUse?.turnOff()
        this.receiver.setInput("TV")
        this.tv.turnOn()
        this.tv.setBrightness(50)
        this.ambientLight.setBrightness(50)
        this.receiver.setVolume(50)
        this.tv.play()
        this.deviceInUse = this.tv
    }

    watchMovie(movie: string): void {
        this.deviceInUse?.turnOff()
        this.receiver.setInput("Projector")
        this.projector.turnOn()
        this.projector.setBrightness(50)
        this.ambientLight.setBrightness(10)
        this.receiver.setVolume(50)
        this.soundSystem.setSurroundMode()
        this.projector.play(movie)
        this.deviceInUse = this.projector
    }

    listenMusic(album: string): void {
        this.deviceInUse?.turnOff()
        this.receiver.setInput("MediaPlayer")
        this.mediaPlayer.turnOn()
        this.receiver.setVolume(50)
        this.ambientLight.setBrightness(75)
        this.mediaPlayer.play(album)
        this.deviceInUse = this.mediaPlayer
    }

    pause(): void {
        this.deviceInUse?.pause()
    }

    resume(): void {
        this.deviceInUse?.resume()
    }

    forward(): void {
        this.deviceInUse?.forward()
    }

    rewind(): void {
        this.deviceInUse?.rewind()
    }
}