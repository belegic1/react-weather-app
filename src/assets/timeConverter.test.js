import {timeConverter} from "./timeConverter"
describe("timeConverter.timeConverter", () => {
    test("0", () => {
        timeConverter(1000)
    })

    test("1", () => {
        timeConverter(14560.0)
    })

    test("2", () => {
        timeConverter(133331.0)
    })
})
