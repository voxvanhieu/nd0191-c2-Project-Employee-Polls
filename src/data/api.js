import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA.js'

export * from './_DATA.js'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestion(question) {
    return _saveQuestion(question)
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}