/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import KatexInline from './KatexInline';

export default class MathInput extends Component {
    componentDidMount() {
        if(this.props.readOnly) return;
        var context = this;
        var MQ = MathQuill.getInterface(2);
        if (typeof this.props.defaultValue == 'string') {
            this.refs.mathInput.innerHTML = this.props.defaultValue.trim();
        }
        var answer = MQ.MathField(this.refs.mathInput, {
            handlers: {
                edit: function () {
                    context.props.onChange(answer.latex());
                    context.props.onBlur();
                },
                enter: function () {
                    context.props.onBlur();
                },
                moveOutOf: function () {
                }
            },
            spaceBehavesLikeTab: true,
            leftRightIntoCmdGoes: 'up',
            restrictMismatchedBrackets: true,
            sumStartsWithNEquals: true,
            supSubsRequireOperand: true,
            charsThatBreakOutOfSupSub: '+-=<>',
            autoSubscriptNumerals: true,
            autoCommands: 'pi theta Delta pm sqrt sum',
            autoOperatorNames: 'sin cos',
            substituteTextarea: function () {
                return document.createElement('textarea');
            }
        });
    }

    render() {
        return (
            <span>
                {!this.props.readOnly &&
                <span onClick={this.props.onFocus} onFocus={this.props.onFocus} onBlur={this.props.onBlur}
                      ref="mathInput"></span>
                }
                {this.props.readOnly && <KatexInline tex={this.props.defaultValue}/>}
            </span>
        )
    }
}

MathInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
}

MathInput.defaultProps = {
    defaultValue: '',
    onChange: ()=> {
    }
}
