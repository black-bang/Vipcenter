import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import './input.scss'

export default class BaseIput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    componentWillReceiveProps(props) {
        if (props.value !== this.props.value) {
            this.setState({ value: props.value })
        }
    }
    handleChange(e) {
        const { onChange, length } = this.props;
        let val = e.target.value
        if (val.length > length) {
            e.target.value = val;
        }
        this.setState({ value: val })
        onChange && onChange(e, val)
    }

    render() {
        const { prefixCls, style, className, children, type, length, ...other } = this.props;
        const cls = classNames(className, `${prefixCls}`, { 'textarea': type === 'textarea' })
        if (type === 'textarea') return (
            <textarea
                className={classNames(cls, `${prefixCls}-inner`)}
                {...other}
                style={style}
                type={type}
                onChange={this.handleChange.bind(this)}
            >
            </textarea>
        )

        return (
            <input
                {...other}
                className={classNames(cls, `${prefixCls}-inner`)}
                type={type}
                style={style}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}

