import React, {Component} from 'react';
import {reduxForm} from 'redux-form'
import {Post} from '../../components/index';

class PostFormContainer extends Component {
    render() {
        return (
            <div>
                <Post.PostForm fields={this.props.fields}/>
            </div>
        )
    }
}

const fields = ['title','description','tags','content_type','content','featured_image','secondary_featured_image','is_public']

const form = {
    form: 'postForm',
    fields
}

var rawContent = {
    blocks: [
        {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        },
        {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        },
        {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        },
        {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        },
        {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        }, {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        }, {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        }, {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        }, {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        },
    ],

    entityMap: {

    },
}

const mapStateToProps = () => {
    return {
        initialValues: {
            title: 'Good job man',
            description: 'var tung = "G',
            content: rawContent
        }
    }
}

export default reduxForm(form, mapStateToProps)(PostFormContainer)
