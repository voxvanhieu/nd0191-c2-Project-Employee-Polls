const { _saveQuestion, _saveQuestionAnswer } = require("./_DATA");


describe("_saveQuestion", () => {
    it("should save the question and update the user", async () => {
        const response = await _saveQuestion({
            author: { id: "mtsamis" },
            optionOneText: "Testing Data 1",
            optionTwoText: "Testing Data 2"
        });

        expect(response).toBeTruthy();

        expect(response).toEqual({
            id: expect.any(String),
            timestamp: expect.any(Number),
            author: { id: "mtsamis" },
            optionOne: {
                votes: [],
                text: "Testing Data 1"
            },
            optionTwo: {
                votes: [],
                text: "Testing Data 2"
            }
        });
    });

    it("should return error for false parameters", async () => {
        const response = await _saveQuestion({
            author: "mtsamis",
            optionOneText: null,
            optionTwoText: null
        }).catch(e => e);

        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});


describe("_saveQuestionAnswer", () => {
    it("should return true for correct parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "mtsamis",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("should return error for false parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: undefined,
            qid: undefined,
            answer: undefined
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});
