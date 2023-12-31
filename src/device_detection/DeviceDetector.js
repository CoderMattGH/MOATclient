class DeviceDetector {
    constructor () {
        throw "DeviceDetector cannot be initialised!";
    }

    static isMobileDevice = () => {
        // TODO: Add Android and Samsung.
        console.log("Detecting device.");

        let pattern = /iPad|iPhone|iPod|Mobile Safari/;
        let userAgent = navigator.userAgent;

        if (pattern.test(userAgent))
            return true;
        else
            return false;
    }
}

export default DeviceDetector;