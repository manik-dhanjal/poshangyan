import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class NewDataEntryForm extends Component {
    state = { name: '', typeVal: '' }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        this.props.addNewData(this.props.type, this.state.name, null);
        this.setState({ name: '' })
    }

    componentDidMount() {
        switch (this.props.type) {
            case 'languages':
                this.setState({ typeVal: 'Lanaguage' })
                break;
            case 'themes':
                this.setState({ typeVal: 'Theme' })
                break;
            case 'mediaType':
                this.setState({ typeVal: 'Media Type' })
                break;
            case 'mimetype':
                this.setState({ typeVal: 'File Type' })
                break;
            case 'targetAudience':
                this.setState({ typeVal: 'Target Audiance' })
                break;
            case 'sources':
                this.setState({ typeVal: 'Source' })
                break;
        }
    }

    render() {
        const { name } = this.state

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group unstackable widths={2}>
                    <Form.Input
                        placeholder={`Add New ${this.state.typeVal}....`}
                        name='name'
                        value={name}
                        onChange={this.handleChange}
                    />

                    <Form.Button content='Add' />
                </Form.Group>
            </Form>
        )
    }
}

export default NewDataEntryForm
