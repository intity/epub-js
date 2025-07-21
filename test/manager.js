import DefaultViewManager from "../src/managers/default"

class CustomVM extends DefaultViewManager {
    constructor(book, options) {
        super(book, options);
        this.name = "custom";
    }
}

export default CustomVM;