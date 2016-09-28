export const quizTypes = {
    MUTIPLE_CHOOSE: 'multiple_choose',
    GROUP_MULTIPLE_CHOOSE: 'group_multiple_choose'
}

export const answerTypes = {
    LATEX: 'latex',
    EDITOR: 'editor'
}

export const answerTypesStyle = {
    [answerTypes.LATEX]: {
        icon: 'icon-calculator',
        color: '#e67e22',
        text: 'Thêm latex'
    },
    [answerTypes.EDITOR]: {
        icon: 'icon-note',
        color: '#8e44ad',
        text: 'Thêm soạn thảo'
    }
}

export function getAnswerType(typeAnswer = answerTypes.LATEX) {
    return {id: 'question' + Date.now(), type: typeAnswer, answer: ''};
}

export function getAnswerTypeStyle(typeAnswer) {
    return answerTypesStyle[typeAnswer];
}

export function getQuizType(typeQuiz = quizTypes.MUTIPLE_CHOOSE, typeAnswer = answerTypes.EDITOR) {
    let answers = [];
    answers.push(getAnswerType(typeAnswer));
    return {
        id: 'quiz' + Date.now(),
        type: typeQuiz,
        question: '',
        answers,
        suggest_answer: '',
        has_suggest_answer: false,
        correct_answer: '',
        parent_id: 0
    }
}