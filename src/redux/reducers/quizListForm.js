import {answerTypes, quizTypes, getQuizType} from '../../constants/quizType';
import {
    UPDATE_KEY_FORM, UPDATE_QUIZ_FORMS, UPDATE_QUIZ_FORM, ADD_QUIZ_FORM, REMOVE_QUIZ_FORM,
    CLEAR_QUIZ_FORM, UPDATE_QUIZ_LIST_FORM, CHANGE_KEY_SUGGEST_EDITOR, SHUFFLE_QUIZZES,
    SERVER_CREATE_QUIZ_LIST, SERVER_GET_QUIZ_LIST, SERVER_UPDATE_QUIZ_LIST
} from '../actions/QuizListFormAction';
import update from 'react-addons-update';

const quizzes = [
    {
        ...getQuizType(),
        index: 0
    }
]

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


const getInitialState = ()=> {
    return {
        id: '',
        title: '',
        description: '',
        time: 10,
        category_id: '',
        tags: [],
        quizzes: quizzes,
        backupQuizzes: [],
        pdf_file: '',
        default_answer_type: answerTypes.EDITOR,
        editor_options: {
            suggest: true,
        },
        updated_at: '',
        error: false
    }
}


const addIndexToQuizs = (quizzes) => {
    var i = 0;
    quizzes.map((q, index)=> {
        if (q.type === quizTypes.MUTIPLE_CHOOSE && !q.parent_id) {
            quizzes[index].index = i;
            i++;
        }
        else if (q.type === quizTypes.GROUP_MULTIPLE_CHOOSE) {
            quizzes[index].index = -1;
            quizzes.filter(q2 => q2.parent_id === q.id).map(q3 => {
                let q3_index = quizzes.findIndex(q4 => q4.id === q3.id);
                quizzes[q3_index].index = i;
                i++;
                return {};
            });
        }
        return {};
    });
    return quizzes;
}

export default function createReducer(state = getInitialState(), action) {
    switch (action.type) {
        case UPDATE_KEY_FORM:
            return update(state, {
                [action.key]: {$set: action.value}
            });
        case UPDATE_QUIZ_FORMS:
            return {
                ...state,
                quizzes: addIndexToQuizs(action.quizzes)
            }
        case UPDATE_QUIZ_FORM:
            let quizIndex = state.quizzes.findIndex(q => q.id === action.id);
            //console.log(JSON.stringify(state.quizzes));
            return update(state, {
                quizzes: {
                    [quizIndex]: {$set: action.quiz}
                }
            });
        case ADD_QUIZ_FORM:
            return update(state, {
                quizzes: {
                    $push: [
                        {
                            ...getQuizType(action.quizType, action.defaultAnswerType),
                            parent_id: action.parent_id
                        }]
                }
            });
        case REMOVE_QUIZ_FORM:
            return {
                ...state,
                quizzes: state.quizzes.filter((quiz) => quiz.id !== action.id)
            }
        case UPDATE_QUIZ_LIST_FORM:
            return {
                ...state,
                ...action.quizListForm,
                quizzes: addIndexToQuizs(action.quizListForm.quizzes)
            }
        case CHANGE_KEY_SUGGEST_EDITOR:
            return update(state, {
                editor_options: {
                    [action.key]: {$set: action.value}
                }
            });
        case CLEAR_QUIZ_FORM:
            return getInitialState();
        case SHUFFLE_QUIZZES:
            return {
                ...state,
                quizzes: shuffle(state.quizzes)
            }
        case SERVER_GET_QUIZ_LIST:
            if(action.payload.getQuizList.success === false){
                return {
                    ...state,
                    error: true
                }
            }
            let quizzes = action.payload.getQuizList.quizzes;
            if (action.isShuffleQuizzes) {
                quizzes = shuffle(quizzes);
            }
            return {
                ...state,
                ...action.payload.getQuizList,
                quizzes: addIndexToQuizs(quizzes),
                error: false
            };
        case SERVER_CREATE_QUIZ_LIST:
            return {
                ...state,
                id: action.payload.createQuizList.id,
                quizzes: action.payload.createQuizList.quizzes,
                updated_at: new Date()
            };
        case SERVER_UPDATE_QUIZ_LIST:
            return {
                ...state,
                updated_at: new Date()
            }
        default:
            return state;
    }
}