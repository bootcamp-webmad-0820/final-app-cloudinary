import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import coasterService from '../../../service/coasters.service'
import filesService from '../../../service/files.service'

import Spinner from './../../shared/spinner/Spinner'
import Alert from './../../shared/alert/Alert'

class NewCoaster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coaster: {
                title: '',
                description: '',
                inversions: '',
                length: '',
                imageUrl: '',
                owner: this.props.loggedInUser ? this.props.loggedInUser._id : ''
            },
            uploadingImage: false
        }
        this.coasterService = new coasterService()
        this.filesService = new filesService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ coaster: { ...this.state.coaster, [name]: value } })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.coasterService
            .saveCoaster(this.state.coaster)
            .then(() => this.props.finishAction())
            .catch(err => console.log('Erroro!!', { err }))
    }



    handleImageUpload = e => {

        this.setState({ uploadingImage: true })

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.filesService
            .uploadImage(uploadData)
            .then(response => this.setState({
                coaster: { ...this.state.coaster, imageUrl: response.data.secure_url },
                uploadingImage: null
            }))
            .catch(err => console.log('ERRORRR!', err))
    }



    render() {

        return (

            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Longitud</Form.Label>
                    <Form.Control type="number" name="length" value={this.state.length} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Inversiones</Form.Label>
                    <Form.Control type="number" name="inversions" value={this.state.inversions} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagen (file) {this.state.uploadingImage && <Spinner />}</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.handleImageUpload} />
                </Form.Group>

                <Button variant="dark" type="submit" disabled={this.state.uploadingImage}>{this.state.uploadingImage ? 'Subiendo...' : 'Crear montaña rusa'}</Button>
                {this.state.uploadingImage === null && <Alert title="Archivo subido" text="Se ha subido tu imagen y ya puedes crear el nuevo item" />}
            </Form>
        )
    }
}

export default NewCoaster